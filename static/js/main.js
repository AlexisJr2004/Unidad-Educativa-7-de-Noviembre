document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    var goTopBtn = document.getElementById("goTopBtn");
    if (window.scrollY > 100) {
      goTopBtn.classList.remove("translate-y-20");
      goTopBtn.classList.remove("opacity-0");
      goTopBtn.classList.add("translate-y-0");
      goTopBtn.classList.add("opacity-100");
    } else {
      goTopBtn.classList.add("translate-y-20");
      goTopBtn.classList.add("opacity-0");
      goTopBtn.classList.remove("translate-y-0");
      goTopBtn.classList.remove("opacity-100");
    }
  });

  document.getElementById("goTopBtn").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document
    .getElementById("mobile-menu-toggle")
    .querySelector("svg");

  // Toggle visibility
  mobileMenu.classList.toggle("hidden");

  // Check if menu is now visible
  if (!mobileMenu.classList.contains("hidden")) {
    // Menu is open - change to close (X) icon
    menuIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        `;
  } else {
    // Menu is closed - change back to hamburger icon
    menuIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
        `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");

  // Ensure the button exists before adding the event listener
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", toggleMobileMenu);
  }
});

const button = document.getElementById("dropdownDefaultButton");
const dropdown = document.getElementById("dropdown");

button.addEventListener("click", () => {
  dropdown.classList.toggle("show");
});

// Cerrar el dropdown si se hace clic fuera de él
document.addEventListener("click", (event) => {
  if (!button.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.classList.remove("show");
  }
});

// Funciones para controlar el zoom
let currentZoom = 100;

function changeZoom(direction) {
  if (direction === "in") {
    currentZoom += 10;
  } else if (direction === "out") {
    currentZoom -= 10;
  }
  currentZoom = Math.max(50, Math.min(currentZoom, 200)); // Limitar entre 50% y 200%
  document.body.style.zoom = `${currentZoom}%`;
}

function resetZoom() {
  currentZoom = 100;
  document.body.style.zoom = "100%";
}

// Array de fuentes disponibles, incluyendo la fuente por defecto
const fonts = [
  "Quicksand",
  "Arial",
  "Verdana",
  "Georgia",
  "Times New Roman",
  "Courier New",
];
let currentFontIndex = 0;

// Función para cambiar la tipografía
function changeFont() {
  currentFontIndex = (currentFontIndex + 1) % fonts.length;
  const newFont = fonts[currentFontIndex];

  // Aplicar la nueva fuente
  document.body.style.fontFamily = newFont;

  // Actualizar el texto del botón para mostrar la fuente actual
  updateFontDisplay(newFont);

  // Guardar la fuente seleccionada en localStorage
  localStorage.setItem("selectedFont", newFont);
}

// Función para actualizar el texto mostrado
function updateFontDisplay(fontName) {
  const fontDisplay = document.querySelector(".current-font-name");
  if (fontDisplay) {
    fontDisplay.textContent = fontName;
  }
}

// Al cargar la página, aplicar la fuente guardada si existe
document.addEventListener("DOMContentLoaded", function () {
  const savedFont = localStorage.getItem("selectedFont");
  if (savedFont) {
    document.body.style.fontFamily = savedFont;
    currentFontIndex = fonts.indexOf(savedFont);
    if (currentFontIndex === -1) currentFontIndex = 0;

    // Actualizar el texto mostrado con la fuente actual
    updateFontDisplay(savedFont);
  } else {
    // Si no hay fuente guardada, mostrar la fuente por defecto
    updateFontDisplay(fonts[0]);
  }
});

function toggleTextToSpeech() {
  // Si hay una lectura en curso, detenerla
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    return;
  }

  // Obtener todo el texto visible de la página
  const text = document.body.innerText;

  // Crear el objeto de voz
  const utterance = new SpeechSynthesisUtterance(text);

  // Configurar en español
  utterance.lang = "es-ES";

  // Iniciar la lectura
  window.speechSynthesis.speak(utterance);
}

// Variables para el ajuste de tamaño de fuente
let currentFontSize = 100;
const fontSizeStep = 10;
const minFontSize = 80;
const maxFontSize = 200;

// Función para cambiar el tamaño de la fuente
function changeFontSize(action) {
  if (action === "increase" && currentFontSize < maxFontSize) {
    currentFontSize += fontSizeStep;
  } else if (action === "decrease" && currentFontSize > minFontSize) {
    currentFontSize -= fontSizeStep;
  }
  document.body.style.fontSize = `${currentFontSize}%`;
}

// Función para resetear el tamaño de la fuente
function resetFontSize() {
  currentFontSize = 100;
  document.body.style.fontSize = "100%";
}

document.addEventListener("DOMContentLoaded", () => {
  const cookieConsent = document.getElementById("cookies-consent");
  const cookieCard = document.getElementById("cookie-card");
  const closeBtn = document.getElementById("close-btn");
  const acceptAll = document.getElementById("accept-all");
  const rejectAll = document.getElementById("reject-all");
  const manageCookies = document.getElementById("manage-cookies");

  // Función para cerrar el consentimiento de cookies
  function closeCookieConsent() {
    cookieCard.style.animation = "slide-out-bottom 0.5s ease-in forwards";
    setTimeout(() => {
      cookieConsent.style.display = "none";
    }, 500);
  }

  // Animación inicial de entrada
  cookieCard.style.animation = "slide-in-bottom 0.5s ease-out";

  // Listeners para todos los botones
  closeBtn.addEventListener("click", closeCookieConsent);
  acceptAll.addEventListener("click", closeCookieConsent);
  rejectAll.addEventListener("click", closeCookieConsent);
  manageCookies.addEventListener("click", closeCookieConsent);
});

document.addEventListener("DOMContentLoaded", () => {
  const fullscreenToggle = document.getElementById("fullscreen-toggle");
  const fullscreenIcon = document.getElementById("fullscreen-icon");

  // Fullscreen Toggle
  fullscreenToggle.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
        fullscreenIcon.classList.replace("fa-expand", "fa-compress");
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        fullscreenIcon.classList.replace("fa-compress", "fa-expand");
      }
    }
  });
});

// Función para obtener todas las imágenes del sitio con categorías
function getAllImages() {
  return [
      // Patio
      { src: 'static/img/patio_1.jpeg', category: 'escuela' },
      { src: 'static/img/patio_2.jpeg', category: 'escuela' },
      { src: 'static/img/patio_3.jpeg', category: 'escuela' },
      { src: 'static/img/patio_4.jpeg', category: 'escuela' },
      { src: 'static/img/patio_5.jpeg', category: 'escuela' },
      { src: 'static/img/patio_6.jpeg', category: 'escuela' },
      { src: 'static/img/patio_7.jpeg', category: 'escuela' },

      // Especialidades
      { src: 'static/img/especialidad_1.jpeg', category: 'especialidades' },
      { src: 'static/img/especialidad_2.jpeg', category: 'especialidades' },
      { src: 'static/img/especialidad_3.jpeg', category: 'especialidades' },

      // Viajes Escolares
      { src: 'static/img/viaje_1.jpeg', category: 'viajes-escolares' },
      { src: 'static/img/viaje_2.jpeg', category: 'viajes-escolares' },
      { src: 'static/img/viaje_3.jpeg', category: 'viajes-escolares' },
      { src: 'static/img/viaje_4.jpeg', category: 'viajes-escolares' },
      { src: 'static/img/viaje_5.jpeg', category: 'viajes-escolares' },
      { src: 'static/img/viaje_6.jpeg', category: 'viajes-escolares' },
      { src: 'static/img/viaje_7.jpeg', category: 'viajes-escolares' },
      { src: 'static/img/viaje_8.jpeg', category: 'viajes-escolares' },
      { src: 'static/img/viaje_9.jpeg', category: 'viajes-escolares' },

      // Deportes
      { src: 'static/img/evento_1.jpeg', category: 'eventos' },
      { src: 'static/img/evento_2.jpeg', category: 'eventos' },
      { src: 'static/img/evento_3.jpeg', category: 'eventos' },
      { src: 'static/img/evento_4.jpeg', category: 'eventos' },
      { src: 'static/img/evento_5.jpeg', category: 'eventos' },
      { src: 'static/img/evento_6.jpeg', category: 'eventos' },
      { src: 'static/img/evento_7.jpeg', category: 'eventos' },
      { src: 'static/img/evento_8.jpeg', category: 'eventos' },

  ].sort(() => Math.random() - 0.5);
}

// Función para crear un diseño de galería con animación
function createMasonryGallery(images = getAllImages()) {
  const gallery = document.getElementById('gallery-grid');

  // Añadir clases de transición
  gallery.classList.add('transition-all', 'duration-500', 'ease-in-out');

  // Limpiar la galería actual con animación de desvanecimiento
  gallery.style.opacity = '0';
  
  // Usar setTimeout para crear efecto de transición
  setTimeout(() => {
      // Limpiar contenido
      gallery.innerHTML = '';

      // Modificar clases para un diseño más dinámico
      gallery.className = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-all duration-500 ease-in-out';

      images.forEach((image, index) => {
          // Crear contenedor para cada imagen con animación de entrada
          const itemDiv = document.createElement('div');
          itemDiv.className = 'gallery-item relative group overflow-hidden rounded-lg transform transition-all duration-500 ease-in-out opacity-0 scale-95';
          itemDiv.setAttribute('data-category', image.category);

          // Crear imagen
          const img = document.createElement('img');
          img.src = image.src;
          img.alt = `Imagen ${index + 1}`;
          img.className = 'w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-110';

          // Agregar imagen al contenedor
          itemDiv.appendChild(img);

          // Agregar contenedor a la galería
          gallery.appendChild(itemDiv);

          // Pequeño retraso para animación de entrada
          setTimeout(() => {
              itemDiv.classList.remove('opacity-0', 'scale-95');
              itemDiv.classList.add('opacity-100', 'scale-100');
          }, index * 100);
      });

      // Mostrar galería
      gallery.style.opacity = '1';
  }, 300);
}

// Función de filtrado
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const allImages = getAllImages();

  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          const filter = button.getAttribute('data-filter');
          
          // Restablecer estilos de botones
          filterButtons.forEach(btn => {
              btn.classList.remove('text-blue-700', 'bg-blue-700', 'text-white', 'dark:text-white', 'dark:bg-blue-500');
              btn.classList.add('text-gray-900', 'bg-white', 'dark:text-white', 'dark:bg-gray-900');
          });
          
          // Aplicar estilo al botón seleccionado
          button.classList.remove('text-gray-900', 'bg-white', 'dark:text-white', 'dark:bg-gray-900');
          button.classList.add('text-blue-700', 'bg-blue-700', 'text-white', 'dark:text-white', 'dark:bg-blue-500');

          // Filtrar imágenes
          if (filter === 'all') {
              createMasonryGallery(); // Mostrar todas las imágenes
          } else {
              const filteredImages = allImages.filter(image => 
                  image.category === filter
              );
              createMasonryGallery(filteredImages);
          }
      });
  });
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  createMasonryGallery();
  setupFilterButtons();
});

// Añadir estilos adicionales para transiciones suaves
const style = document.createElement('style');
style.textContent = `
  .gallery-item {
      transition: all 0.5s ease-in-out;
  }
`;
document.head.appendChild(style);

// Función para ocultar la pantalla de carga
function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");

  loadingScreen.classList.add("hidden");
  mainContent.classList.remove("hidden");
}

// Esperar a que todos los recursos se carguen
window.addEventListener("load", hideLoadingScreen);

// Opcional: Ocultar después de 3 segundos si algo falla
setTimeout(hideLoadingScreen, 3000);

function previewImage(event) {
  const input = event.target;
  const preview = document.getElementById("imagePreview");

  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.classList.remove("hidden");
    };

    reader.readAsDataURL(input.files[0]);
  }
}

// Modal functionality
const aboutUsLink = document.getElementById("aboutUsLink");
const modal = document.getElementById("aboutUsModal");
const closeModalButtons = [
  document.getElementById("closeModal"),
  document.getElementById("closeModalFooter"),
];

// Open modal
aboutUsLink.addEventListener("click", function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  modal.classList.add("flex");
});

// Close modal functions
closeModalButtons.forEach((button) => {
  button.addEventListener("click", function () {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  });
});

// Close modal when clicking outside
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
});
