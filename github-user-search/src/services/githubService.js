import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.github.com/search/users?q';
});

// Fetch user by username
export const fetchUserData = async (username) => {
    try {
        const response = await api.get(/users/${username});
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

// Fetch users based on advanced search criteria
export const searchUsers = async ({ query, location, minRepos }) => {
    try {
        let searchQuery = query || '';
        if (location) {
            searchQuery +=  location:${location};
        }
        if (minRepos) {
            searchQuery +=  repos:>=${minRepos};
        }
        const response = await api.get(/search/users?q=${encodeURIComponent(searchQuery)});
        return response.data;
    } catch (error) {
        console.error('Error searching users:', error);
        throw error;
    }
};