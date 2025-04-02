import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React, { useContext, useEffect, useState } from 'react'
import { MultiSelect } from 'primereact/multiselect'
import { Toast } from 'primereact/toast'
import HookBuses from './HookBuses'
import { DashboardContext } from '../../context/DashboardContext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Dropdown } from 'primereact/dropdown'
import { InputSwitch } from 'primereact/inputswitch'

export const ModalBus = ({ title, action, data, visible, setVisible }) => {

    const { saveBus, actualizarBus, deleteBus, toast } = HookBuses();
    const { marcas } = useContext(DashboardContext)

    const [idBus, setIdBus] = useState(null)
    const [numeroBus, setNumeroBus] = useState("")
    const [placa, setPlaca] = useState("")
    const [fechaCreacion, setFechaCreacion] = useState(new Date().toISOString())
    const [caracteristicas, setCaracteristicas] = useState("")
    const [marca, setMarca] = useState(null)
    const [activo, setActivo] = useState(false)

    const cerrarModal = () => {
        setVisible(false)
        setNumeroBus("")
        setPlaca("")
        setCaracteristicas("")
        setMarca(null)
        setActivo(false)
        setFechaCreacion(new Date())
    }

    const createOrUpdate = () => {
        action == "Crear" ?
            saveBus( numeroBus, placa, caracteristicas, marca, activo, fechaCreacion, cerrarModal)
            : action == "Actualizar" ?
                actualizarBus(data.id, numeroBus, placa, caracteristicas, marca, activo, fechaCreacion, cerrarModal)
                : deleteBus(data.id, cerrarModal)
    }

    useEffect(() => {
        setNumeroBus(data?.numero_bus)
        setPlaca(data?.placa)
        setCaracteristicas(data?.caracteristicas)
        setMarca(data?.marca)
        setActivo(data?.activo)
        setFechaCreacion(data?.fecha_creacion)
    }, [data, visible])

    return (
        <div>
            <Toast ref={toast} />
            <Dialog visible={visible} onHide={() => cerrarModal()}
                header={title + " bus"}
                footer={<>
                    <Button onClick={() => cerrarModal()} label='Cancelar' severity='danger' />
                    <Button onClick={() => createOrUpdate()} label={action} severity='success' />
                </>}>
                {title != "Eliminar" ?
                    <div className='flex flex-column gap-2'>
                        <InputText
                            keyfilter="int"
                            value={numeroBus}
                            onChange={(e) => setNumeroBus(e.target.value)}
                            placeholder='Número de bus' />
                        <InputText
                            value={placa}
                            onChange={(e) => setPlaca(e.target.value)}
                            placeholder='Placa' />
                        <InputTextarea
                            value={caracteristicas}
                            onChange={(e) => setCaracteristicas(e.target.value)}
                            placeholder='Características del bus' />
                        <Dropdown
                            value={marca}
                            onChange={(e) => setMarca(e.value)}
                            options={marcas}
                            optionLabel='nombre'
                            className='flex-grow-1' placeholder='Selecciona una marca' />
                        <div className='flex flex-column gap-2'>
                            <label>Estado del bus</label>
                            <InputSwitch
                                checked={activo}
                                onChange={(e) => activo ? setActivo(false) : setActivo(true)} />
                            {activo ? "Activo" : "Inactivo"}
                        </div>

                    </div>
                    : <div style={{ width: "300px" }}>
                        ¿Desea eliminar el registro ?
                    </div>}
            </Dialog>
        </div>
    )
}
