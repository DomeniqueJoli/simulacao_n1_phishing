import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()

  const link = () => {
    navigate('/login')
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h3>Simulador de Phishing</h3>
      <p>
        A demonstração a seguir tem foco educacional e será exclusivamente feita com dados falsos.
      </p>
      <button onClick={link} style={{ padding: '12px 24px', fontSize: '16px', cursor: 'pointer' }}>Iniciar Simulação</button>
    </div>
  )
}

export default App
