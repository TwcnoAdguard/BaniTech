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

  // AI Responses
  const aiResponses = {
    precios: "Nuestros precios son accesibles: Instalación de SO: $50, Eliminación de Cuentas: $30, Diagnóstico Técnico: $25.",
    servicios: "Ofrecemos servicios como: Instalación de Sistemas Operativos, Eliminación de Cuentas, Diagnóstico Técnico Profesional y Recuperación de Datos.",
    'metodo-pago': "Aceptamos Transferencia Bancaria, Pago en Efectivo y Saldo Móvil para tu conveniencia.",
    'quien-te-creo': "Me creó Rodolfo Ramirez Jara. Contacto: +5356639178, correo: tecnoadguard@gmail.com, administrador de TecnoAdGuard."
  };

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

  // Handle AI chat trigger
  document.querySelector('.ai-chat-trigger').addEventListener('click', (e) => {
    e.preventDefault();
    smoothScroll('ia-chat');
    floatingMenu.classList.remove('active');
    floatingButton.classList.remove('menu-active');
  });

  // Send message functionality
  sendMessageBtn.addEventListener('click', () => {
    const userMessage = userInput.value.trim().toLowerCase();
    if (userMessage) {
      // Add user message
      addMessage(userMessage, 'user');
      userInput.value = '';

      // Determine AI response
      let aiResponse = "Lo siento, solo puedo responder sobre precios, servicios, métodos de pago o quién me creó.";
      
      if (userMessage.includes('precio')) {
        aiResponse = aiResponses.precios;
      } else if (userMessage.includes('servicio')) {
        aiResponse = aiResponses.servicios;
      } else if (userMessage.includes('pago')) {
        aiResponse = aiResponses['metodo-pago'];
      } else if (userMessage.includes('quién te creó') || userMessage.includes('quien te creo')) {
        aiResponse = aiResponses['quien-te-creo'];
      }

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
});