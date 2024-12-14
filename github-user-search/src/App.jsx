import React from 'react';
import Search from './components/Search';
import './App.css'; // Import the CSS file

const App = () => {
    return (
        <div className="app-container">
            <h1 className="app-title">GitHub User Search</h1>
            <Search />
        </div>
    );
};

export default App;
