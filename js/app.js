// variables 

const mascotaInput=document.querySelector('#mascota');
const propietarioInput=document.querySelector('#propietario');
const telefonoInput=document.querySelector('#telefono');
const fechaInput=document.querySelector('#fecha');
const horaAltaInput=document.querySelector('#hora');
const sintomasInput=document.querySelector('#sintomas');

//variables para controlas user interface
const formulario= document.querySelector('#nueva-cita');
const contenedorCitas= document.querySelector('#citas');


// controlar la edicion del edit

let editando;


/* --------------- CLASES*-----------------------*/
class Citas{
    constructor() {
        this.citas=[];
}
    agregarCita(cita){
        this.citas= [...this.citas, cita];
        console.log(this.citas);
    }

    eliminarCita(id){
        this.citas= this.citas.filter(cita => cita.id !== id);
    }
    
    editarCita(citaActualizada){

        //map retorna un nuevo arreglo de cita
        this.citas=this.citas.map(cita=> cita.id=== citaActualizada.id ? citaActualizada : cita)
    }

}


class UI{
    imprimirAlerta(mensaje, tipo){
        //crear div mensaje

        const divMensaje= document.createElement('div');
        divMensaje.classList.add('text-center','alert','d-block','col-12');

        //agregar clase teniendo en cuenta el tipo de error
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');

        }
            //mensaje de error

        divMensaje.textContent=mensaje;

        //agregar al DOM

        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        //quitar alerta
        setTimeout(()=>{
            divMensaje.remove();
        },3000)
    

    }
    imprimirCitas({citas}){
        this.limpiarHTML();
         citas.forEach(cita => {
            const {mascota,propietario,telefono,fecha,hora,sintomas,id}=cita;

            const divCita= document.createElement('div');
            divCita.classList.add('cita','p-3');
            divCita.dataset.id=id;
    
            //crear html para mostrar datos
            const mascotaP= document.createElement('h2');
            mascotaP.classList.add('card-title','font-weight-bolder');
            mascotaP.textContent=mascota;

            const propietarioP= document.createElement('p');
            propietarioP.innerHTML= `<span class="font-weight-bolder">Propietario: </span>${propietario}`

            const telefonoP= document.createElement('p');
            telefonoP.innerHTML= `<span class="font-weight-bolder">Telefono:</span> ${telefono}`
            
            const fechaP= document.createElement('p');
            fechaP.innerHTML= `<span class="font-weight-bolder">Fecha:</span> ${fecha}`
            
            const horaP= document.createElement('p');
            horaP.innerHTML= `<span class="font-weight-bolder">Hora:</span> ${hora}`
            
            const sintomasP= document.createElement('p');
            sintomasP.innerHTML= `<span class="font-weight-bolder">Sintomas:</span> ${sintomas}`
            
            //creat boton eliminar 
             const btnEliminar= document.createElement('button');
             btnEliminar.classList.add('btn','btn-danger','mr-2');
             btnEliminar.innerHTML='Eliminar  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';

             const btnEditar= document.createElement('button');
             btnEditar.classList.add('btn','btn-info');
             btnEditar.innerHTML= 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
            //eiminar cita
             btnEliminar.onclick=  ()=>{
                 eliminarCita(id)
             }
             //editar cita

             btnEditar.onclick= () =>{
                 cargarEdicion(cita);
             }

            //agregar los parrafos al div cita
    
            divCita.appendChild(mascotaP);
            divCita.appendChild(propietarioP);
            divCita.appendChild(telefonoP);
            divCita.appendChild(fechaP);
            divCita.appendChild(horaP);
            divCita.appendChild(sintomasP);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);
    
    
            //agregar div cita al html del contenedor y mostrarlo
            contenedorCitas.appendChild(divCita);
         });
        
        
    }
    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);

        }
    }
   
}

//instanciar las clases

const ui= new UI();
const adminCitas=new Citas();


//eventlisteners
eventListeners();
function eventListeners(){

    mascotaInput.addEventListener('change',datosCita);
    propietarioInput.addEventListener('change',datosCita);
    telefonoInput.addEventListener('change',datosCita);
    fechaInput.addEventListener('change',datosCita);
    
    horaAltaInput.addEventListener('change',datosCita);
    sintomasInput.addEventListener('change',datosCita);
    formulario.addEventListener('submit',nuevaCita);

}

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

function datosCita(e){

    citaOb[e.target.name]= e.target.value;
    console.log(citaOb);
}

//valida y agrega una nueva cita a la clase de citas
function nuevaCita(e){
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


function reiniciarObjeto(){
    citaOb.mascota='';
    citaOb.propietario='';
    citaOb.telefono='';
    citaOb.hora='';
    citaOb.fecha='';
    citaOb.sintomas='';

}

function eliminarCita (id){
    // eliminar la cita  en la clase principal
    adminCitas.eliminarCita(id);
    // mostrar mensaje 
    ui.imprimirAlerta('La cita se elimino correctamente');

    // refrescar las citas

    ui.imprimirCitas(adminCitas);
}

//cargar los datos y el modo edicion
function cargarEdicion(cita){
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

