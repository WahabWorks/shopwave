import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<RegisterPage/>} />
    </Routes>
    
    </BrowserRouter>
   
    </>
  )
}

export default App
