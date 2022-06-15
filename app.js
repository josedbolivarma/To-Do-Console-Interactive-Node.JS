require('colors');
const { 
    inquirerMenu,
     pausa,
     leerInput,
     listadoTareasBorrar
    } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

const main = async () => {
    let opt = '';
    const tareas  = new Tareas();
    
    const tareasDB = leerDB();

    if ( tareasDB ) {
      // Establecer las tareas
      tareas.cargarTareasFromArray(tareasDB);
    }

   await pausa();

    do {
      opt = await inquirerMenu();
 
      switch (opt) {
        case '1':
            // Crear opción
            const desc = await leerInput('Descripción: ');
            tareas.crearTarea( desc );
          break;

        case '2':
          // console.log( tareas.listadoArr );
          tareas.listadoCompleto();
        break;

        case '3':
          // console.log( tareas.listadoArr );
          tareas.listarPendientesCompletadas(true);
        break;

        case '4':
          // console.log( tareas.listadoArr );
          tareas.listarPendientesCompletadas(false);
        break;

        
        case '6':
          // console.log( tareas.listadoArr );
          const id = await listadoTareasBorrar( tareas.listadoArr );
          // Preguntar si estás seguro
          console.log( {id} );
        break;
      }
      
      guardarDB( tareas.listadoArr );

      await pausa();
      
    } while (opt !== '0');
    

  }
    
main();