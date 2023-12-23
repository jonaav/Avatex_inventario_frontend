export const cargarOpciones = (lista = []) => {
    const options = lista.map((opcion) => {
        return opcion.nombre
    });
    options.unshift("");
    return options;
}