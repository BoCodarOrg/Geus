import axios from 'axios';

const Api =  axios.create({
    baseURL: `http://${process.env.NEXT_PUBLIC_SERVER_ADDRESS}`
})

export default Api;