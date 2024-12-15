import React, { useState } from 'react';
import { searchUsers } from '../services/api';

const Search = () => {
    const [username, setUsername] = useState('');
    const [location, setLocation] = useState('');
    const [minRepos, setMinRepos] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResults([]); // Clear previous results

        try {
            const data = await searchUsers({
                username,
                location,
                minRepos: minRepos ? parseInt(minRepos, 10) : undefined,
            });
            setResults(data.items || []);
        } catch (err) {
            setError('Failed to fetch users. Please check your inputs and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-4xl font-bold mb-6">GitHub User Search</h1>
            <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleInputChange(setUsername)}
                    className="border p-2 rounded w-full"
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={handleInputChange(setLocation)}
                    className="border p-2 rounded w-full"
                />
                <input
                    type="number"
                    placeholder="Minimum Repositories"
                    value={minRepos}
                    onChange={handleInputChange(setMinRepos)}
                    className="border p-2 rounded w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
                >
                    Search
                </button>
            </form>

            {loading && <p className="mt-4">Loading...</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}

            {results.length > 0 && (
                <div className="mt-4 space-y-2">
                    {results.map((user) => (
                        <div
                            key={user.id}
                            className="flex items-center space-x-4 p-2 border rounded"
                        >
                            <img
                                src={user.avatar_url}
                                alt={user.login}
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <p className="font-bold">{user.login}</p>
                                <a
                                    href={user.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500"
                                >
                                    View Profile
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
