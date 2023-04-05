import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001'

//instructor signup
export const instructorSignup=async(values)=>{
    const response = await axios.post('/instructor/signup',values);
    return response.data;
}