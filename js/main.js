
// let pie = document.getElementById('PiePagina');

// console.log(pie.name);

console.log(document.location.pathname);

if (document.location.pathname == '/index.html' || document.location.pathname == '/proximos.html' || document.location.pathname == '/pasados.html' || document.location.pathname == '/detalle.html') {
  $.ajax({
    url: "http://127.0.0.1:5500/info.json"
  }).done(function (respuesta) {


    let datos = respuesta;
    let FechaActual = datos.fechaActual;

    console.log(datos.eventos);

    let nombreAntiguos = [];
    let fechaAntiguos = [];
    let descripcionAntiguos = [];
    let lugarAntiguos = [];
    let invitadosAntiguos = [];
    let costosAntiguos = [];

    let nombreNuevos = [];
    let fechaNuevos = [];
    let descripcionNuevos = [];
    let lugarNuevos = [];
    let invitadosNuevos = [];
    let costosNuevos = [];

    for (let i = 0; i < datos.eventos.length; i++) {
      let evento = datos.eventos[i];
      if (evento.fecha < FechaActual) {
        nombreAntiguos.push(evento.nombre);
        fechaAntiguos.push(evento.fecha);
        descripcionAntiguos.push(evento.descripcion);
        lugarAntiguos.push(evento.lugar);
        invitadosAntiguos.push(evento.invitados);
        costosAntiguos.push(evento.precio);
      }
      if (evento.fecha > FechaActual) {
        nombreNuevos.push(evento.nombre);
        fechaNuevos.push(evento.fecha);
        descripcionNuevos.push(evento.descripcion);
        lugarNuevos.push(evento.lugar);
        invitadosNuevos.push(evento.invitados);
        costosNuevos.push(evento.precio);
      }
    }

    if (document.location.pathname == '/index.html'){
      let app = document.querySelector('#proximos');
      app.insertAdjacentHTML('beforebegin',
      `<div class="row mb-3">
        <div class="col-5 bg-white mx-auto">
        <a type="button" href="./detalle.html?id=0&epoca=nuevo" class="btn btn-link" id="BotonLink">${nombreNuevos[0]}</a>
        <p class="estiloFechas">${fechaNuevos[0]}</p>
        <p class="estiloDescripcion">${descripcionNuevos[0]}</p>
        </div>
        <div class="col-5 bg-white">
        <a type="button" href="./detalle.html?id=1&epoca=nuevo" class="btn btn-link" id="BotonLink">${nombreNuevos[1]}</a>
        <p class="estiloFechas">${fechaNuevos[1]}</p>
        <p class="estiloDescripcion">${descripcionNuevos[1]}</p>
        </div>
      </div>`
    );
    }
  
    if (document.location.pathname == '/proximos.html'){
      let app = document.querySelector('#proximos');
      for (let i=0; i<nombreNuevos.length;i++){
        console.log(nombreNuevos[i]);
        app.insertAdjacentHTML('beforebegin',
      ` <div class="col-8 bg-white mx-auto">
        <a type="button" href="./detalle.html?id=${i}&epoca=nuevo" class="btn btn-link" id="BotonLink">${nombreNuevos[i]}</a>
        <p class="estiloFechas">${fechaNuevos[i]}</p>
        <p class="estiloDescripcion">${descripcionNuevos[i]}</p>
        <p class="text-info">Invitados: ${invitadosNuevos[i]}</p>
        </div>`
      );
      }
    }

    if (document.location.pathname == '/index.html'){
      let app = document.querySelector('#pasados');
      app.insertAdjacentHTML('beforebegin',
      `<div class="row mb-3">
        <div class="col-5 bg-white mx-auto">
        <a type="button" href="./detalle.html?id=0&epoca=antiguo" class="btn btn-link" id="BotonLink" href="./detalle.html">${nombreAntiguos[0]}</a>
        <p class="estiloFechas">${fechaAntiguos[0]}</p>
        <p class="estiloDescripcion">${descripcionAntiguos[0]}</p>
        </div>
        <div class="col-5 bg-white">
        <a type="button" href="./detalle.html?id=1&epoca=nuevo" class="btn btn-link" id="BotonLink">${nombreAntiguos[1]}</a>
        <p class="estiloFechas">${fechaAntiguos[1]}</p>
        <p class="estiloDescripcion">${descripcionAntiguos[1]}</p>
        </div>
      </div>`
    );
    }

    if (document.location.pathname == '/pasados.html'){
      let antiguos=1;
      let app = document.querySelector('#pasados');
      for (let i=0; i<nombreAntiguos.length;i++){
        console.log(nombreAntiguos[i]);
      app.insertAdjacentHTML('beforebegin',
      ` <div class="col-8 bg-white mx-auto">
      <a type="button" href="./detalle.html?id=${i}&epoca=antiguo" class="btn btn-link" id="BotonLink">${nombreAntiguos[i]}</a>
        <p class="estiloFechas">${fechaAntiguos[i]}</p>
        <p class="estiloDescripcion">${descripcionAntiguos[i]}</p>
        <p class="text-info">Invitados: ${invitadosAntiguos[i]}</p>
        </div>
      `);
      }
    }

    if (document.location.pathname == '/detalle.html'){
      const valores = window.location.search;
      const urlParams = new URLSearchParams(valores);
      var idenficador = urlParams.get('id');
      var epoca = urlParams.get('epoca');
      
      if (epoca == 'nuevo'){
        let app = document.querySelector('#evento');
        app.insertAdjacentHTML('beforebegin',
        `<div class="row mb-3">
        <div class="col-8 bg-white mx-auto">
        <h2 class="mt-2 ml-1" id="BotonLink">${nombreNuevos[idenficador]}</h2>
        <p class="estiloFechas">${fechaNuevos[idenficador]}</p>
        <p class="estiloDescripcion">${descripcionNuevos[idenficador]}</p>
        <p class="estiloDescripcion text-info">Costo: ${costosNuevos[idenficador]}</p>
        <p class="estiloDescripcion text-warning">Invitador: ${invitadosNuevos[idenficador]}</p>
        </div>`);
      }
      if (epoca == 'antiguo'){
        let app = document.querySelector('#evento');
        app.insertAdjacentHTML('beforebegin',
        `<div class="row mb-3">
        <div class="col-8 bg-white mx-auto">
        <h2 class="mt-2 ml-1" id="BotonLink">${nombreAntiguos[idenficador]}</h2>
        <p class="estiloFechas">${fechaAntiguos[idenficador]}</p>
        <p class="estiloDescripcion">${descripcionAntiguos[idenficador]}</p>
        <p class="estiloDescripcion text-info">Costo: ${costosAntiguos[idenficador]}</p>
        <p class="estiloDescripcion text-warning">Invitador: ${invitadosAntiguos[idenficador]}</p>
        `);
      }
    }

  })
}

function validar(registro){

  if(registro.NombreCompleto.value.trim().length== 0){
    alert('Nombres obligatorios');
    return false;
  }

  if (registro.correo.value.trim().length == 0){
    alert('Correo obligatorio');
    return false;
  }
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(registro.correo.value)) {
  alert("Email inválido");
  return false;
  }
  if (registro.contrasena.value.trim().length == 0){
  alert("La constraseña es obligatoria");
  return false;
  }
  if (registro.contrasena.value.trim().length > 0 && registro.contrasena.value.trim().length <8){
      alert("La constraseña debe tener un mínimo de 8 caracteres");
      return false;
  }
  if (registro.confirmacion.value != registro.contrasena.value){
      alert("Las contraseñas no coinciden");
      return false;
  }
  if (registro.usuario.value == 'Seleccione'){
    alert("Verificar el tipo de usuario");
    return false;
  }
  if (!registro.acepto.checked){
    alert("Debe aceptar terminos y condiciones");
    return false;
}
  

}