# Front-end task — numeric input (React)

![Figma preview](./public/img.png)

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

## Deploying to GitHub Pages

Workflow: [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml).

On push to **`main`** or **`master`**, GitHub Actions builds the app with `VITE_BASE_URL` set to `/<repository-name>/` (for project sites such as `https://<user>.github.io/<repo>/`), copies `index.html` to `404.html` for SPA deep links on Pages, then publishes the **`dist`** folder.

### One-time repository setup

1. Open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).

Wait for the workflow to finish; the site URL will match your Pages configuration (typically `https://<user>.github.io/<repo>/`).

### Serving from the domain root

If Pages is hosted at the site root (e.g. a `username.github.io` repo or custom domain root), override the Build step environment in the workflow:

```yaml
env:
  VITE_BASE_URL: /
```

Then push again to rebuild.

---

## Stack

Vite · React · TypeScript · Tailwind CSS v4 · React Router · Zustand.
