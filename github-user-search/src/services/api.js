import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_GITHUB_API_URL,
    headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_API_KEY}`,
    },
});

export const searchUsers = async (query) => {
    try {
        const response = await api.get(`/search/users`, {
            params: { q: query },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
