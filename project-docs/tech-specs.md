## Technical Specifications

- **Date**: 2025-12-15

### Tech stack

- **Frontend**: React (via Vite).
- **Styling**: Tailwind CSS + custom CSS in `App.css` / `index.css`.
- **State management**: Local component state and `Store.js` (details to be filled in as we review the code).
- **Routing**: React Router-style navigation via `Router.jsx`.

### General coding guidelines

- Prefer **functional React components**.
- Keep each component **focused on a single responsibility** (e.g., navbar, profile card, not-found view).
- Use **Tailwind utility classes** for layout and spacing where possible.
- Add **clear comments** for:
  - Components that manage important state.
  - API calls and data transformations.
  - Non-obvious layout tricks or responsive behavior.

### Responsiveness approach

- Use Tailwind’s responsive utilities (e.g., `sm:`, `md:`, `lg:`) to:
  - Switch from column to row layouts.
  - Adjust font sizes and paddings on different breakpoints.
  - Constrain max widths on large screens with centered content containers.

### Files to pay attention to for UI

- `Navbar.jsx`: Top navigation, links between pages.
- `Home.jsx`: Main search view for Github profiles.
- `ProfileView.jsx`: Layout and design of profile details.
- `History.jsx`: List of previously searched profiles.
- `NotFound.jsx`: Friendly “user not found” or empty state screens.
- `App.css` / `index.css`: App-level styling overrides and base styles.


