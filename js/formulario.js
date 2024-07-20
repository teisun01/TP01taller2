document.addEventListener('DOMContentLoaded', function () {
  // Selecciona los elementos de entrada y los checkboxes
  var nombreInput = document.getElementById('nombreInput');
  var correoInput = document.getElementById('correoInput');
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  var botonEnterate = document.getElementById('boton-enterate');

  // Variables para mantener el estado actual de los campos
  var nombreInputValor = '';
  var correoInputValor = '';

  // Inicializa el botón como deshabilitado
  botonEnterate.classList.add('deshabilitado');
  botonEnterate.setAttribute('disabled', 'disabled');

  // Agrega un evento de escucha para detectar cambios en los elementos
  nombreInput.addEventListener('input', verificarEstadoBoton);
  correoInput.addEventListener('input', verificarEstadoBoton);
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      uncheckOtherCheckboxes(checkbox);
      verificarEstadoBoton();
    });
  });

  // Al hacer clic en los campos de entrada, restaura su contenido
  nombreInput.addEventListener('click', function() {
    nombreInput.value = nombreInputValor;
  });

  correoInput.addEventListener('click', function() {
    correoInput.value = correoInputValor;
  });

  // Función para verificar el estado del botón
  function verificarEstadoBoton() {
    var checkedCheckbox = document.querySelector('input[type="checkbox"]:checked');

    // Verifica si todos los campos están completos y si el correo contiene '@'
    if (
      nombreInput.value.trim() !== '' &&
      correoInput.value.trim() !== '' &&
      checkedCheckbox &&
      validarEmail(correoInput.value)
    ) {
      // Se habilita el botón solo si todos los campos están completos y válidos
      if (nombreInput.validity.valid && correoInput.validity.valid) {
        botonEnterate.classList.remove('deshabilitado');
        botonEnterate.removeAttribute('disabled');
      } else {
        botonEnterate.classList.add('deshabilitado');
        botonEnterate.setAttribute('disabled', 'disabled');
      }
    }
  }

  // Función para desmarcar otros checkboxes cuando uno se selecciona
  function uncheckOtherCheckboxes(checkedCheckbox) {
    checkboxes.forEach(function(checkbox) {
      if (checkbox !== checkedCheckbox) {
        checkbox.checked = false;
      }
    });
  }

  // Almacenar el valor actual de los campos de entrada al perder el foco
  nombreInput.addEventListener('blur', function() {
    nombreInputValor = nombreInput.value;
  });

  correoInput.addEventListener('blur', function() {
    correoInputValor = correoInput.value;
  });

  // Función para validar el formato del correo electrónico
  function validarEmail(email) {
    // Expresión regular para validar el formato del correo electrónico
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
});
