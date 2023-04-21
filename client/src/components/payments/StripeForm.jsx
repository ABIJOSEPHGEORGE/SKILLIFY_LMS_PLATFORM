import React,{useState} from 'react'
import {useStripe,useElements} from '@stripe/react-stripe-js'
import { PaymentElement } from '@stripe/react-stripe-js';
import ConfirmOrder from './ConfirmOrder';
import { useNavigate } from 'react-router-dom';



function StripeForm() {
    const [message,setMessage] = useState(null);
    const [isProcessing,setIsProcessing] = useState(false)
    const stripe = useStripe();
    const elements = useElements();
    const [orderId, setOrderId] = useState(null);
    const navigate = useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault()

        if(!stripe || !elements){
            return;
        }

        setIsProcessing(true)

        const {paymentIntent,error} = await stripe.confirmPayment({
            elements,
            confirmParams:{
                return_url : `${window.location.origin}/`,

            },

            redirect:"if_required"
        })
        
        if(error){
            setMessage(error.message);
            
        }else if(paymentIntent && paymentIntent.status==="succeeded"){
            const order_id = sessionStorage.getItem('orderId');
            setOrderId(order_id);

        }else{
            setMessage('Unexpected stat')
        }
        
        setIsProcessing(false);
        
    }
  return (
    <div className="w-full h-full">
        {
            !orderId ?
            <div className='w-full h-full flex flex-col place-content-center place-items-center absolute bg-black bg-opacity-5 top-0 left-0'>
    
                <form className='w-2/5 bg-white shadow-xl rounded-md p-5 h-auto flex flex-col place-content-center gap-4' onSubmit={handleSubmit}>
                    <div>
                        <h2 className='text-center text-primaryBlue font-poppins font-semibold text-xl'>Stripe Payment</h2>
                    </div>
                    <PaymentElement/>
                    <div className='w-full flex place-content-center'>
                        <button className='bg-darkPink text-white w-3/5 px-5 py-3' disabled={isProcessing} id='submit'>
                            <span id='button-text'>
                                {isProcessing ? "Processing..." : 'Pay now'}
                            </span>
                        </button>
                    </div>
                    {
                        message && <div>{message}</div>
                    }
                    
                </form>
                
            </div>

            :
            <div className='absolute bg-white top-0 left-0 w-full h-full'>
                <ConfirmOrder orderId={orderId}/>
            </div>
        }
           
    </div>
        
)}


export default StripeForm