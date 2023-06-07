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
  