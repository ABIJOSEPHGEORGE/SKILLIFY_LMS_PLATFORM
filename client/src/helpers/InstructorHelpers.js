import axios from 'axios'
import { details } from '../config';
axios.defaults.baseURL = details.base_url

//instructor signup
export const instructorSignup=async(values)=>{
    const response = await axios.post('/instructor/signup',values);
    return response.data;
}