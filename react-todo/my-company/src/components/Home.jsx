// src/components/Home.jsx
function Home() {
    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>Welcome to Our Company</h1>
        <p style={styles.text}>We are dedicated to delivering excellence in all our services. Explore our offerings to see how we can help you achieve your goals.</p>
      </div>
    )
  }
  
  const styles = {
    container: {
      padding: '40px',
      textAlign: 'center',
      backgroundColor: '#f0f8ff'
    },
    heading: {
      fontSize: '36px',
      color: '#333'
    },
    text: {
      fontSize: '18px',
      color: '#555'
    }
  }
  
  export default Home
  