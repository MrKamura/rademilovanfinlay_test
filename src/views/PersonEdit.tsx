import { Link, useParams } from 'react-router-dom'
import { NumericGroupedInput } from '@/components/NumericGroupedInput'
import { publicUrl } from '@/lib/publicUrl'
import { useStore } from '@/store'

export default function PersonEdit() {
  const { id } = useParams<{ id: string }>()
  const person = useStore((state) => state.people.find((p) => p.id === Number(id)))
  const updatePersonAge = useStore((state) => state.updatePersonAge)

  if (!person) {
    return (
      <div>
        <p className="text-gray-600">Person not found</p>
        <Link to="/" className="text-violet-600 hover:underline text-sm">
          Back to list
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Link to="/" className="text-violet-600 hover:underline text-sm">
        &larr; Back
      </Link>

      <div className="group/person flex items-center gap-3">
        <img
          src={publicUrl('img.png')}
          alt={person.name}
          className="size-[80px] shrink-0 rounded-full border-2 border-transparent object-cover transition-colors group-focus-within/person:border-violet-500"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <label
            htmlFor="hours-input"
            className="block font-[Koulen,sans-serif] font-normal text-[16px] leading-[15px] tracking-[0.02em] text-[#1E0E4C] uppercase group-focus-within/person:text-[#3D06D7]"
          >
            {person.name.toUpperCase()} IS
          </label>
          <div className="flex items-center gap-2">
            <NumericGroupedInput
              id="hours-input"
              value={person.ageInHours}
              onChange={(hours) => updatePersonAge(person.id, hours)}
              placeholder="0"
            />
            <span className="shrink-0 font-[Inter,sans-serif] text-[18px] font-normal leading-none tracking-normal text-gray-600">
              hours old
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
