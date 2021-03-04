import {eliminarCita, cargarEdicion} from '../funciones.js';
import {contenedorCitas} from '../selectores.js'


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


export default UI;