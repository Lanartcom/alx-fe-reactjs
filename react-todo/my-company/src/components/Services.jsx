// src/components/Services.jsx
function Services() {
    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>Our Services</h1>
        <ul style={styles.list}>
          <li style={styles.listItem}>Technology Consulting</li>
          <li style={styles.listItem}>Market Analysis</li>
          <li style={styles.listItem}>Product Development</li>
          <li style={styles.listItem}>Digital Transformation</li>
          <li style={styles.listItem}>Strategic Planning</li>
        </ul>
      </div>
    )
  }
  
  const styles = {
    container: {
      padding: '40px',
      textAlign: 'center',
      backgroundColor: '#f0fff0'
    },
    heading: {
      fontSize: '32px',
      color: '#333'
    },
    list: {
      listStyleType: 'none',
      padding: 0,
      color: '#555'
    },
    listItem: {
      fontSize: '18px',
      margin: '10px 0'
    }
  }
  
  export default Services
  