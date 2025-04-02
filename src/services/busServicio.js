import axios from "axios";

export const obtenerBuses = async () => {
    try {
        const response = await axios.get('https://retospring-crudbus-api-production.up.railway.app/buses');
        return response.data;
    }
    catch (error) {
        console.error('Error al obtener buses:', error);
    }
}

export const guardarBus = async(data) => {
    try {
        const response = await axios.post('https://retospring-crudbus-api-production.up.railway.app/buses/guardar', data);
        return response.data
    } catch (error) {
        console.error('Error al guardar bus:', error);
    }
}

export const eliminarBus = async(id) => {
    try {
        const response = await axios.delete(`https://retospring-crudbus-api-production.up.railway.app/buses/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error al eliminar bus:', error);
      }
}

export const obtenerBusPorId = async(id) => {
    try {
        const response = await axios.get(`https://retospring-crudbus-api-production.up.railway.app/buses/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error al obtener bus:', error);
      }
}