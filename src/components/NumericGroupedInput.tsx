import {
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
} from 'react'

import { formatGroupedDigits } from '@/lib/formatGroupedDigits'

const MIN_WIDTH_PX = 72

function countDigitsBeforeCaret(value: string, caretIndex: number): number {
  const end = Math.min(Math.max(caretIndex, 0), value.length)
  let n = 0
  for (let i = 0; i < end; i++) {
    const ch = value[i]
    if (ch !== undefined && ch >= '0' && ch <= '9') n++
  }
  return n
}

function indexAfterNthDigit(formatted: string, n: number): number {
  if (n <= 0) return 0
  let seen = 0
  for (let i = 0; i < formatted.length; i++) {
    const ch = formatted[i]
    if (ch !== undefined && ch >= '0' && ch <= '9') {
      seen++
      if (seen === n) return i + 1
    }
  }
  return formatted.length
}

function clampNonNegativeSafeInt(n: number): number {
  if (!Number.isFinite(n)) return 0
  const t = Math.trunc(n)
  if (t <= 0) return 0
  return Math.min(t, Number.MAX_SAFE_INTEGER)
}

export type NumericGroupedInputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'value' | 'defaultValue' | 'onChange' | 'type' | 'size'
> & {
  value: number
  onChange: (value: number) => void
}

const WIDTH_PROBE =
  'pointer-events-none absolute left-0 top-0 box-border whitespace-pre rounded border border-transparent px-2 py-1 opacity-0 font-[Inter,sans-serif] text-[18px] font-medium leading-none tracking-normal'

const INPUT_FIELD =
  'box-border block w-full rounded border border-[#d1d5db] bg-white px-2 py-1 outline-none disabled:cursor-not-allowed font-[Inter,sans-serif] text-[18px] font-medium leading-none tracking-normal text-[#d1d5db] caret-[#d1d5db] placeholder:text-[#d1d5db] focus-visible:border-[#8b5cf6] focus-visible:text-[#1E0E4C] focus-visible:caret-[#1E0E4C] focus-visible:placeholder:text-[#1E0E4C] focus-visible:ring-2 focus-visible:ring-violet-400/40'

export function NumericGroupedInput({
  value,
  onChange,
  className,
  placeholder = '0',
  disabled,
  readOnly,
  ...props
}: NumericGroupedInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)
  const caretDigitsRef = useRef<number | null>(null)
  const [fieldWidthPx, setFieldWidthPx] = useState(MIN_WIDTH_PX)

  const safeValue = clampNonNegativeSafeInt(value)
  const displayValue = formatGroupedDigits(String(safeValue))

  const sizingText = displayValue.length > 0 ? displayValue : '\u200b'

  useLayoutEffect(() => {
    const probe = measureRef.current
    if (probe === null) return
    const measured = probe.offsetWidth
    setFieldWidthPx(Math.max(MIN_WIDTH_PX, Math.ceil(measured)))
  }, [sizingText])

  useLayoutEffect(() => {
    const input = inputRef.current
    const digitsBeforeCaret = caretDigitsRef.current
    if (input === null || digitsBeforeCaret === null) return

    caretDigitsRef.current = null
    const pos = Math.min(
      indexAfterNthDigit(displayValue, digitsBeforeCaret),
      displayValue.length,
    )
    input.setSelectionRange(pos, pos)
  }, [displayValue])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    caretDigitsRef.current = countDigitsBeforeCaret(input.value, input.selectionStart ?? 0)

    const digitsOnly = input.value.replace(/\D/g, '')
    const parsed = digitsOnly === '' ? 0 : Number(digitsOnly)
    onChange(clampNonNegativeSafeInt(parsed))
  }

  return (
    <div
      className={`relative inline-block shrink-0 align-middle ${disabled ? 'opacity-60' : ''}`}
      style={{ width: fieldWidthPx }}
    >
      <span ref={measureRef} aria-hidden className={WIDTH_PROBE}>
        {sizingText}
      </span>
      <input
        {...props}
        ref={inputRef}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        value={displayValue}
        onChange={handleChange}
        className={`${INPUT_FIELD} ${className ?? ''}`}
      />
    </div>
  )
}
