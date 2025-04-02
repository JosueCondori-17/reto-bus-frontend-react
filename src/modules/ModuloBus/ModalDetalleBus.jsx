import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Tag } from 'primereact/tag'
import React from 'react'

export const ModalDetalleBus = ({ visible, setVisible, data, id }) => {
    return (
        <div>
            <Dialog visible={visible} onHide={() => setVisible(false)}
                header={"Datos del bus"}
                style={{width:"300px"}}
                footer={<>
                    <Button onClick={() => setVisible(false)} label='Cerrar' severity='danger' />
                </>}>
                {
                    data != null ?
                        <>
                            <div>
                                <p><b>ID :</b> {data?.id}</p>
                                <p><b>Número de BUS:</b> {data?.numero_bus}</p>
                                <p><b>Placa:</b> {data?.placa}</p>
                                <p><b>Fecha de creación:</b> {data?.fecha_creacion}</p>
                                <p><b>Características:</b> {data?.caracteristicas}</p>
                                <p><b>Marca:</b> {data?.marca?.nombre}</p>
                                <Tag value={data?.estado ? "Activo" : "Inactivo"} severity={data?.estado ? "success" : "danger"}className='mr-2 mb-2' rounded />
                            </div>

                        </>
                        :
                        <>
                            No se encontró un Registro con el ID {id}
                        </>
                }
            </Dialog>
        </div>
    )
}
