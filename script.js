document.addEventListener('DOMContentLoaded', () => {
  const floatingButton = document.getElementById('floatingButton');
  const floatingMenu = floatingButton.querySelector('.floating-menu');

  // Toggle floating menu
  floatingButton.addEventListener('click', () => {
    floatingMenu.classList.toggle('active');
  });

  // Close menu if clicked outside
  document.addEventListener('click', (event) => {
    if (!floatingButton.contains(event.target)) {
      floatingMenu.classList.remove('active');
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
});