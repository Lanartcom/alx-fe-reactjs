import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.github.com', // Base URL for GitHub API
});

export const fetchAdvancedUserSearch = async ({ username, location, minRepos, perPage = 10, page = 1 }) => {
    try {
        // Construct the search query using advanced GitHub Search API syntax
        const query = [
            username ? `user:${username}` : '',
            location ? `location:${location}` : '',
            minRepos ? `repos:>=${minRepos}` : '',
        ]
            .filter(Boolean) // Remove any empty values
            .join('+'); // Combine all conditions with a "+" separator

        // Make a GET request to the search endpoint with query and pagination parameters
        const response = await api.get(`/search/users`, {
            params: {
                q: query, // The search query string
                per_page: perPage, // Number of results per page
                page: page, // Current page number
            },
        });

        return response.data; // Return the full API response
    } catch (error) {
        console.error('Error fetching advanced user search:', error);
        throw error; // Re-throw the error to be handled in the component
    }
};
