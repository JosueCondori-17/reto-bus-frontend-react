const ValidarCamposMarca = () => {

    const validarCampos = (nombre) => {

        if (typeof nombre !== "string" || nombre.trim().length < 1) {
            return {
                type: "error",
                error: "Campo nombre vacío",
                detalle: "Debe ingresar el nombre de la marca"
            };
        }

        const data = {
            nombre: nombre
        }

        return data;
    }

    return { validarCampos }
}

export default ValidarCamposMarca;