import './App.css';
import IndexDashboard from './views/Dashboard/IndexDashboard';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <IndexDashboard/>
      </BrowserRouter>
    </div>
  );
}

export default App;
