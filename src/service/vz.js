import axios from 'axios';
import JwtCli from '../utils/jwt';

const listVZ = async (state) => {
    try {
        JwtCli();
        const peticion = await axios.get(process.env.REACT_APP_API_URL + "/vz");
        state(peticion.data);
    } catch (error) {
        throw new Error("Error al obtener la lista de productos: " + error.message);
    }
};

const listVZById = async (id) => {
    try {
        JwtCli();
        const peticion = await axios.get(`${process.env.REACT_APP_API_URL}/vz/${id}`);
        return peticion.data
    } catch (error) {
        throw new Error("Error al obtener la lista de productos: " + error.message);
    }
};

const updateVZ = async (vzId, data) => {
    try {
        JwtCli();
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/vz/${vzId}`, data);

        return response.data;
    } catch (error) {
        throw new Error("Error al realizar la solicitud PUT: " + error.message);
    }
};


export { listVZ, updateVZ,listVZById };