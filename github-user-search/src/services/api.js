import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_GITHUB_API_URL,
    headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_API_KEY}`,
    },
});

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
