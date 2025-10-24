
# Vote-Trend Frontend

This is the frontend for the Vote-Trend platform, built with React, TypeScript, Vite, and CSS Modules. It provides a modern, real-time voting experience with a scalable and maintainable architecture.

## Project Structure

```
frontend/
  src/
    components/      # Reusable UI components (Button, Card, Navbar, etc.)
    styles/          # CSS Modules (utilities, components, globals)
    assets/          # Static assets (images, icons)
    App.tsx          # Main app layout
    main.tsx         # Entry point
  public/
    docs/            # Project documentation
  package.json
  tsconfig.json
  vite.config.ts
  ...
```

## Features Implemented

- Monorepo structure (frontend, backend, smart-contracts, oracle)
- Frontend initialized with Vite, React, and TypeScript
- CSS Modules architecture for scalable styling
- Utility-first CSS (like Tailwind, but custom)
- Global styles and variables
- Reusable UI components: Button, Card, Navbar
- Git and .gitignore properly configured

## Getting Started

1. Install dependencies:
   ```sh
   cd frontend
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```

## Next Steps

- Build out more UI components and pages (Landing, Dashboard, Poll, etc.)
- Connect to backend APIs
- Integrate Stacks.js for blockchain features
- Add tests and documentation

---

For more details, see the `/public/docs` folder and the main project README.
