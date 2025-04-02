import React, { createContext, useEffect, useState } from 'react';
import { obtenerBuses } from '../services/busServicio';
import { obtenerMarcas } from '../services/marcaServicio';

export const DashboardContext = createContext()

export const DashboardProvider = (props) => {

    const [marcas, setMarcas] = useState([]);
    const [buses, setBuses] = useState([]);

    const getMarcas = async () => {
        const marcas = await obtenerMarcas();
        setMarcas(marcas)
    };

    const getBuses = async () => {
        const buses = await obtenerBuses();
        setBuses(buses)
    };

    useEffect(() => {
        getMarcas();
        getBuses();
    }, []);


    return (
        <DashboardContext.Provider
            value={{
                marcas, setMarcas,
                buses, setBuses,
                getBuses
            }}
        >
            {props.children}
        </DashboardContext.Provider>
    )
}
