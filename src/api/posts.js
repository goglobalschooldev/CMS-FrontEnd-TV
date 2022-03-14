import axios from 'axios';

export default axios.create({
    baseURL: 'http://192.168.2.183:4001',
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
});