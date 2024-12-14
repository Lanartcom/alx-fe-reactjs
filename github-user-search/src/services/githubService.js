import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.github.com',
});

export const fetchAdvancedUserSearch = async ({ username, location, minRepos, perPage = 10, page = 1 }) => {
    try {
        const query = [
            username ? `user:${username}` : '',
            location ? `location:${location}` : '',
            minRepos ? `repos:>=${minRepos}` : '',
        ]
            .filter(Boolean)
            .join('+');

        const response = await api.get(`/search/users`, {
            params: {
                q: query,
                per_page: perPage, // Number of results per page
                page: page,        // Current page number
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching advanced user search:', error);
        throw error;
    }
};