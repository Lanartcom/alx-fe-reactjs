import axios from 'axios';

// Create an Axios instance with GitHub API base URL and headers
const api = axios.create({
    baseURL: import.meta.env.VITE_GITHUB_API_URL, // Ensure this environment variable is correctly set
    headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_API_KEY}`, // Ensure the API key is correct
    },
});

/**
 * Fetch a single user's data by username.
 *
 * @param {string} username - GitHub username.
 * @returns {Promise<Object>} - User data.
 */
export const fetchUserData = async (username) => {
    if (!username) {
        throw new Error('Username is required to fetch user data.');
    }

    try {
        const response = await api.get(`/users/${username}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

/**
 * Search GitHub users with advanced query and pagination support.
 *
 * @param {Object} options - Search options.
 * @param {string} options.username - GitHub username to search for.
 * @param {string} options.location - Location of the user.
 * @param {number} options.minRepos - Minimum number of repositories.
 * @param {number} options.perPage - Number of results per page (default: 10).
 * @param {number} options.page - Page number to fetch (default: 1).
 * @returns {Promise<Object>} - API response data.
 */
export const searchUsers = async ({ username, location, minRepos, perPage = 10, page = 1 }) => {
    const queryParts = [
        username ? `user:${username}` : '',
        location ? `location:${location}` : '',
        minRepos ? `repos:>=${minRepos}` : '',
    ]
        .filter(Boolean)
        .join('+');

    try {
        const response = await api.get(`/search/users`, {
            params: {
                q: queryParts,
                per_page: perPage,
                page: page,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
