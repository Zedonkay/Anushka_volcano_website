// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Script initialized');
  
  // Get button elements by their IDs
  const messageButton = document.getElementById('messageButton');
  const dateButton = document.getElementById('dateButton');
  
  console.log('Message button:', messageButton);
  console.log('Date button:', dateButton);

  function showExplosion(message) {
      console.log('Showing explosion with message:', message);
      
      // Create new explosion elements with improved structure
      const explosionContainer = document.createElement('div');
      explosionContainer.className = 'explosion-container';
      
      const explosionBubble = document.createElement('div');
      explosionBubble.className = 'explosion-bubble';
      
      const explosionCloud = document.createElement('div');
      explosionCloud.className = 'explosion-cloud';
      
      const explosionMessage = document.createElement('div');
      explosionMessage.className = 'explosion-message';
      explosionMessage.textContent = message;
      
      // Build the explosion hierarchy
      explosionBubble.appendChild(explosionCloud);
      explosionBubble.appendChild(explosionMessage);
      explosionContainer.appendChild(explosionBubble);
      
      // Get the volcano container and add the explosion
      const volcanoContainer = document.querySelector('.volcano-container');
      if (volcanoContainer) {
          // Remove any existing explosion containers
          const existingExplosions = volcanoContainer.querySelectorAll('.explosion-container');
          existingExplosions.forEach(explosion => explosion.remove());
          
          // Add the new explosion
          volcanoContainer.appendChild(explosionContainer);
          
          // Trigger animation on next frame for smooth transition
          requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                  explosionContainer.classList.add('active');
              });
          });
          
          // Remove after animation completes
          setTimeout(() => {
              explosionContainer.style.opacity = '0';
              setTimeout(() => {
                  explosionContainer.remove();
              }, 500); // Additional delay for fade out
          }, 1500); // Adjusted to account for the new animation duration
      } else {
          console.error('Volcano container not found!');
      }
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

  // Crater bubble effect with improved timing
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
      
      // Bubble will be removed by its animation end
      bubble.addEventListener('animationend', () => {
          bubble.remove();
      });
  }

  // Start crater bubbles with a more natural interval
  setInterval(createCraterBubbles, 500);
});