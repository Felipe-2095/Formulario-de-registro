window.addEventListener('DOMContentLoaded', () => {
  const form     = document.getElementById('formRegistro');
  const btnCancel= document.getElementById('btnCancelar');

  form.addEventListener('submit', validarForm);
  btnCancel.addEventListener('click', resetForm);
});

function resetForm() {
  const form = document.getElementById('formRegistro');
  form.reset();
  limpiarErrores();
}

function limpiarErrores() {
  document.querySelectorAll('.error-message').forEach(e => e.textContent = '');
  document.querySelectorAll('.error').forEach(i => i.classList.remove('error'));
}

function validarForm(e) {
  e.preventDefault();
  limpiarErrores();

  let ok = true;
  const nombre    = document.getElementById('nombre');
  const rut       = document.getElementById('rut');
  const fecha     = document.getElementById('fecha');
  const cv        = document.getElementById('cv');
  const email     = document.getElementById('email');
  const password  = document.getElementById('password');
  const repass    = document.getElementById('repassword');

  // 1. Nombre
  if (!nombre.value.trim()) {
    marcarError(nombre, 'El nombre es obligatorio.');
    ok = false;
  }

  // 2. RUT (formato 12345678-5 o 12.345.678-K)
  const rutRe = /^[0-9]{1,2}\.?[0-9]{3}\.?[0-9]{3}-[0-9Kk]$/;
  if (!rut.value.trim() || !rutRe.test(rut.value)) {
    marcarError(rut, 'Debe ingresar un RUT válido (ej. 12.345.678-5).');
    ok = false;
  }

  // 3. Fecha (solo si hay valor)
  if (fecha.value.trim()) {
    const fRe = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!fRe.test(fecha.value)) {
      marcarError(fecha, 'Fecha inválida. Formato dd/MM/yyyy.');
      ok = false;
    }
  }

  // 4. CV (si sube archivo)
  if (cv.files.length) {
    const ext = cv.files[0].name.split('.').pop().toLowerCase();
    if (!['pdf','docx'].includes(ext)) {
      marcarError(cv, 'Solo se aceptan archivos PDF o DOCX.');
      ok = false;
    }
  }

  // 5. Email
  if (!email.value.trim() || !email.checkValidity()) {
    marcarError(email, 'Correo electrónico inválido.');
    ok = false;
  }

  // 6. Contraseña
  const passRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,12}$/;
  if (!password.value || !passRe.test(password.value)) {
    marcarError(password,
      'Debe tener 6–12 caracteres, con mayúscula, minúscula y número.');
    ok = false;
  }

  // 7. Repetir contraseña
  if (!repass.value || repass.value !== password.value) {
    marcarError(repass, 'Las contraseñas no coinciden.');
    ok = false;
  }

  if (ok) {
    alert('¡Datos enviados correctamente! (simulado)');
    document.getElementById('formRegistro').reset();
  }
}

function marcarError(input, msg) {
  input.classList.add('error');
  const err = input.parentElement.querySelector('.error-message');
  err.textContent = msg;
}
