import { useEffect,useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import {Elements} from '@stripe/react-stripe-js'
import StripeForm from "./StripeForm";

function StripePayment({billing_address}){
    const [stripePromise,setStripPromise] = useState(null);
    const [clientSecret,setClientSecret] = useState("")
    
    useEffect(()=>{
        axios.get('/user/stripe/publish-key')
        .then((res)=>{
            setStripPromise(loadStripe(res.data.results))
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    useEffect(()=>{
        axios.post('/user/checkout/stripe',billing_address)
        .then((res)=>{
            setClientSecret(res.data.results.client_secret);
            sessionStorage.setItem('orderId',res.data.results.order_id);
        })
        .catch((err)=>{
            console.log(err)
        })
    },[billing_address])
    const appearance = {
        // If you are planning to extensively customize rules, use the "none"
        // theme. This theme provides a minimal number of rules by default to avoid
        // interfering with your custom rule definitions.
        theme: 'flat',
    
        rules: {
          '.Tab': {
            border: '1px solid #E0E6EB',
            boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)',
          },
    
          '.Tab:hover': {
            color: 'var(--colorText)',
          },
    
          '.Tab--selected': {
            borderColor: '#E0E6EB',
            boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)',
          },
    
          '.Input--invalid': {
            boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 2px var(--colorDanger)',
          },
    
          // See all supported class names and selector syntax below
        }
      };
    return (
        <div className="w-full h-full p-10 flex place-content-center place-items-center">
            {
                stripePromise && clientSecret && (
                    <Elements stripe={stripePromise} options={{clientSecret,appearance}}>
                        <StripeForm/>
                    </Elements>
                )
            }
        </div>
    )
}

export default StripePayment;