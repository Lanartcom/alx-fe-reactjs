// src/components/About.jsx
function About() {
    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>About Us</h1>
        <p style={styles.text}>Our company has been providing top-notch services since 1990. We specialize in various fields including technology, marketing, and consultancy. Our team is committed to delivering innovative solutions and outstanding results to help our clients succeed.</p>
      </div>
    )
  }
  
  const styles = {
    container: {
      padding: '40px',
      textAlign: 'center',
      backgroundColor: '#e6f7ff'
    },
    heading: {
      fontSize: '32px',
      color: '#333'
    },
    text: {
      fontSize: '18px',
      color: '#666'
    }
  }
  
  export default About
  