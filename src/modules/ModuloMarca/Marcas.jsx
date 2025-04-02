import React, { useContext, useState } from 'react'
import SearchDataTable from '../../components/SearchDataTable'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { DashboardContext } from '../../context/DashboardContext'
import { ModalMarca } from './ModalMarca'

export const Marcas = () => {

    const { marcas } = useContext(DashboardContext)
    const search = SearchDataTable()

    const [title, setTitle] = useState("")
    const [action, setAction] = useState("")
    const [visible, setVisible] = useState(false)
    const [marcaItem, setMarcaItem] = useState(null)

    const openDialog = (titulo, accion, item) => {
        setTitle(titulo)
        setAction(accion)
        setMarcaItem(item)
        setVisible(true)
    }

    const butonsAccion = (data) => {
        return (
            <div style={{ display: "flex", gap: "5px" }}>
                <Button onClick={() => openDialog("Actualizar", "Actualizar", data)} severity="success" icon='pi pi-pencil' />
                <Button onClick={() => openDialog("Eliminar", "Aceptar", data)} severity="danger" icon='pi pi-trash' />
            </div>
        )
    }

    return (
        <div>
            <Button
                icon='pi pi-plus'
                label='Registrar marca'
                style={{ marginBottom: "10px" }} 
                onClick={() => openDialog("Nuevo", "Crear", null)} />
            <DataTable
                globalFilter={search.filter}
                header={search.header}
                paginator rows={5}
                value={marcas}
                tableStyle={{ minWidth: '50rem' }}>
                <Column header="ID" field='id'></Column>
                <Column header="Nombre" field='nombre'></Column>
                <Column header="Acciones"  body={(e) => butonsAccion(e)}  ></Column>
            </DataTable>
             <ModalMarca visible={visible} setVisible={setVisible} data={marcaItem} title={title} action={action} />
        </div>
    )
}
