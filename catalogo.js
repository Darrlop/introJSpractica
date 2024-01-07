console.clear();
console.log('\x1b[36m%s\x1b[0m',"--- CATÁLOGO MUSICAL ---");

function gestionarCatalogo(){


  function limpiarPantalla(){
    console.clear();
    console.log('\x1b[36m%s\x1b[0m',"--- CATÁLOGO MUSICAL ---")
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n");
  }

  function cancion (nombre, genero, duracion) {
    this.nombre = nombre,
    this.genero = genero,
    this.duracion = duracion
  }

  let catalogo = [
    {nombre: 'One', genero: 'Heavy Metal', duracion: 600},
    {nombre: 'Guyana, Cult of The Damned', genero: 'Heavy Metal', duracion: 500},
    {nombre: 'Valhalla', genero: 'Power Metal', duracion: 180},
    {nombre: 'The Number of The Beast', genero: 'Heavy Metal', duracion: 300},
    {nombre: 'The Trooper', genero: 'Heavy Metal', duracion: 240},
    {nombre: 'We Are the Truth', genero: 'Industrial Metal', duracion: 180},
    {nombre: 'Dimmu Borgir', genero: 'Black Metal', duracion: 310},
    {nombre: 'Kings of Metal', genero: 'Heavy Metal', duracion: 240},
    {nombre: 'Painkiller', genero: 'Heavy Metal', duracion: 190},
    {nombre: 'I Am The Thorn', genero: 'Gothic Metal', duracion: 290},
    {nombre: 'Nympletamine', genero: 'Gothic Metal', duracion: 290},
    {nombre: 'Progenies of the Great Apocalypse', genero: 'Black Metal', duracion: 240},
    {nombre: 'The Keeper of The Seven Keys', genero: 'Power Metal', duracion: 350},
    {nombre: 'One With The Sea', genero: 'Gothic Metal', duracion: 290},
    {nombre: 'Chains', genero: 'Dark Techno', duracion: 255},
    {nombre: 'Du Hast', genero: 'Industrial Metal', duracion: 260},
    {nombre: 'Nightfall in Middle-Earth', genero: 'Power Metal', duracion: 250},
    {nombre: 'More Human Than Human', genero: 'Industrial Metal', duracion: 260},
    {nombre: 'Arael', genero: 'Dark Techno', duracion: 210},
    {nombre: 'Deathstars', genero: 'Industrial Metal', duracion: 180},
    {nombre: 'Digy Digy Hole', genero: 'Power Metal', duracion: 310}
  ]

  function agregarCancion(){

    limpiarPantalla();

    const cancionEsNueva = nombre => {
      const hallada = catalogo.find(tema => tema.nombre.toLowerCase() === elNombre.toLowerCase());
      return hallada === undefined;
    }
    
    const elNombre = prompt("Nombre de la canción: ");
    const elGenero = prompt("Género al que pertenece: ");
    const laDuracion = parseFloat(prompt("Duración en segundos: "));
    if (elNombre === "" || elGenero === "" || (laDuracion <= 0 || isNaN(laDuracion)))
      throw new Error("Error en alguno de los datos introducidos");
    else if (!cancionEsNueva(elNombre)) {
      throw new Error("Esa canción ya está registrada en el catálogo");
    } else {
      console.log("Ok, hermano");
      let laCancion = new cancion (elNombre, elGenero,laDuracion);
      catalogo.push(laCancion);
      console.log(`Se ha añadido un tema nuevo con estos datos:
        -Nombre:\t \x1b[36m ${laCancion.nombre} \x1b[0m
        -Género:\t \x1b[36m ${laCancion.genero} \x1b[0m
        -Duración:\t \x1b[36m ${laCancion.duracion} segundos \x1b[0m
      `);
    }
  }


  const listarCanciones = () => {
    
    limpiarPantalla();
    if (catalogo.length === 0 ){
      throw new Error("El catálogo está vacío")
    }
    // for (tema of catalogo) {
    //   console.log(`¬ ${tema.nombre} / ${tema.genero} / ${tema.duracion}`)
    // }
    // Sustituyo usando console.table, que simplifica y además queda una presentación mejor

    console.log('\x1b[36m%s\x1b[0m','<<<<< LISTADO COMPLETO >>>>');
    console.table(catalogo);
  }
  
  const buscarPorGenero = (generoSelec) =>{

    limpiarPantalla();
    if (generoSelec === "") throw new Error("El campo no puede ser vacío");

    const listadoPorGenero = catalogo.filter(tema =>{
      return tema.genero.toLocaleLowerCase() === generoSelec.toLocaleLowerCase();
    });
    console.log('\x1b[36m%s\x1b[0m','<<<<< LISTADO POR GÉNERO >>>>');
    console.log(`-> ${generoSelec}`);
    console.table(listadoPorGenero);
  }


  function calcularPromedioDuracion(){  
    
    limpiarPantalla();
    const duracionTotal = catalogo.reduce((total, valor) => total + valor.duracion, 0);
    const totalCanciones = catalogo.length;
    console.log('\x1b[36m%s\x1b[0m','<<<<< PROMEDIO DE DURACION DE LAS CANCIONES >>>>');
    console.log (`
    ·Duración Total de los temas: ${duracionTotal} segundos
    ·Total de canciones en el catálogo: ${totalCanciones}
    |
    |--> PROMEDIO: \x1b[36m${totalCanciones > 0 ? (duracionTotal / totalCanciones).toFixed(2) : "0"} segundos\x1b[0m`);
  }

 
  return {
    agregarCancion: agregarCancion,
    listarCanciones: listarCanciones,
    buscarPorGenero: buscarPorGenero,
    calcularPromedioDuracion: calcularPromedioDuracion
  };
}


let miCatalogo = gestionarCatalogo();
let opc = undefined;

while (opc !== 5){
  opc = parseInt(prompt (`<<< MENÚ CATÁLOGO MUSICAL >>>
  Introduce la opción que desees:
    1- Agregar Canción 
    2- Listar catálogo
    3- Buscar por Género 
    4- Duración promedio de los temas 
    5- SALIR`));
  
  switch (opc){
    case 1:
      try{
        miCatalogo.agregarCancion();
      }catch(err){
        console.error(err.message);
      }
      break;
    case 2:
      try{
        miCatalogo.listarCanciones();
      } catch(err){
        console.error(err.message);
      }
      break;
    case 3:
      try{
        let generoIntro = prompt("Género musical a buscar:");
        miCatalogo.buscarPorGenero(generoIntro);  
      }catch(err) {
        console.error(err.message);
      }
      break;
    case 4:
      miCatalogo.calcularPromedioDuracion();
      break;
  };
}
console.log('\x1b[33m%s\x1b[0m', '\n\nFin del programa');
