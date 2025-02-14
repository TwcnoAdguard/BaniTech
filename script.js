document.addEventListener('DOMContentLoaded', () => {
  const floatingButton = document.getElementById('floatingButton');
  const floatingMenu = floatingButton.querySelector('.floating-menu');

  // Toggle floating menu
  floatingButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent this click from immediately closing the menu
    floatingMenu.classList.toggle('active');
    floatingButton.classList.toggle('menu-active');
  });

  // Close menu if touched/clicked outside
  document.addEventListener('click', (event) => {
    if (!floatingButton.contains(event.target)) {
      floatingMenu.classList.remove('active');
      floatingButton.classList.remove('menu-active');
    }
  });

  // Touch event for mobile devices
  document.addEventListener('touchstart', (event) => {
    if (!floatingButton.contains(event.target)) {
      floatingMenu.classList.remove('active');
      floatingButton.classList.remove('menu-active');
    }
  });

  // Enhanced smooth scrolling for menu items and anchor links
  const smoothScroll = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Add event listeners to floating menu items
  document.querySelectorAll('.floating-menu .menu-item').forEach(menuItem => {
    menuItem.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = menuItem.getAttribute('data-target');
      smoothScroll(targetId);
      floatingMenu.classList.remove('active');
      floatingButton.classList.remove('menu-active');
    });
  });

  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      smoothScroll(targetId);
    });
  });

  // AI Chat Functionality
  const chatMessages = document.getElementById('chatMessages');
  const userInput = document.getElementById('userInput');
  const sendMessageBtn = document.getElementById('sendMessage');

  const AI_CONFIG = {
    welcomeMessage: 'Bienvenido, ¿en qué puedo ayudarte?',
    responses: {
      'precio': 'Nuestros precios son accesibles: Instalación de sistema Windows + Programas : $1000cup, Eliminación de Cuentas Google: entre $600 a 1000cup Depende el Diapositivo y Dificiltad, Eliminación contraseñas en celular Perdera Todo $300cup si tiene cuenta De Google 1000cup , Recuperacion de contraseña en windows sin perder nada $400cup , Copia de audiovisuales a a $2,5 cup por capitulo Si es algo x encargo se cobra a $7cup el GB Películas Encargadas o Guardas a 5cup x película Realitis shows a $3cup x capitulo. ',
      'servicio': 'Ofrecemos servicios como: Instalación de Sistemas Operativos, Eliminación de Cuentas Google , Instalación  antivirus y Recuperación de contraseñas tiene cuenta Google 1000cup , Recuperacion de contraseña en windows sin perder nada $400cup. ',
      'pago': 'Aceptamos Transferencia Bancaria, Pago en Efectivo y Saldo Móvil para tu conveniencia.',
      'quién te creó': 'Me creó Rodolfo Ramirez Jara. Contacto: +5356639178, correo: tecnoadguard@gmail.com, administrador de TecnoAdGuard.',
      'quien te creo': 'Me creó Rodolfo Ramirez Jara. Contacto: +5356639178, correo: tecnoadguard@gmail.com, administrador de TecnoAdGuard.',
    },
    defaultResponse: 'Lo siento, solo puedo responder sobre precios, servicios, métodos de pago o quién me creó.',
  };

  // Add initial welcome message
  function initChat() {
    addMessage(AI_CONFIG.welcomeMessage, 'ai');
  }

  // Typing effect function
  function typeWriter(element, text, speed = 30) {
    element.innerHTML = '';
    let i = 0;
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // Add message to chat
  function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);
    
    if (sender === 'ai') {
      const responseText = document.createElement('div');
      chatMessages.appendChild(messageElement);
      messageElement.appendChild(responseText);
      typeWriter(responseText, message);
    } else {
      messageElement.textContent = message;
      chatMessages.appendChild(messageElement);
    }

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Determine AI response
  function getAIResponse(userMessage) {
    userMessage = userMessage.trim().toLowerCase();
    
    for (let [key, response] of Object.entries(AI_CONFIG.responses)) {
      if (userMessage.includes(key)) {
        return response;
      }
    }
    
    return AI_CONFIG.defaultResponse;
  }

  // Send message functionality
  sendMessageBtn.addEventListener('click', () => {
    const userMessage = userInput.value.trim();
    if (userMessage) {
      // Add user message
      addMessage(userMessage, 'user');
      userInput.value = '';

      // Get and add AI response
      const aiResponse = getAIResponse(userMessage);
      
      // Add AI response after a short delay
      setTimeout(() => {
        addMessage(aiResponse, 'ai');
      }, 500);
    }
  });

  // Allow sending message with Enter key
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessageBtn.click();
    }
  });

  // Initialize chat with welcome message
  initChat();

  // Handle AI chat trigger
  document.querySelector('.ai-chat-trigger').addEventListener('click', (e) => {
    e.preventDefault();
    smoothScroll('ia-chat');
    floatingMenu.classList.remove('active');
    floatingButton.classList.remove('menu-active');
  });
});
