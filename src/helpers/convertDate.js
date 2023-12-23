
export const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export const convertDate = (fechaOriginal) => {
    const fecha = new Date(fechaOriginal);

    const dia = fecha.getDate().toString().padStart(2, '0'); // Obtener el día y asegurarse de que tenga 2 dígitos
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Obtener el mes (0 es enero, por lo que se le suma 1) y asegurarse de que tenga 2 dígitos
    const año = fecha.getFullYear();

    const fechaFormateada = `${dia}/${mes}/${año}`;
    return fechaFormateada
}


export const getNombreMes = (fechaOriginal) => {
    const fecha = new Date(fechaOriginal);
    const indiceMes = fecha.getMonth();
    const nombreMes = meses[indiceMes];
    return nombreMes;
}

export const getNumMes = (mes) => {
    const numMes = meses.findIndex((m) => m.toLowerCase() === mes.toLowerCase());
    return numMes + 1;
}

export const getYears = () => {

    const startYear = 2020;
    const currentYear = new Date().getFullYear();
    const years = [];

    for (let index = startYear; index <= currentYear; index++) {
        years.push(index);
    }
    return years;
}