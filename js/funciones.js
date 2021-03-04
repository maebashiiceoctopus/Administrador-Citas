import {
    mascotaInput,
    telefonoInput,
    sintomasInput,
    horaAltaInput,
    fechaInput,
    propietarioInput,
    formulario
} from './selectores.js';

import UI from './classes/UI.js'

import Citas from './classes/Citas.js'
// controlar la edicion del edit



//instanciar las clases

const ui= new UI();
const adminCitas=new Citas();

let editando;



//objeto cita para llenar
const citaOb={
    mascota:'',
    propietario:'',
    telefono:'',
    fecha:'',
    hora:'',
    sintomas:''
}


// agregar los datos al objeto de cita 

export function datosCita(e){

    citaOb[e.target.name]= e.target.value;
    console.log(citaOb);
}

//valida y agrega una nueva cita a la clase de citas
export function nuevaCita(e){
    e.preventDefault();

    //extraer informacion obj
    const {mascota,propietario,hora,sintomas,fecha,telefono}= citaOb;

    if(mascota ==='' ||propietario ==='' || telefono==='' ||fecha === '' || hora==='' || sintomas ===''){
        ui.imprimirAlerta('Todos los campos son obligatorios','error');
        return;
    }
    if(editando){
        //pasar objeto cita a edicion
        adminCitas.editarCita({...citaOb});

        ui.imprimirAlerta('Se edito correctamente la cita');

        //restaurar boton
    formulario.querySelector('button[type="submit"]').textContent='Crear cita';
    editando=false;

    }else{
         //crear id para la cita 
    citaOb.id=Date.now();

    //crear la nueva cita 
    adminCitas.agregarCita({...citaOb});

    ui.imprimirAlerta('Se agrego correctamente la cita');
    }

//REINICIAR VALORES FORM
    formulario.reset();

    //reiniciar el objecto
    reiniciarObjeto();
    //mostrar el html de las citas 

    ui.imprimirCitas(adminCitas);
}


export function reiniciarObjeto(){
    citaOb.mascota='';
    citaOb.propietario='';
    citaOb.telefono='';
    citaOb.hora='';
    citaOb.fecha='';
    citaOb.sintomas='';

}

export function eliminarCita (id){
    // eliminar la cita  en la clase principal
    adminCitas.eliminarCita(id);
    // mostrar mensaje 
    ui.imprimirAlerta('La cita se elimino correctamente');

    // refrescar las citas

    ui.imprimirCitas(adminCitas);
}

//cargar los datos y el modo edicion
export function cargarEdicion(cita){
   const {mascota,propietario,telefono,fecha,hora,sintomas,id}=cita;

    // LLENAR LOS IMPUTS

    mascotaInput.value= mascota;
    propietarioInput.value=propietario;
    telefonoInput.value= telefono;
    fechaInput.value= fecha;
    horaAltaInput.value= hora;
    sintomasInput.value= sintomas;

    //llenar objeto 

    citaOb.mascota= mascota;
    citaOb.propietario= propietario;
    citaOb.telefono= telefono;
    citaOb.hora= hora;
    citaOb.fecha= fecha;
    citaOb.sintomas= sintomas;
    citaOb.id=id;

    //cambiar el texto del boton


    formulario.querySelector('button[type="submit"]').textContent='Guardar Cambios';
    editando=true;
}

