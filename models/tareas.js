const Tarea = require("./tarea");
require('colors');

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado)
            .forEach( key => {
                const tarea = this._listado[key];
                listado.push(tarea);
            })

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    cargarTareasFromArray( tareas = [] ) {
        tareas.forEach((tarea) => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea( desc = '' ) {
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        // 1.
        console.log('LISTADOOOOOOO');
        this.listadoArr
            .forEach((tarea, i) => {
                const indice = `${i + 1}`.green;
                const { desc, completadoEn } = tarea;
                const estado = ( completadoEn )
                                    ? 'Completada'.green
                                    : 'Pendiente'.red;
                console.log(`${ indice } ${ desc } :: ${ estado }`);
            })
    }

    listarPendientesCompletadas(completadas = true) {
        let contador = 0;
        
            this.listadoArr.forEach(tarea => {
                const { desc, completadoEn } = tarea;
                const estado = (completadoEn)
                                ? 'Completada'.green
                                : 'Pendiente'.red;
                if (completadas) {
                    if(completadoEn) {
                        contador += 1;
                        console.log(` ${(contador + '.').green} ${desc} :: ${tarea.id}`) 
                    }
                } else {
                    if(!completadoEn) {
                        contador += 1;
                        console.log(` ${(contador + '.').red} ${desc} :: ${tarea.id}`) 
                    }
                }
            })
        
        // console.log('LISTADO TRUE :: FALSE ', this.listadoArr);
    }
}

module.exports = Tareas;