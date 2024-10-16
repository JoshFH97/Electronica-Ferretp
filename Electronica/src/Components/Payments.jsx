import { useState } from "react"
import Cookies from 'js-cookie';//Se importa Cookies
import { showToast } from '../hooks/alertas.js';//Se importan ALERTAS
import usingFetch from '../hooks/usingFetch.js';//Metodos Fetch
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Payments =()=>{
const [pago,setPago]=useState(false)//Estado para ver si se logro procesar el pago exitosamente
const stripePromise = loadStripe("pk_test_51QABlPRqzbauyrEOs9goZGDL5nouE89NviOHIKc3hgjUE6EGy6BseUV6Zo2zpAXFtBALvwpvsacd5umGdfvQSSmW00Mo35Bby0");
  const SubmitPayment =async()=>{


let endpoint='api/orden/'
    //si el pago fue exitoso se crean detalles de factura
if (pago) {
  const orden={
  estado:'Activo',
  id_usuario_id:Cookies.get('userID')
  }


  const respuesta = await usingFetch.post(endpoint, orden);
  console.log(respuesta);
  
}else{
// si el pago no es exitoso se deja saber

showToast('Pago no procesado', 'error')

}


  }





return(
    <>
    <div className="col-lg-6 px-5 py-4">
                      <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">Payment</h3>
                      <form className="mb-5">
                        <div className="form-outline mb-5">
                          <input type="text" id="typeText" className="form-control form-control-lg"   />
                          <label className="form-label" htmlFor="typeText">Card Number</label>
                        </div>
                        <div className="form-outline mb-5">
                          <input type="text" id="typeName" className="form-control form-control-lg"   />
                          <label className="form-label" htmlFor="typeName">Name on card</label>
                        </div>
                        <div className="row">
                          <div className="col-md-6 mb-5">
                            <div className="form-outline">
                              <input type="text" id="typeExp" className="form-control form-control-lg"   />
                              <label className="form-label" htmlFor="typeExp">Expiration</label>
                            </div>
                          </div>
                          <div className="col-md-6 mb-5">
                            <div className="form-outline">
                              <input type="password" id="typeCvv" className="form-control form-control-lg"   />
                              <label className="form-label" htmlFor="typeCvv">Cvv</label>
                            </div>
                          </div>
                        </div>
                        <p className="mb-5">
                          Lorem ipsum dolor sit amet consectetur, adipisicing elit{" "}
                          <a href="#!">obcaecati sapiente</a>.
                        </p>
                        <button type="button" className="btn btn-primary btn-block btn-lg">Buy now</button>
                        <h5 className="fw-bold mb-5" style={{ position: "absolute", bottom: 0 }}>
                          <a href="#!">
                            <i className="fas fa-angle-left me-2" />Back to shopping
                          </a>
                        </h5>
                      </form>
                    </div>
    </>
)
}
export default Payments