import axios from "axios";

export const obtenerMarcas = async () => {
    try {
        const response = await axios.get('https://retospring-crudbus-api-production.up.railway.app/marcas');
        return response.data;
    }
    catch (error) {
        console.error('Error al obtener marcas:', error);
    }
}

export const guardarMarca = async(data) => {
    try {
        const response = await axios.post('https://retospring-crudbus-api-production.up.railway.app/marcas/guardar', data);
        return response.data
    } catch (error) {
        console.error('Error al crear marca:', error);
    }
}

export const eliminarMarca = async(id) => {
    try {
        const response = await axios.delete(`https://retospring-crudbus-api-production.up.railway.app/marcas/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error al eliminar marca:', error);
      }
}

export const obtenerMarcaPorId = async(id) => {
    try {
        const response = await axios.get(`https://retospring-crudbus-api-production.up.railway.app/marcas/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error al eliminar marca:', error);
      }
}