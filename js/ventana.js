document.addEventListener('DOMContentLoaded', function () {
  // Selecciona los elementos de entrada, los checkboxes y el botón
  var nombreInput = document.getElementById('nombreInput');
  var correoInput = document.getElementById('correoInput');
  var cineCheckbox = document.getElementById('cine');
  var musicaCheckbox = document.getElementById('musica');
  var ambasCheckbox = document.getElementById('ambas');
  var botonEnterate = document.getElementById('boton-enterate');

  // Selecciona los elementos de la ventana modal
  var modal = document.getElementById('modal');
  var botonCerrar = document.getElementById('closeModalBtn'); // Cambiado el identificador aquí
  var nombreUsuarioModal = document.getElementById('nombreUsuario');
  var correoUsuarioModal = document.getElementById('correoUsuario');

  // Agrega un evento de escucha para detectar cambios en los elementos
  if (nombreInput) nombreInput.addEventListener('input', verificarEstadoBoton);
  if (correoInput) correoInput.addEventListener('input', verificarEstadoBoton);
  if (cineCheckbox) cineCheckbox.addEventListener('change', verificarEstadoBoton);
  if (musicaCheckbox) musicaCheckbox.addEventListener('change', verificarEstadoBoton);
  if (ambasCheckbox) ambasCheckbox.addEventListener('change', verificarEstadoBoton);

  // Agrega un evento de escucha al botón para abrir la ventana modal
  if (botonEnterate) {
    botonEnterate.addEventListener('click', function (event) {
      event.preventDefault(); // Evita que el enlace redirija
      if (!botonEnterate.classList.contains('deshabilitado')) {
        nombreUsuarioModal.textContent = nombreInput.value;
        correoUsuarioModal.textContent = correoInput.value;
        modal.style.display = 'flex';
      }
    });
  }

  // Cierra la ventana modal cuando se hace clic en el botón de cerrar
  if (botonCerrar) {
    botonCerrar.addEventListener('click', function () {
      modal.style.display = 'none';
    });
  }

  // Cierra la ventana modal cuando se hace clic fuera de ella
  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });

  // Función para verificar el estado del botón
  function verificarEstadoBoton() {
    // Verifica si los campos de entrada están completos y al menos un checkbox está marcado
    if (
      nombreInput.value.trim() !== '' &&
      correoInput.value.trim() !== '' &&
      (cineCheckbox.checked || musicaCheckbox.checked || ambasCheckbox.checked)
    ) {
      // Habilita el botón solo si todos los campos están completos
      botonEnterate.classList.remove('deshabilitado');
      botonEnterate.removeAttribute('disabled');
    } else {
      // Deshabilita el botón si alguno de los campos no está completo
      botonEnterate.classList.add('deshabilitado');
      botonEnterate.setAttribute('disabled', 'disabled');
    }
  }
});
