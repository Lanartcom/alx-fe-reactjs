import React, { useState, useEffect } from 'react';
import { fetchAdvancedUserSearch } from '../services/githubService';

const Search = () => {
    const [username, setUsername] = useState('');
    const [location, setLocation] = useState('');
    const [minRepos, setMinRepos] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const usersPerPage = 10; // Number of results to display per page

    // Function to handle form submission
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResults([]);

        try {
            const data = await fetchAdvancedUserSearch({
                username,
                location,
                minRepos,
                perPage: usersPerPage,
                page: currentPage,
            });
            setResults(data.items || []);
            setTotalCount(data.total_count || 0); // Total number of results
        } catch (err) {
            setError('Looks like we cant find the user');
        } finally {
            setLoading(false);
        }
    };

    // Handle page change with useEffect
    useEffect(() => {
        if (currentPage > 0) {
            handleSearch({ preventDefault: () => {} }); // Simulate a form submission on page change
        }
    }, [currentPage]);

    // Function to go to the previous page
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    // Function to go to the next page
    const handleNextPage = () => {
        const totalPages = Math.ceil(totalCount / usersPerPage);
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search by username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Location (e.g., San Francisco)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Minimum repositories"
                    value={minRepos}
                    onChange={(e) => setMinRepos(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {results.length > 0 && (
                <div>
                    {results.map((user) => (
                        <div key={user.id}>
                            <img src={user.avatar_url} alt={user.login} />
                            <div>
                                <h2>{user.login}</h2>
                                <p>Location: {user.location || 'N/A'}</p>
                                <p>Repositories: {user.public_repos || 'N/A'}</p>
                                <a
                                    href={user.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View Profile
                                </a>
                            </div>
                        </div>
                    ))}
                    <div>
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of{' '}
                            {Math.ceil(totalCount / usersPerPage)}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === Math.ceil(totalCount / usersPerPage)}
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
