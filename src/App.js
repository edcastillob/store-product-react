import Navbar from './components/Navbar/Navbar';
import RoutesComponent from './routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
    <RoutesComponent />
    <ToastContainer />
    </>
  )

}

export default App;
