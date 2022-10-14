import './App.css';
import IndexDashboard from './views/Dashboard/IndexDashboard';
import { BrowserRouter } from 'react-router-dom';
import Login from './views/Auth/Login';

function App() {
  const token = localStorage.getItem('login');
 
  return (
    <div className="App">
      <BrowserRouter>
        {token !==null ? <IndexDashboard/> : <Login/>}
          {/* <IndexDashboard/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
