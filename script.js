function startCountdown() {
    var countdownElement = document.getElementById("countdown");
  
    // Función para formatear los números con ceros a la izquierda
    function formatNumber(number) {
      return number.toString().padStart(2, '0');
    }
  
    // Obtener el tiempo de inicio del almacenamiento local
    var countdownTime = localStorage.getItem("countdownTime");
  
    // Inicializar el tiempo de inicio en 23:59:59 si no hay un tiempo guardado
    if (!countdownTime) {
      countdownTime = "23:59:59";
      localStorage.setItem("countdownTime", countdownTime);
    }
  
    var timeParts = countdownTime.split(":");
    var hours = parseInt(timeParts[0]);
    var minutes = parseInt(timeParts[1]);
    var seconds = parseInt(timeParts[2]);
  
    // Función para actualizar el contador en la página
    function updateCountdown() {
      // Actualizar el contenido del elemento de contador
      countdownElement.innerHTML = `
    <span id="hours">${formatNumber(hours)}</span>
    <span class="separator">:</span>
    <span id="minutes">${formatNumber(minutes)}</span>
    <span class="separator">:</span>
    <span id="seconds">${formatNumber(seconds)}</span>
  `;
  
      // Actualizar el tiempo restante
      if (seconds > 0) {
        seconds--;
      } else {
        seconds = 59;
        if (minutes > 0) {
          minutes--;
        } else {
          minutes = 59;
          if (hours > 0) {
            hours--;
          } else {
            // Si el contador llega a 00:00:00, reiniciarlo a 23:59:59
            hours = 23;
            minutes = 59;
            seconds = 59;
          }
        }
      }
  
      // Guardar el tiempo actualizado en el almacenamiento local
      countdownTime = formatNumber(hours) + ":" + formatNumber(minutes) + ":" + formatNumber(seconds);
      localStorage.setItem("countdownTime", countdownTime);
    }
  
    // Actualizar el contador inicialmente
    updateCountdown();
  
    // Actualizar el contador cada segundo
    setInterval(updateCountdown, 1000);
  }
  
  // Iniciar el contador cuando se carga la página
  startCountdown();
  


  function toggleRespuesta(event) {
    const preguntaElemento = event.currentTarget;
    const respuestaElemento = preguntaElemento.querySelector('.respuesta');
  
    if (preguntaElemento.classList.contains('expandida')) {
      preguntaElemento.classList.remove('expandida');
      respuestaElemento.style.height = '0';
      respuestaElemento.style.opacity = '0';
    } else {
      const respuestasExpandidas = document.querySelectorAll('.pregunta.expandida');
      respuestasExpandidas.forEach((elemento) => {
        elemento.classList.remove('expandida');
        const respuestaExpandida = elemento.querySelector('.respuesta');
        respuestaExpandida.style.height = '0';
        respuestaExpandida.style.opacity = '0';
      });
  
      preguntaElemento.classList.add('expandida');
      respuestaElemento.style.display = 'block';
      respuestaElemento.style.height = respuestaElemento.scrollHeight + 'px';
      respuestaElemento.style.opacity = '1';
    }
  }
  
  function renderizarPreguntasRespuestas() {
    const preguntasRespuestas = [
      {
        pregunta: '¿Tengo garantía?',
        respuesta: 'Estamos tan seguros y convencidos del contenido del programa que tienes 7 días de garantía; Si no quedas satisfecho durante estos días desde que realizaste la compra puedes solicitar la devolución del 100% de tu dinero directamente en la plataforma de Hotmart donde esta alojado el programa.'
      },
      {
        pregunta: 'Quiero inscribirme ¿Cómo funciona?',
        respuesta: 'Una vez realices el pago el sistema automáticamente te enviará las instrucciones a tu correo electrónico para acceder a la plataforma donde podrás iniciar tu capacitación inmediatamente.'
      },
      {
        pregunta: '¿Cómo hago el pago?',
        respuesta: 'Pago disponible con TODAS las tarjetas, si tu tarjeta es de débito, deberás seleccionar la opción "tarjeta de crédito". Pagos a través de Paypal disponible para TODOS LOS PAÍSES.'
      },
      {
        pregunta: '¿Puedo pagar en efectivo?',
        respuesta: 'Si deseas hacer pago en efectivo, en la parte inferior encuentras un botón para que nos escribas y poderte generar el ticket de pago en efectivo el cual solo aplica para los siguientes países: México (Oxxo), Chile (Sencillito), Perú (PagoEfectivo) y Argentina (Rapi Pago). En caso realices éste último método de pago en efectivo, recuerda que tienes hasta 3 días para poder pagar el ticket de pago en efectivo, caso contrario el código que se genera ya no será válido y tendrá que generar un nuevo pago.'
      },
      {
        pregunta: '¿Cuál es el valor en la moneda de mi país?',
        respuesta: 'Da clic en el botón amarillo que encuentras más abajo donde dice "Quiero comprar el programa", allí te mostrará el precio en tu moneda local.'
      },
      {
        pregunta: 'Compra protegida',
        respuesta: 'Totalmente, nuestros programas se encuentran respaldados en tecnología, soporte y seguridad por HOTMART la compañía de productos digitales más grande de habla hispana, ellos aseguran tu pago y tu dinero por 7 días, en caso de querer un reembolso.'
      },
    ];
  
    const frecuentesElemento = document.getElementById('frecuentes');
  
    preguntasRespuestas.forEach((preguntaRespuesta) => {
      const preguntaElemento = document.createElement('div');
      preguntaElemento.classList.add('pregunta');
      preguntaElemento.dataset.pregunta = preguntaRespuesta.pregunta;
      preguntaElemento.dataset.respuesta = preguntaRespuesta.respuesta;
      preguntaElemento.textContent = preguntaRespuesta.pregunta;
  
      const respuestaElemento = document.createElement('div');
      respuestaElemento.classList.add('respuesta');
      respuestaElemento.textContent = preguntaRespuesta.respuesta;
      respuestaElemento.style.display = 'none';
  
      preguntaElemento.appendChild(respuestaElemento);
      preguntaElemento.addEventListener('click', toggleRespuesta);
      frecuentesElemento.appendChild(preguntaElemento);
    });
  }
  
  renderizarPreguntasRespuestas();