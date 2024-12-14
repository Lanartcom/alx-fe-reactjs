import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_API_KEY}`, // Optional: Use for authenticated requests
    },
});

export const fetchAdvancedUserSearch = async ({ username, location, minRepos, perPage = 10, page = 1 }) => {
    // Validate input parameters
    if (!username && !location && !minRepos) {
        throw new Error('At least one search criterion is required');
    }

    try {
        // Construct query using GitHub Search API syntax
        const query = [
            username ? `user:${username}` : '',
            location ? `location:${location}` : '',
            minRepos ? `repos:>=${minRepos}` : '',
        ]
            .filter(Boolean)
            .join('+');

        // Make API request
        const response = await api.get(`/search/users`, {
            params: {
                q: query,
                per_page: perPage,
                page: page,
            },
        });

        // Handle empty response
        if (!response.data.items || response.data.items.length === 0) {
            return { items: [], total_count: 0, message: 'No users found for the given criteria' };
        }

        return response.data;
    } catch (error) {
        // Log error with details for debugging
        console.error('Error fetching advanced user search:', {
            query,
            params: { per_page: perPage, page },
            error: error.response?.data || error.message,
        });
        throw error;
    }
};
