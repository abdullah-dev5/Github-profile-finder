// Store.js
import create from 'zustand';

const useUserStore = create((set) => ({
    searchUser: '',
    fetchedUser: {},
    locationFetched: {},
    setSearchUser: (searchUser) => set({ searchUser }),
    setFetchedUser: (fetchedUser) => set({ fetchedUser }),
    setLocationFetched: (locationFetched) => set({ locationFetched })
}));

export default useUserStore;
