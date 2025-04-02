import React, { useContext, useState } from 'react'
import SearchDataTable from '../../components/SearchDataTable'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { DashboardContext } from '../../context/DashboardContext';
import { ModalBus } from './ModalBus';
import { InputText } from 'primereact/inputtext';
import HookBuses from './HookBuses';
import { obtenerBusPorId } from '../../services/busServicio';
import { ModalDetalleBus } from './ModalDetalleBus';

export const Buses = () => {

    const { buses } = useContext(DashboardContext);
    const search = SearchDataTable()
    const [title, setTitle] = useState("")
    const [action, setAction] = useState("")
    const [visible, setVisible] = useState(false)
    const [busItem, setBusItem] = useState(null)

    const openDialog = (titulo, accion, item) => {
        setTitle(titulo)
        setAction(accion)
        setBusItem(item)
        setVisible(true)
    }

    const butonsAccion = (data) => {
        return (
            <div style={{ display: "flex", gap: "5px" }}>
                <Button onClick={() => openDialog("Actualizar", "Actualizar", data)} severity="success" icon='pi pi-pencil' />
                <Button onClick={() => openDialog("Eliminar", "Aceptar", data)} severity="danger" icon='pi pi-trash' />
            </div>
        )
    };

    const mostrarEstado = (data) => {
        return (<> {data?.activo ? "Activo" : "Inactivo"} </>)
    };

    const [visibleDetalle, setVisibleDetalle] = useState(false)
    const [id, setID] = useState("")

    const buscarPorID = async (id) => {
        const response = await obtenerBusPorId(id)
        if (response) {
            setVisibleDetalle(true)
            setBusItem(response)
        }
        else {
            setVisibleDetalle(true)
            setBusItem(null)
        }
    }

    return (
        <div>
            <div className='flex flex-wrap justify-content-between'>
                <Button
                    icon='pi pi-plus'
                    label='Registrar bus'
                    style={{ marginBottom: "10px" }}
                    onClick={() => openDialog("Nuevo", "Crear", null)} />
                <div className='flex flex-wrap  gap-2 align-items-center '>
                    <InputText
                        keyfilter={"int"}
                        value={id}
                        onChange={(e) => setID(e.target.value)}
                        placeholder='Ingresa el ID del bus a buscar' />
                    <Button
                        icon='pi pi-search'
                        label='Buscar por ID'
                        severity='info'
                        style={{ marginBottom: "10px" }}
                        onClick={() => buscarPorID(id)}
                    />
                </div>

            </div>

            <DataTable
                globalFilter={search.filter}
                header={search.header}
                paginator rows={5}
                value={buses}
                tableStyle={{ minWidth: '50rem' }}>
                <Column header="ID" field='id'></Column>
                <Column header="Número de bus" field='numero_bus'></Column>
                <Column header="Placa" field='placa'></Column>
                <Column header="Fecha de creación" field='fecha_creacion'></Column>
                <Column header="Características" field='caracteristicas'></Column>
                <Column header="Marca" field='marca.nombre'></Column>
                <Column header="Estado" body={(e) => mostrarEstado(e)} ></Column>
                <Column header="Acciones" body={(e) => butonsAccion(e)} ></Column>
            </DataTable>
            <ModalBus visible={visible} setVisible={setVisible} data={busItem} title={title} action={action} />
            <ModalDetalleBus visible={visibleDetalle} setVisible={setVisibleDetalle} data={busItem} id={id}/>
        </div>
    )
}
