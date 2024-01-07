
const datos= [
{
  id: 1,
  nombre: 'Juan',
  habilidades: ['Javascript', 'HTML', 'CSS'],
  proyectos: [
    {id: 1, nombre: 'Proyecto 1'},
    {id: 2, nombre: 'Proyecto 2'}
  ]
},
{
  id: 2,
  nombre: 'María',
  habilidades: ['Python', 'SQL', 'Django'],
  proyectos: [
    {id: 3, nombre: 'Proyecto 3'},
    {id: 4, nombre: 'Proyecto 4'}
  ]
},
{
  id: 3,
  nombre: 'Pedro',
  habilidades: ['Java', 'Spring', 'Hibernate'],
  proyectos: [
    {id: 5, nombre: 'Proyecto 5'},
    {id: 6, nombre: 'Proyecto 6'}
  ]
}
];

//const desarrolladoresJavascript = datos.filter( dato => dato.habilidades.includes('Javascript'))
const desarrolladoresJavascript = datos.filter( dato => {
  return dato.habilidades.some(element => {
    return element.toLocaleLowerCase() === 'javascript';
  }); 
});

console.log(desarrolladoresJavascript)


// const nombresProyectos = datos.reduce( 
//   (totalProyectos, listaProyectos) => totalProyectos.concat(
//       obtenerProyectos(listaProyectos)), []
// );

// function obtenerProyectos(listaProyectos){
//   return listaProyectos.proyectos.map( (elProyecto) => elProyecto.nombre);
// }

const nombresProyectos = datos.reduce( 
  (totalProyectos, listaProyectos) => totalProyectos.concat(
      listaProyectos.proyectos.map( (elProyecto) => elProyecto.nombre)),[]
);


console.log(nombresProyectos);

