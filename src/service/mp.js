import axios from 'axios';
import JwtCli from '../utils/jwt';

const listMP = async (state) => {
    try {
        JwtCli();
        const peticion = await axios.get(process.env.REACT_APP_API_URL + "/mp");
        state(peticion.data);
    } catch (error) {
        throw new Error("Error al obtener la lista de productos: " + error.message);
    }
};

const listMPById = async (id) => {
    try {
        JwtCli();
        const peticion = await axios.get(`${process.env.REACT_APP_API_URL}/mp/${id}`);
        return peticion.data
    } catch (error) {
        throw new Error("Error al obtener la lista de productos: " + error.message);
    }
};

const updateMP = async (mpId, data) => {
    try {
        JwtCli();
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/mp/${mpId}`, data);

        return response.data;
    } catch (error) {
        throw new Error("Error al realizar la solicitud PUT: " + error.message);
    }
};


export { listMP, updateMP,listMPById };