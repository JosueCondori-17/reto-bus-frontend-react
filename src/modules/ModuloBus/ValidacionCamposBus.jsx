const ValidarCamposBus = () => {

    const validarCampos = (numero_bus, placa, caracteristicas, marca, activo, fecha_creacion) => {
        console.log(numero_bus)
        if (!numero_bus || String(numero_bus).trim().length < 1) {
            return {
                type: "error",
                error: "Campo número de bus vacío",
                detalle: "Debe ingresar el número del bus"
            };
        }

        if (typeof placa !== "string" || placa.trim().length < 1) {
            return {
                type: "error",
                error: "Campo placa vacío",
                detalle: "Debe ingresar la placa del bus"
            };
        }

        if (typeof caracteristicas !== "string" || caracteristicas.trim().length < 1) {
            return {
                type: "error",
                error: "Campo características vacío",
                detalle: "Debe ingresar las características del bus"
            };
        }

        if (marca == null) {
            return {
                type: "error",
                error: "Complete campo marca",
                detalle: "Seleccione la marca del bus"
            };
        }

        const data = {
            placa: placa,
            caracteristicas: caracteristicas,
            marca: marca,
            activo: activo,
            numero_bus: parseInt(numero_bus, 10),
            fecha_creacion: fecha_creacion || new Date().toISOString()
        }

        return data;
    }

    return { validarCampos }
}

export default ValidarCamposBus;