import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import { ToastContainer} from 'react-toastify';
import LoginPage from './pages/LoginPage';

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/login" element={<LoginPage/>} />
    </Routes>
    <ToastContainer />
    
    </BrowserRouter>
   
    </>
  )
}

export default App
