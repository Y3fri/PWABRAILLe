import axios from 'axios';
import JwtCli from '../utils/jwt';

const listQU = async (state) => {
    try {
        JwtCli();
        const peticion = await axios.get(process.env.REACT_APP_API_URL + "/qu");
        state(peticion.data);
    } catch (error) {
        throw new Error("Error al obtener la lista de productos: " + error.message);
    }
};

const listQUById = async (id) => {
    try {
        JwtCli();
        const peticion = await axios.get(`${process.env.REACT_APP_API_URL}/qu/${id}`);
        return peticion.data
    } catch (error) {
        throw new Error("Error al obtener la lista de productos: " + error.message);
    }
};

const updateQU = async (quId, data) => {
    try {
        JwtCli();
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/qu/${quId}`, data);

        return response.data;
    } catch (error) {
        throw new Error("Error al realizar la solicitud PUT: " + error.message);
    }
};


export { listQU, updateQU,listQUById };