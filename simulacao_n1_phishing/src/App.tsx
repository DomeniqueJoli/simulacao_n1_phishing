import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()

  const link = () => {
    navigate('/login')
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Simulador de Phishing</h1>
      <button onClick={link} style={{ padding: '12px 24px', fontSize: '16px', cursor: 'pointer' }}>Iniciar Simulação</button>
    </div>
  )
}

export default App
