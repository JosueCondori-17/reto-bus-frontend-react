import React from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import { Marcas } from '../modules/ModuloMarca/Marcas';
import { Buses } from '../modules/ModuloBus/Buses';

export const VistaCrud = () => {
    return (
        <div className='cuerpodepagina'>
            <TabView>
                <TabPanel header="Lista de Buses">
                    <Buses />
                </TabPanel>
                <TabPanel header="Lista de Marcas">
                    <Marcas />
                </TabPanel>
            </TabView>
        </div>
    )
}
