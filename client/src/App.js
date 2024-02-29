import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './Components/Users/Login';
import Signup from './Components/Users/Signup';
import Home from './Components/Users/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './Components/Users/Profile';
import Adlogin from './Components/Admin/Adlogin';
import Dashboard from './Components/Admin/Dashboard';
import CreateUser from './Components/Admin/CreateUser';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/admin' element={<Adlogin/>} />
          <Route path='/admin/dashboard' element={<Dashboard/>} />
          <Route path='/admin/adduser' element={<CreateUser/>} />
        </Routes>
      </Router>
      <ToastContainer />
     
    </div>
  );
}

export default App;
