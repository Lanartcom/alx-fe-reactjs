import React, { useState } from 'react';
import { searchUsers, fetchUserData } from '../services/api'; // Import both functions

const Search = () => {
    const [username, setUsername] = useState('');
    const [location, setLocation] = useState('');
    const [minRepos, setMinRepos] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [singleUser, setSingleUser] = useState(null); // State for single-user data

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResults([]); // Clear previous results
        setSingleUser(null); // Clear single user data

        if (username && !location && !minRepos) {
            // Fetch single user if only username is provided
            try {
                const userData = await fetchUserData(username);
                setSingleUser(userData);
            } catch (err) {
                setError('Looks like we cant find the user.');
            } finally {
                setLoading(false);
            }
            return;
        }

        // Otherwise, perform an advanced search
        try {
            const data = await searchUsers({
                query: username,
                location,
                minRepos: minRepos ? parseInt(minRepos, 10) : undefined,
            });
            setResults(data.items || []);
        } catch (err) {
            setError('Looks like we cant find the user.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-4xl font-bold mb-6">GitHub User Search</h1>
            <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Username Input */}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleInputChange(setUsername)}
                    className="border p-2 rounded w-full"
                />

                {/* Location Input */}
                <input
                    type="text"
                    placeholder="Location (optional)"
                    value={location}
                    onChange={handleInputChange(setLocation)}
                    className="border p-2 rounded w-full"
                />

                {/* Minimum Repositories Input */}
                <input
                    type="number"
                    placeholder="Minimum Repositories (optional)"
                    value={minRepos}
                    onChange={handleInputChange(setMinRepos)}
                    className="border p-2 rounded w-full"
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
                >
                    Search
                </button>
            </form>

            {/* Loading State */}
            {loading && <p className="mt-4">Loading...</p>}

            {/* Error Message */}
            {error && <p className="text-red-500 mt-4">{error}</p>}

            {/* Single User Display */}
            {singleUser && (
                <div className="mt-4 p-4 border rounded flex items-center space-x-4">
                    <img
                        src={singleUser.avatar_url}
                        alt={singleUser.login}
                        className="w-16 h-16 rounded-full"
                    />
                    <div>
                        <p className="font-bold">{singleUser.login}</p>
                        <p className="text-gray-500">Location: {singleUser.location || 'N/A'}</p>
                        <p className="text-gray-500">Public Repos: {singleUser.public_repos}</p>
                        <a
                            href={singleUser.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500"
                        >
                            View Profile
                        </a>
                    </div>
                </div>
            )}

            {/* Results Display */}
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

            {/* No Results Message */}
            {!loading && !error && results.length === 0 && !singleUser && (
                <p className="mt-4 text-gray-500">No results found. Try refining your search criteria.</p>
            )}
        </div>
    );
};

export default Search;
