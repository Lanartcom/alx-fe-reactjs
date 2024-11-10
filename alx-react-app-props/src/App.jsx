import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'
import WelcomeMessage from './components/WelcomeMessage'
import UserProfile from './components/UserProfile'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg' // Updated path if viteLogo is in `src/assets`
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header />

      <main className="main-content">
        <MainContent />
        <WelcomeMessage />
        <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
      </main>

      <div className="logos">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo vite" alt="Vite framework logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React library logo" />
        </a>
      </div>

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <Footer />
    </div>
  )
}

export default App
