import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/login.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from './components/signup.jsx'
import HomePage from './components/HomePage.jsx';
import TopicsViewPage from './components/topicsViewPage.jsx';
import ProblemsViewPage from './components/problemsViewPage.jsx';
import ReachOutPage from './components/ReachOutPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/sheet-topics' element={<TopicsViewPage/>} />
        <Route path='/sheet-problems' element={<ProblemsViewPage />} />
        <Route path='/reach-out' element={<ReachOutPage />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
