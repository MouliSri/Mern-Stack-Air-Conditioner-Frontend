import {Routes ,Route} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ContactForm from "./pages/ContactForm";
import ProductDetails from "./pages/ProductDetails"
import AboutPage from "./pages/AboutPage";
import PlaceOrder from "./pages/PlaceOrder";
import UpdateProfile from "./pages/UpdateProfile";


function App() {
  return (
    <>
   <Routes>
    <Route exact path="/" element={<Home />}/>
    <Route exact path="/login" element={<Login />}/>
    <Route exact path="/register" element={<Register />}/>
    <Route exact path="/orders" element={<Orders/>} />
    <Route exact path="/products" element={<Products />} />
    <Route exact path="/cart" element={<Cart />} />
    <Route exact path="/contact" element={<ContactForm />} />
    <Route exact path="/products/:id" element={<ProductDetails />} /> 
    <Route exact path="/about" element={<AboutPage />} />
    <Route exact path='/placeorder' element={<PlaceOrder/>} />
    <Route exact path="/updateuser"  element={<UpdateProfile />} />
   </Routes>
   <ToastContainer
position="top-center"
autoClose={4000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
   </>
  );
}

export default App;
