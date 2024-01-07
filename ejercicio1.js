
const usuario = {
  nombre: "Reimundo",
  apellidos: "Rasselhof Roseelpof",
  temario:[
    {
     nombre: "Node.js",
     fechaInicio: "2024-02-12" 
    },
    {
      nombre: "Git",
      fechaInicio: "2023-11-28" 
     },
     {
      nombre: "React",
      fechaInicio: "2024-04-15" 
     }
  ],
  busquedaActiva: false
};

const buscarFecha = usuario.temario.find( tema => tema.nombre === "React");

console.log("Ejercicio1"); 
console.log (`Fecha de inicio del módulo React: ${buscarFecha.fechaInicio}`);
