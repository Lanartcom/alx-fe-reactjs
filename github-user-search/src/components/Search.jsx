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
            setTotalCount(data.total_count || 0);
        } catch (err) {
            setError('Looks like we cant find the user');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentPage > 0) {
            handleSearch({ preventDefault: () => {} });
        }
    }, [currentPage]);

    return (
        <div>
            {/* Use the SearchInput component here */}
            <SearchInput
                username={username}
                setUsername={setUsername}
                handleSearch={handleSearch}
            />
            {/* Other input fields and UI elements */}
            <div>
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
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {/* Results and pagination logic */}
        </div>
    );
};

export default Search;
