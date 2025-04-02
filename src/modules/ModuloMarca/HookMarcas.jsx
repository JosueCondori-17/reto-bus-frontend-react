import { useContext, useRef } from "react";
import ValidarCamposBus from "./ValidacionCamposMarca";
import { eliminarBus, guardarBus } from "../../services/busServicio";
import { DashboardContext } from "../../context/DashboardContext";
import ValidarCamposMarca from "./ValidacionCamposMarca";
import { eliminarMarca, guardarMarca } from "../../services/marcaServicio";

const HookMarcas = () => {

    const toast = useRef(null);
    const showToast = (type, title, detail) => {
        toast.current.show({
            severity: type,
            summary: title,
            detail: detail,
            life: 3000,
        });
    };

    const { validarCampos } = ValidarCamposMarca();
    const { marcas, setMarcas, getBuses } = useContext(DashboardContext);

    const saveMarca = async (nombre, cerrarModal) => {
        const dataMarca = validarCampos(nombre)
        if (dataMarca.type == "error") {
            showToast(dataMarca.type, dataMarca.error, dataMarca.detalle)
        }
        else {
            const response = await guardarMarca(dataMarca)
            if (response.id) {
                setMarcas([...marcas, { id: response.id, ...dataMarca }])
                showToast(
                    "success",
                    `Se registró la marca ${nombre}`,
                    `Registro exitoso`
                )
                cerrarModal()
            }
            else {
                console.log("error al crear", response);
            }
        }
    };

    const actualizarMarca = async (id, nombre, cerrarModal) => {
        const dataMarca = validarCampos(nombre)
        if (dataMarca.type == "error") {
            showToast(dataMarca.type, dataMarca.error, dataMarca.detalle)
        }
        else {
            const response = await guardarMarca({ id: id, ...dataMarca })
            console.log(response)
            if (response.id) {
                setMarcas(marcas.map(m => (m.id === id ? { ...m, ...dataMarca } : m)))
                showToast(
                    "success",
                    `Se actualizó la marca ${nombre}`,
                    `Actualización exitosa`
                )
                cerrarModal()
            }
            else {
                console.log("error al actualizar", response);
            }
        }
    };

    const deleteMarca = async (id, cerrarModal) => {
        const response = await eliminarMarca(id)
        getBuses()
        setMarcas(marcas.filter(m => (m.id !== id)))
        showToast(
            "success",
            `Se eliminó la marca`,
            `Eliminación exitosa`)
        cerrarModal()
       
    };

    return { saveMarca, actualizarMarca, deleteMarca, toast };
};

export default HookMarcas;
