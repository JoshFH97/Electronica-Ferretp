import * as ReactDOM from "react-dom/client";
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home'
import './pages/Home.css'
import Login from './pages/Login'
import Register from './pages/Register'
import ContactSection from './pages/Contact'
import AboutSection from './pages/About'
import ProductSection from './pages/Products'
import { ToastContainer } from 'react-toastify';
import { showToast } from './hooks/alertas.js'; 


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
]);

function App() {
  
{/* <ContactSection/> */}
{/* <Home/>  */}
{/* <AboutSection/> */}
{/* <ProductSection/> */}
{/* <Login/> */}
{/* <Register/> */}



 
  

  return (
    <RouterProvider router={router} />
    
  )
}

export default App