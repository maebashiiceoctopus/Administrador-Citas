import {
    mascotaInput,
    telefonoInput,
    sintomasInput,
    horaAltaInput,
    fechaInput,
    propietarioInput,
    formulario
} from '../selectores.js'

    import {nuevaCita,datosCita} from '../funciones.js'
class App {
  constructor() {
    this.initApp();
  }

  initApp() {
    //eventlisteners
    mascotaInput.addEventListener("change", datosCita);
    propietarioInput.addEventListener("change", datosCita);
    telefonoInput.addEventListener("change", datosCita);
    fechaInput.addEventListener("change", datosCita);

    horaAltaInput.addEventListener("change", datosCita);
    sintomasInput.addEventListener("change", datosCita);
    formulario.addEventListener("submit", nuevaCita);
  }
}

export default App;