import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import { Toast } from 'primereact/toast'
import HookMarcas from './HookMarcas'

export const ModalMarca = ({ title, action, data, visible, setVisible }) => {

    const { saveMarca, actualizarMarca, deleteMarca, toast } = HookMarcas();

    const [name, setName] = useState("")

    const cerrarModal = () => {
        setVisible(false), setName("")
    }

    const createOrUpdate = () => {
        action == "Crear" ? saveMarca(name, cerrarModal)
            : action == "Actualizar" ? actualizarMarca(data.id, name, cerrarModal)
                : deleteMarca(data.id, cerrarModal)
    }

    useEffect(() => { setName(data?.nombre) }, [data, visible])

    return (
        <div>
            <Toast ref={toast} />
            <Dialog visible={visible} onHide={() => cerrarModal()}
                header={title + " marca"}
                footer={<>
                    <Button onClick={() => cerrarModal()} label='Cancelar' severity='danger' />
                    <Button onClick={() => createOrUpdate()} label={action} severity='success' />
                </>}>
                {title != "Eliminar" ?
                    <div className='flex flex-column gap-2'>
                        <InputText
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Nombre de la marca' />
                    </div>
                    : <div style={{ width: "300px" }}>
                        ¿Está seguro de Eliminar el registro, El sistema borrará a todos los buses asociados a esta marca?
                    </div>}
            </Dialog>
        </div>
    )
}
