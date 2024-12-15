import axios from 'axios';

const BASE_URL = 'https://api.github.com';

// Fetch users based on advanced search criteria
export const searchUsers = async ({ query = '', location, minRepos, perPage = 30, page = 1 } = {}) => {
    try {
        // Build the search query dynamically
        let searchQuery = query.trim();
        if (location) {
            searchQuery += ` location:${location}`;
        }
        if (minRepos) {
            searchQuery += ` repos:>=${minRepos}`;
        }

        // Encode the query to be URL-safe
        const encodedQuery = encodeURIComponent(searchQuery.trim());

        // Construct the full URL
        const url = `${BASE_URL}/search/users?q=${encodedQuery}&per_page=${perPage}&page=${page}`;

        // Make the request
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error performing advanced search:', error.response?.data || error.message);
        throw error;
    }
};
