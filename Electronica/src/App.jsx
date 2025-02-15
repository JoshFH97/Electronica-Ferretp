import * as ReactDOM from "react-dom/client";
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home'
import './pages/Home.css'
import Login from './pages/Login'
import ContactSection from './pages/Contact'
import AboutSection from './pages/About'
import ProductSection from './pages/Products'
import Destacados from "./pages/Destacados.jsx";
import Agregar from "./pages/Agregar.jsx";
import ShoppingCart from "./pages/ShoppingCart.jsx";
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify';
import { showToast } from './hooks/alertas.js'; 
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import Privacy from "./Components/Privacy.jsx";
import Terms from "./Components/Terms.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/About",
    element: <AboutSection/>,
  },
  {
    path: "/Contact",
    element: <ContactSection/>,
  },
  {
    
    path: "/Shop/All_Products",
    element: <ProductSection/>,
  },
  {
    
    path: "/Shop/Popular_Items",
    element: <Destacados/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/agregar",
    element: <PrivateRoute Component={Agregar}/>,
  },
  { path: "/Cart",
    element: <ShoppingCart/>,
  },
  { path: "/register", 
    element: <Register/>,
  },
  { path: "/privacy", 
    element: <Privacy/>,
  },
  { path: "/terms", 
    element: <Terms/>,
  },
  
]);

function App() {
  return (
    <>
    <RouterProvider router={router}/>
    <ToastContainer />
  
    </>
    
  )
  
}

export default App