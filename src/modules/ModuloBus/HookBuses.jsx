import { useContext, useRef } from "react";
import ValidarCamposBus from "./ValidacionCamposBus";
import { eliminarBus, guardarBus, obtenerBusPorId } from "../../services/busServicio";
import { DashboardContext } from "../../context/DashboardContext";

const HookBuses = () => {

    const toast = useRef(null);
    const showToast = (type, title, detail) => {
        toast.current.show({
            severity: type,
            summary: title,
            detail: detail,
            life: 3000,
        });
    };

    const { validarCampos } = ValidarCamposBus();
    const { buses, setBuses } = useContext(DashboardContext);

    const saveBus = async (numero_bus, placa, caracteristicas, marca, activo, fecha_creacion, cerrarModal) => {
        const dataBus = validarCampos(numero_bus, placa, caracteristicas, marca, activo, fecha_creacion)
        if (dataBus.type == "error") {
            showToast(dataBus.type, dataBus.error, dataBus.detalle)
        }
        else {
            const response = await guardarBus(dataBus)
            console.log(response)
            if (response.id) {
                setBuses([...buses, { id: response.id, ...dataBus }])
                showToast(
                    "success",
                    `Se registró el bus ${dataBus.placa}`,
                    `Registro exitoso`
                )
                cerrarModal()
            }
            else {
                console.log("error al crear", response);
            }
        }
    };

    const actualizarBus = async (id, numero_bus, placa, caracteristicas, marca, activo, fecha_creacion, cerrarModal) => {
        const dataBus = validarCampos(numero_bus, placa, caracteristicas, marca, activo, fecha_creacion)
        if (dataBus.type == "error") {
            showToast(dataBus.type, dataBus.error, dataBus.detalle)
        }
        else {
            const response = await guardarBus({ id: id, ...dataBus })
            console.log(response)
            if (response.id) {
                setBuses(buses.map(b => (b.id === id ? { ...b, ...dataBus } : b)))
                showToast(
                    "success",
                    `Se actualizó el bus ${dataBus.placa}`,
                    `Actualización exitosa`
                )
                cerrarModal()
            }
            else {
                console.log("error al actualizar", response);
            }
        }

    };

    const deleteBus = async (id, cerrarModal) => {
        const response = await eliminarBus(id)
        setBuses(buses.filter(b => (b.id !== id)))
        showToast(
            "success",
            `Se eliminó el bus`,
            `Eliminación exitosa`)
        cerrarModal()
    };

    const buscarPorID = async (id) => {
        const response = await obtenerBusPorId(id)
        console.log(response)
        if (response ) {
            setBuses([{...response}]),
            showToast(
                "success",
                `Registro encontrado`,
                `Búsqueda exitosa`)
        }
        else {
            showToast(
                "success",
                `No existe el ID ${id}`,
                `Registro no encontrado`
            )
        }
    }

    return { saveBus, actualizarBus, deleteBus, toast, buscarPorID };
};
export default HookBuses;
