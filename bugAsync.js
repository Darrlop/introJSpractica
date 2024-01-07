function obtenerUsuario(id) {
  let usuario;

  return new Promise((resolve, reject) => {
    if (id !== 1){
      reject(new Error("Error al acceder a los datos: Usuario fuera de rango"));
    }
    setTimeout( () => {
      resolve(usuario = {id : 1, nombre: 'John Doe'});
        // if (id === 1) {
        //     usuario = {id : 1, nombre: 'John Doe'};
        // }
      
    }, 2000);

   });

  //return usuario;
}

async function peticionUsuario(usu){
  try{
    const usuario = await obtenerUsuario(usu);
    console.log(usuario);
  }catch (error){
    console.log(error.message)
  }
}

peticionUsuario(4)





// function getMore(x){
//   return new Promise( (resolve, reject)=> {
//     if (x === 0){
//       reject(new Error("¿Qué ostias haces?"));
//     }
//     setTimeout(() => {
//       resolve(x)
//     },2000);
    
//   });
// }

// getMore("ein??")
//   .then((x) => console.log (`Esto es ${x}`))
//   .catch(err => console.log(err.message));

// async function getTheMore(){
//   try{
//     console.log( await getMore(0));
//   }catch (error){
//     console.log(error.message)
//   } 
// }

// getTheMore()
