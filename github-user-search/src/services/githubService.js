import axios from 'axios';

const BASE_URL = 'https://api.github.com';

// Create an Axios instance
const api = axios.create({
    baseURL: BASE_URL,
});

// Fetch user by username
export const fetchUserData = async (username) => {
    try {
        const url = `${BASE_URL}/users/${username}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data for username "${username}":`, error.response?.data || error.message);
        throw error;
    }
};

// Fetch users based on advanced search criteria
export const searchUsers = async ({ query = '', location, minRepos } = {}) => {
    try {
        // Build the search query dynamically
        let searchQuery = query;
        if (location) {
            searchQuery += ` location:${location}`;
        }
        if (minRepos) {
            searchQuery += ` repos:>=${minRepos}`;
        }

        // Encode the entire query string
        const encodedQuery = encodeURIComponent(searchQuery.trim());
        const url = `${BASE_URL}/search/users?q=${encodedQuery}`;

        // Make the request
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error performing advanced search:', error.response?.data || error.message);
        throw error;
    }
};
