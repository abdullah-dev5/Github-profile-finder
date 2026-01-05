// Store.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(persist((set) => ({
    searchUser: '',
    fetchedUser: {},
    // Last resolved location data for map view
    locationFetched: {},
    // List of previously searched profiles (simple history)
    history: [],
    // Starred / favorite profiles
    favorites: [],

    setSearchUser: (searchUser) => set({ searchUser }),
    setFetchedUser: (fetchedUser) => set({ fetchedUser }),
    setLocationFetched: (locationFetched) => set({ locationFetched }),

    // Add or update a user entry in history
    addToHistory: (user) =>
      set((state) => {
        if (!user?.login) return state;
        const exists = state.history.find((item) => item.login === user.login);
        const filtered = exists
          ? state.history.filter((item) => item.login !== user.login)
          : state.history;
        const entry = {
          login: user.login,
          avatar_url: user.avatar_url,
          html_url: user.html_url,
          name: user.name,
          location: user.location,
          searchedAt: new Date().toISOString(),
        };
        return { history: [entry, ...filtered].slice(0, 20) };
      }),

    clearHistory: () => set({ history: [] }),

    // Remove a single user from history by login
    removeFromHistory: (login) =>
      set((state) => ({
        history: state.history.filter((item) => item.login !== login),
      })),

    toggleFavorite: (user) =>
      set((state) => {
        if (!user?.login) return state;
        const isFav = state.favorites.some((item) => item.login === user.login);
        if (isFav) {
          return {
            favorites: state.favorites.filter((item) => item.login !== user.login),
          };
        }
        const entry = {
          login: user.login,
          avatar_url: user.avatar_url,
          html_url: user.html_url,
          name: user.name,
        };
        return { favorites: [entry, ...state.favorites].slice(0, 20) };
      }),

    // Remove a single user from favorites by login
    removeFavorite: (login) =>
      set((state) => ({
        favorites: state.favorites.filter((item) => item.login !== login),
      })),
}), {
  name: 'github-profile-store',
}));

export default useUserStore;
