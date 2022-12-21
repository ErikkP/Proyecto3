import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home"
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CreateProduct from "./components/Products/CreateProduct";
import Logout from "./components/Logout/Logout";
import Product from "./components/Products/Product";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import ModProduct from "./components/Products/ModProduct";
import Profile from "./components/Profile/Profile";
import ModUser from "./components/Profile/ModUser";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mod_user" element={<ModUser />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new_product" element={<CreateProduct />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/mod_product/:productId" element={<ModProduct />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
      
      {/* <Navbar />
      <Products />
      <CreateProduct />
      <Login />
      <Register /> */}
    </div>
  );
}

export default App;
