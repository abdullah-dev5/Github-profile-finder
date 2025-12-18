## User Flow & Project Structure

- **Date**: 2025-12-15

### Main user flows

- **Search for a Github profile**
  - User opens the app (landed on `Home`).
  - User types a Github username into the search input.
  - User clicks the search button or presses Enter.
  - App calls the Github API and:
    - If found: navigates to or shows `ProfileView` with the profile.
    - If not found: shows the `NotFound` view with a friendly message.

- **View previous searches**
  - User navigates to `History` from the navbar.
  - App shows a list of previously searched usernames.
  - User can click an item to re-open that profile.

- **Learn about the app**
  - User navigates to `About`.
  - App shows a simple description of what the Github Profile Finder does.

### Project structure (simplified)

- `src/main.jsx`: Entry file that mounts the React app.
- `src/Router.jsx`: Defines the main routes and which component renders for each path.
- `src/Navbar.jsx`: Top navigation bar.
- `src/Home.jsx`: Search page for entering Github usernames.
- `src/ProfileView.jsx`: Detailed view of a selected Github user.
- `src/History.jsx`: History of past profile searches.
- `src/NotFound.jsx`: User-not-found or generic “not found” UI.
- `src/About.jsx`: About page content.
- `src/Map.jsx`, `src/Footer.jsx`, `src/Store.js`: Additional features and shared state (details to be refined after code review).
- `src/App.css`, `src/index.css`: Global and component-level styles.


