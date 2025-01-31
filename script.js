(function() {
  // Ensure DOMContentLoaded works across browsers
  function addDOMLoadedEvent(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  // Cross-browser event binding
  function addEvent(element, eventName, handler) {
    if (element.addEventListener) {
      element.addEventListener(eventName, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + eventName, handler);
    } else {
      element['on' + eventName] = handler;
    }
  }

  // Cross-browser method to remove event listeners
  function removeEvent(element, eventName, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(eventName, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + eventName, handler);
    } else {
      element['on' + eventName] = null;
    }
  }

  addDOMLoadedEvent(function() {
    var floatingButton = document.getElementById('floatingButton');
    var floatingMenu = floatingButton ? floatingButton.querySelector('.floating-menu') : null;

    // Ensure elements exist before adding event listeners
    if (floatingButton && floatingMenu) {
      // Toggle floating menu
      function toggleMenu(event) {
        event.stopPropagation(); // Prevent this click from immediately closing the menu
        if (floatingMenu.classList) {
          floatingMenu.classList.toggle('active');
          floatingButton.classList.toggle('menu-active');
        }
      }

      // Close menu if touched/clicked outside
      function closeMenu(event) {
        if (floatingButton && !floatingButton.contains(event.target)) {
          if (floatingMenu.classList) {
            floatingMenu.classList.remove('active');
            floatingButton.classList.remove('menu-active');
          }
        }
      }

      // Add events with cross-browser compatibility
      addEvent(floatingButton, 'click', toggleMenu);
      addEvent(document, 'click', closeMenu);
      addEvent(document, 'touchstart', closeMenu);

      // Smooth scrolling function
      function smoothScroll(targetId) {
        var targetElement = document.getElementById(targetId);
        if (targetElement) {
          // Fallback for older browsers
          if (targetElement.scrollIntoView) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          } else {
            targetElement.scrollIntoView(true);
          }
        }
      }

      // Add event listeners to floating menu items
      var menuItems = document.querySelectorAll('.floating-menu .menu-item');
      menuItems.forEach(function(menuItem) {
        addEvent(menuItem, 'click', function(e) {
          e.preventDefault();
          var targetId = menuItem.getAttribute('data-target');
          smoothScroll(targetId);
          
          // Close menu
          if (floatingMenu.classList) {
            floatingMenu.classList.remove('active');
            floatingButton.classList.remove('menu-active');
          }
        });
      });

      // Enhanced smooth scrolling for anchor links
      var anchorLinks = document.querySelectorAll('a[href^="#"]');
      anchorLinks.forEach(function(anchor) {
        addEvent(anchor, 'click', function(e) {
          e.preventDefault();
          var targetId = anchor.getAttribute('href').substring(1);
          smoothScroll(targetId);
        });
      });

      // Handle AI chat trigger
      var aiChatTrigger = document.querySelector('.ai-chat-trigger');
      if (aiChatTrigger) {
        addEvent(aiChatTrigger, 'click', function(e) {
          e.preventDefault();
          smoothScroll('ia-chat');
          if (floatingMenu.classList) {
            floatingMenu.classList.remove('active');
            floatingButton.classList.remove('menu-active');
          }
        });
      }
    }

    // AI Chat Functionality with broader compatibility
    var chatMessages = document.getElementById('chatMessages');
    var userInput = document.getElementById('userInput');
    var sendMessageBtn = document.getElementById('sendMessage');

    if (chatMessages && userInput && sendMessageBtn) {
      // Simplified AI response function
      function getAIResponse(userMessage) {
        userMessage = (userMessage || '').toString().trim().toLowerCase();
        
        var responses = {
          'precio': 'Nuestros precios son accesibles: Instalación de SO: $50, Eliminación de Cuentas: $30, Diagnóstico Técnico: $25.',
          'servicio': 'Ofrecemos servicios como: Instalación de Sistemas Operativos, Eliminación de Cuentas, Diagnóstico Técnico Profesional y Recuperación de Datos.',
          'pago': 'Aceptamos Transferencia Bancaria, Pago en Efectivo y Saldo Móvil para tu conveniencia.',
          'quién te creó': 'Me creó Rodolfo Ramirez Jara. Contacto: +5356639178, correo: tecnoadguard@gmail.com, administrador de TecnoAdGuard.',
          'quien te creo': 'Me creó Rodolfo Ramirez Jara. Contacto: +5356639178, correo: tecnoadguard@gmail.com, administrador de TecnoAdGuard.'
        };

        for (var key in responses) {
          if (userMessage.includes(key)) {
            return responses[key];
          }
        }
        
        return 'Lo siento, solo puedo responder sobre precios, servicios, métodos de pago o quién me creó.';
      }

      // Basic typing effect
      function typeWriter(element, text, speed) {
        speed = speed || 30;
        element.innerHTML = '';
        var i = 0;
        
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
        var messageElement = document.createElement('div');
        messageElement.className = 'chat-message ' + sender;
        
        if (sender === 'ai') {
          var responseText = document.createElement('div');
          messageElement.appendChild(responseText);
          chatMessages.appendChild(messageElement);
          typeWriter(responseText, message);
        } else {
          messageElement.textContent = message;
          chatMessages.appendChild(messageElement);
        }

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }

      // Send message function
      function sendMessage() {
        var userMessage = userInput.value.trim();
        if (userMessage) {
          // Add user message
          addMessage(userMessage, 'user');
          userInput.value = '';

          // Get and add AI response
          var aiResponse = getAIResponse(userMessage);
          
          // Add AI response after a short delay
          setTimeout(function() {
            addMessage(aiResponse, 'ai');
          }, 500);
        }
      }

      // Add send message event listeners
      addEvent(sendMessageBtn, 'click', sendMessage);
      
      // Allow sending message with Enter key
      addEvent(userInput, 'keypress', function(e) {
        // Use key or keyCode for broader compatibility
        var key = e.key || e.keyCode;
        if (key === 'Enter' || key === 13) {
          sendMessage();
        }
      });

      // Initial welcome message
      addMessage('Bienvenido a nuestro asistente. Puedo ayudarte con preguntas sobre precios, servicios, métodos de pago o quién me creó.', 'ai');
    }
  });
})();