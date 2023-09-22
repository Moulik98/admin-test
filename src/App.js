import { Toaster } from 'react-hot-toast';
import './App.css';
import MainRoutes from './Routing/Routes';
import SideBar from './admin-panel/SideBar';

function App() {
  return (
    <div className="App">
      <Toaster />
      <MainRoutes/>
    </div>
  );
}

export default App;
