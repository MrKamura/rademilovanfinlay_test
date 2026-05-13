# Front-end task — numeric input (React)

![Figma preview](./public/ac5399700333c1dbd7fc7aca9bc3cf75fa88de6b.jpg)

[Figma — Front-end UI task](https://www.figma.com/file/OcyCt22I1Ha3fgLzGi0ZZy/Front-end-UI-Task?type=design&node-id=1-4&mode=design&t=ZzZ3vo84xwZ6uxJF-0)

## Brief

### Functional requirements

1. The user should only be able to enter digits.
2. Groups of three digits are separated by spaces (`"1442"` → `"1 442"`).
3. The input has a minimum width of **72px** and expands as the formatted value grows.

### Code expectations

1. The input component must be reusable across the project.
2. You may polish the codebase toward production quality and use any libraries that make sense.

---

## Prerequisites

- **Node.js 22+**
- **npm**

---

## Getting started

```bash
npm ci
npm run dev
```

Vite prints the local URL (usually `http://localhost:5173`).

### NPM scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Typecheck & production build to `dist/` |
| `npm run preview` | Serve the contents of `dist/` locally |
| `npm run lint` | ESLint (`src/`) |
| `npm run format` | Prettier (`src/`) |

If `npm ci` fails because `package-lock.json` is out of date, run `npm install` once and commit the updated lockfile.

---

## Stack

Vite · React · TypeScript · Tailwind CSS v4 · React Router · Zustand.
