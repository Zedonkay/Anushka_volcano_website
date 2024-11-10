// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Script initialized');
  
  // Get button elements by their IDs instead of class
  const messageButton = document.getElementById('messageButton');
  const dateButton = document.getElementById('dateButton');
  
  console.log('Message button:', messageButton);
  console.log('Date button:', dateButton);

  function showExplosion(message) {
    console.log('Showing explosion with message:', message);
    
    // Create new explosion elements
    const explosionContainer = document.createElement('div');
    explosionContainer.className = 'explosion-container';
    console.log('Created explosion container:', explosionContainer);
    
    const explosionBubble = document.createElement('div');
    explosionBubble.className = 'explosion-bubble';
    
    const explosionCloud = document.createElement('div');
    explosionCloud.className = 'explosion-cloud';
    
    const explosionMessage = document.createElement('div');
    explosionMessage.className = 'explosion-message';
    explosionMessage.textContent = message;
    console.log('Created message element:', explosionMessage);
    
    // Build the explosion hierarchy
    explosionBubble.appendChild(explosionCloud);
    explosionBubble.appendChild(explosionMessage);
    explosionContainer.appendChild(explosionBubble);
    
    // Get the volcano container and add the explosion
    const volcanoContainer = document.querySelector('.volcano-container');
    if (volcanoContainer) {
        console.log('Found volcano container, adding explosion');
        volcanoContainer.appendChild(explosionContainer);
    } else {
        console.error('Volcano container not found!');
    }
    
    // Add a class to trigger animation
    requestAnimationFrame(() => {
        explosionContainer.classList.add('active');
        console.log('Added active class to explosion');
    });
    
    // Remove after animation
    setTimeout(() => {
        console.log('Removing explosion');
        explosionContainer.remove();
    }, 2000);
  }

  // Add click handler for message button
  messageButton.addEventListener('click', async () => {
      console.log('Message button clicked');
      try {
          const response = await fetch('/api/message');
          const data = await response.json();
          showExplosion(data.message);
      } catch (error) {
          console.error('Error fetching message:', error);
          showExplosion('💝 Error loading message 💝');
      }
  });

  // Add click handler for date button
  dateButton.addEventListener('click', async () => {
      console.log('Date button clicked');
      try {
          const response = await fetch('/api/date-idea');
          const data = await response.json();
          showExplosion(data.idea);
      } catch (error) {
          console.error('Error fetching date idea:', error);
          showExplosion('⭐ Error loading date idea ⭐');
      }
  });

  // Crater bubble effect
  function createCraterBubbles() {
      const crater = document.querySelector('.crater');
      if (!crater) {
          console.error('Crater element not found');
          return;
      }
      
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.style.left = `${Math.random() * crater.offsetWidth}px`;
      bubble.style.top = `${crater.offsetHeight}px`;
      bubble.style.width = `${Math.random() * 30 + 20}px`;
      bubble.style.height = bubble.style.width;
      
      crater.appendChild(bubble);
      
      setTimeout(() => {
          bubble.remove();
      }, 2000);
  }

  // Start crater bubbles
  setInterval(createCraterBubbles, 500);
});