import axios from 'axios';
import JwtCli from '../utils/jwt';

const listGL = async (state) => {
    try {
        JwtCli();
        const peticion = await axios.get(process.env.REACT_APP_API_URL + "/gl");
        state(peticion.data);
    } catch (error) {
        throw new Error("Error al obtener la lista de productos: " + error.message);
    }
};

const listGLById = async (id) => {
    try {
        JwtCli();
        const peticion = await axios.get(`${process.env.REACT_APP_API_URL}/gl/${id}`);
        return peticion.data
    } catch (error) {
        throw new Error("Error al obtener la lista de productos: " + error.message);
    }
};

const updateGL = async (glId, data) => {
    try {
        JwtCli();
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/gl/${glId}`, data);

        return response.data;
    } catch (error) {
        throw new Error("Error al realizar la solicitud PUT: " + error.message);
    }
};


export { listGL, updateGL,listGLById };