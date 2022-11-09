import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login/Login';
import SignUp from './components/signUp/SignUp';
import Dashboard from './components/dashboard/Dashboard'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename="/react-page">
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Login/>} />
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/dashboard" element={<Dashboard/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
