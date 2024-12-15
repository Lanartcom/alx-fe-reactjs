import axios from 'axios';

// Create an Axios instance for the GitHub API
const api = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_API_KEY}`, // Ensure the token is defined in .env
    },
});

/**
 * Fetch GitHub users based on advanced search criteria.
 *
 * @param {Object} options - The search options.
 * @param {string} [options.username] - GitHub username to search for.
 * @param {string} [options.location] - User location.
 * @param {number} [options.minRepos] - Minimum number of repositories.
 * @param {number} [options.perPage=10] - Number of results per page.
 * @param {number} [options.page=1] - The page number to fetch.
 * @returns {Promise<Object>} - The API response data.
 * @throws {Error} - If the API call fails or input validation fails.
 */
export const fetchAdvancedUserSearch = async ({
    username,
    location,
    minRepos,
    perPage = 10,
    page = 1,
}) => {
    // Validate input parameters
    if (!username && !location && !minRepos) {
        throw new Error('Please provide at least one search criterion: username, location, or minimum repositories.');
    }

    try {
        // Construct the search query
        const query = [
            username ? `user:${username}` : '',
            location ? `location:${location}` : '',
            minRepos ? `repos:>=${minRepos}` : '',
        ]
            .filter(Boolean)
            .join('+'); // Combine conditions with a "+" separator

        // Make the API request
        const response = await api.get(`/search/users`, {
            params: {
                q: query,
                per_page: perPage,
                page: page,
            },
        });

        // Return results or an empty structure if no items found
        if (!response.data.items || response.data.items.length === 0) {
            return { items: [], total_count: 0 };
        }

        return response.data;
    } catch (error) {
        // Log technical details for debugging
        console.error('Error fetching advanced user search:', {
            query,
            params: { per_page: perPage, page },
            error: error.response?.data || error.message,
        });

        // Throw a user-friendly error message
        throw new Error('Failed to fetch search results. Please try again later.');
    }
};
