import '../Contact.css';// Importa el css para el diseno
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap
import Navbar from '../Components/Navbar';//Navbar
import defaulimage from '../assets/defaulimage.png';
import usingFetch from '../hooks/usingFetch.js';
import { showToast } from '../hooks/alertas.js'; 
import verification from '../hooks/verification.js';

const Agregar =()=>{
const endpoint='api/productos/'

const [modelo,setModelo]=useState('')
const [descripcion,setDescripcion]=useState('')
const [precio,setPrecio]=useState(0)
const [cantidad,setCantidad]=useState(0)
const [base64,setBase64]=useState('')
const [categoria,setCategoria]=useState(0)

const handleFileChange = (event) => {
    const file = event.target.files[0];

    convertToBase64(file);
  };

  const convertToBase64 = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBase64(reader.result);
      };
    };
    const clearFields=()=>{
              // Clear the form fields after successful submission
              setModelo('');
              setDescripcion('');
              setPrecio(0);
              setCantidad(0);
              setBase64('');
              setCategoria(0);
              document.getElementById('inputfile').value = '';
    }
    const Add =async(e)=>{
        e.preventDefault()
      const mod=verification.no_empty(modelo)
      const des=verification.no_empty(descripcion)
      const pre=verification.no_empty(precio)
      const cant=verification.no_empty(cantidad)
      const bas=verification.no_empty(base64)
      const cat=verification.no_empty(categoria)


      if (!mod || !des || !pre || !cant || !bas || !cat) {
        showToast('Ingrese todos los campos por favor','error')
        return  
      }



        const objeto=     {
            nombre: modelo,
            descripcion: descripcion ,
            precio: precio,
            stock: cantidad,
            imagen: base64,
            id_categoria:categoria
        }
        
        try {
            await usingFetch.post(endpoint,objeto)
           
            showToast('Su  Articulo ha sido agregado exitosamente','success')

            clearFields()
        } catch (error) {
            console.error(error)
            showToast('Hubo un problema, intente mas tarde','info')
            clearFields()

        }

    


    }

    return(<>
    
      <Navbar bg='light' text='light' />
      {/* Contact Us Section */}
      <section className="Material-contact-section section-padding section-dark">
        <div className="container">
          <div className="row">
            {/* Section Title */}
            <div className="col-md-12">
              <h1 className="section-title">Are we going to add a new device?</h1>
            </div>
          </div>
          <div className="row">
            {/* Section Info */}
            <div className="col-md-6 mt-3 contact-widget-section2">
                <p>CATEGORIES</p>
        <select  onChange={(e)=>setCategoria(e.target.value)}
        value={categoria}  name="Category" className='form-control' style={{ width: '150px' }  }>
            <option value="1">Celulares</option>
            <option value="2" >Computadoras</option>
            <option value="3">Accesorios</option>
            <option value="4">Software</option>
            <option selected value='0'></option>
         </select>
              <div className="find-widget">
                <a href="#">image preview</a>
              </div>
             
              <div className="find-widget" >
              <img className='imagen' src={base64===''?defaulimage:base64} alt="Default Image" />
              </div>
              <div className="find-widget">
               <input className='inputfile' id='inputfile' type="file" onChange={handleFileChange} />
               <label htmlFor="inputfile" className='lableinputfile'>Image upload</label>
              </div>
            </div>
            {/* Contact Form */}
            <div className="col-md-6">
              <form
                className="shake"
                role="form"
                method="post"
                id="contactForm"
                name="contact-form"
                data-toggle="validator"
               
              >
                {/* Name */}
                <div className="form-group label-floating">
                  <label className="control-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="form-control"
                    id="name"
                    type="text"
                    name="name"
                   onChange={(e)=>setModelo(e.target.value)}
                   value={modelo}
                    required
                    data-error="Please the device name"
                  />
                  <div className="help-block with-errors" />
                </div>
                {/* Email */}
                <div className="form-group label-floating">
                  <label className="control-label" htmlFor="email">
                    Price
                  </label>
                  <input
                    className="form-control"
                    id="email"
                    type="number"
                    name="number"
                    onChange={(e)=>setPrecio(e.target.value)}
                    value={precio}

                    required
                    data-error="Please enter your Email"
                  />
                  <div className="help-block with-errors" />
                </div>
                {/* Cantidad */}
                <div className="form-group label-floating">
                  <label className="control-label" htmlFor="msg_subject">
                    Quantity
                  </label>
                  <input
                    className="form-control"
                    id="msg_subject"
                    type="number"
                    name="Cantidad"
                    onChange={(e)=>setCantidad(e.target.value)}
                    value={cantidad}

                    required
                    data-error="Please enter your message subject"
                  />
                  <div className="help-block with-errors" />
                </div>
                {/* Message */}
                <div className="form-group label-floating">
                  <label htmlFor="message" className="control-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    rows={3}
                    id="message"
                    name="message"
                    onChange={(e)=>setDescripcion(e.target.value)}
                    value={descripcion}
                    required
                    data-error="Write your description"
                  />
                  <div className="help-block with-errors" />
                </div>
                {/* Form Submit */}
                <div className="form-submit mt-5">
                  <button onClick={Add} className="btn btn-common">
                    <i className="material-icons mdi mdi-message-outline" /> Upload
                  </button>
                  <div id="msgSubmit" className="h3 text-center hidden" /> 
                  <div className="clearfix" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    

    
    </>)
}
export default Agregar;