import { ToastContainer } from 'react-toastify';

import Products from './components/products';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Products />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
