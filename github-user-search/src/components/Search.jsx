import React, { useState, useEffect } from 'react';
import { fetchAdvancedUserSearch } from '../services/githubService';
import SearchInput from './SearchInput';

const Search = () => {
    const [username, setUsername] = useState('');
    const [location, setLocation] = useState('');
    const [minRepos, setMinRepos] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const usersPerPage = 10;

    // Fetch data from the GitHub API
    const fetchData = async (page) => {
        setLoading(true);
        setError(null);
        setResults([]);

        try {
            const data = await fetchAdvancedUserSearch({
                username,
                location,
                minRepos,
                perPage: usersPerPage,
                page,
            });
            setResults(data.items || []);
            setTotalCount(data.total_count || 0);
        } catch (err) {
            setError('Looks like we cant find the user');
        } finally {
            setLoading(false);
        }
    };

    // Handle form submission
    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1); // Reset to the first page
        fetchData(1);
    };

    // Fetch data on page change
    useEffect(() => {
        if (currentPage > 1) {
            fetchData(currentPage);
        }
    }, [currentPage]);

    // Pagination controls
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        const totalPages = Math.ceil(totalCount / usersPerPage);
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
            
            {/* SearchInput Component */}
            <SearchInput
                username={username}
                setUsername={setUsername}
                location={location}
                setLocation={setLocation}
                minRepos={minRepos}
                setMinRepos={setMinRepos}
                handleSearch={handleSearch}
            />
            {loading && <p className="mt-4 text-gray-500">Loading...</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {results.length > 0 && (
                <div className="w-full max-w-4xl mt-6">
                    {/* Display Results */}
                    {results.map((user) => (
                        <div
                            key={user.id}
                            className="flex items-center p-4 border rounded-lg mb-4 bg-white shadow"
                        >
                            <img
                                src={user.avatar_url}
                                alt={user.login}
                                className="w-16 h-16 rounded-full"
                            />
                            <div className="ml-4">
                                <h2 className="text-lg font-semibold">{user.login}</h2>
                                <p>Location: {user.location || 'N/A'}</p>
                                <p>Repositories: {user.public_repos || 'N/A'}</p>
                                <a
                                    href={user.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    View Profile
                                </a>
                            </div>
                        </div>
                    ))}
                    {/* Pagination */}
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-lg ${
                                currentPage === 1
                                    ? 'bg-gray-300'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                        >
                            Previous
                        </button>
                        <p>
                            Page {currentPage} of {Math.ceil(totalCount / usersPerPage)}
                        </p>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === Math.ceil(totalCount / usersPerPage)}
                            className={`px-4 py-2 rounded-lg ${
                                currentPage === Math.ceil(totalCount / usersPerPage)
                                    ? 'bg-gray-300'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;
