// src/components/Navbar.jsx
import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/about" style={styles.link}>About</Link>
      <Link to="/services" style={styles.link}>Services</Link>
      <Link to="/contact" style={styles.link}>Contact</Link>
    </nav>
  )
}

const styles = {
  nav: {
    padding: '10px',
    backgroundColor: '#333',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
    transition: 'color 0.3s',
  },
  linkHover: {
    color: '#ff8c00'
  }
}

export default Navbar
