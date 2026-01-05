## Requirements & Features

- **Date**: 2025-12-15

### Core features

- **Search Github user**
  - Input a Github username.
  - Trigger a search (button click or pressing Enter).
  - Show loading state while fetching data.
  - If found, display profile details.
  - If not found, show a friendly “not found” screen with an illustration/animation.

- **Profile view**
  - Show avatar, display name, username, bio.
  - Show follower/following count, public repos, and other key stats (depending on existing implementation).
  - Show location and other metadata (if provided by API).
  - Show a short list of the user&apos;s top public repositories (name, stars, language, description).
  - Allow marking/unmarking a profile as a favorite and show basic badges/chips for followers, following, and repo count.
  - Layout must be responsive:
    - **Mobile**: stacked content, single-column, large tap targets.
    - **Tablet/Desktop**: side-by-side sections where appropriate, more spacing.

- **History**
  - List of previous successful searches.
  - Easy to re-open a previous profile from the history.
  - Option to clear all saved history entries.
  - Surface a short list of recent searches directly on the home page.

- **Navigation**
  - Simple navbar to move between **Home**, **History**, **About** (depending on the router setup).

### UI / UX requirements

- **Responsiveness**
  - Use a clean layout that automatically adjusts to:
    - **Small screens**: one column, content centered, full-width buttons.
    - **Medium+ screens**: constrained max width, multiple columns where appropriate.
  - Avoid horizontal scrolling on normal viewport sizes.

- **Visual style**
  - Consistent fonts, colors, spacing.
  - Clear distinction between cards, background, and buttons.
  - Use Tailwind utility classes (if already used in the project) for consistent spacing and typography.

- **Error & empty states**
  - When search input is empty and user presses search: show a gentle reminder.
  - When a user is not found: show “Not Found” view with friendly copy and the existing animation asset.
  - When there is a network or API error: show a short error message and a retry option.

### Edge cases

- **Invalid usernames** (e.g., spaces, special characters):
  - Trim whitespace.
  - Show a message if the input is clearly invalid before calling the API.

- **Slow network**
  - Show loading indicator and prevent multiple overlapping searches.

- **Very long texts (bio, name)**
  - Truncate or wrap text so it does not break the layout.


