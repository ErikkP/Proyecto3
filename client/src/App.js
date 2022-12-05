import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  return (
    <div>
    <Navbar/>
    <Products/>
    <Login/>
    <Register/>
    </div>
  );
}

export default App;
