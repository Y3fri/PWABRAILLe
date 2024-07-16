import axios from 'axios';
import JwtCli from '../utils/jwt';

const listAF = async (state) => {
    try {
        JwtCli();
        const peticion = await axios.get(process.env.REACT_APP_API_URL + "/af");
        state(peticion.data);
    } catch (error) {
        throw new Error("Error al obtener la lista de productos: " + error.message);
    }
};

const updateAF = async (afId, data) => {
    try {
        JwtCli();
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/af/${afId}`, data);

        return response.data;
    } catch (error) {
        throw new Error("Error al realizar la solicitud PUT: " + error.message);
    }
};


export { listAF, updateAF };