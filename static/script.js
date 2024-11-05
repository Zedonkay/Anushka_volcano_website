// Update the showExplosion function
function showExplosion(message) {
    const explosionContainer = document.createElement('div');
    explosionContainer.className = 'explosion-container';
  
    const explosionBubble = document.createElement('div');
    explosionBubble.className = 'explosion-bubble';
  
    const explosionCloud = document.createElement('div');
    explosionCloud.className = 'explosion-cloud';
  
    const explosionMessage = document.createElement('div');
    explosionMessage.className = 'explosion-message';
    explosionMessage.textContent = message;
  
    explosionBubble.appendChild(explosionCloud);
    explosionBubble.appendChild(explosionMessage);
    explosionContainer.appendChild(explosionBubble);
  
    document.querySelector('.volcano-container').appendChild(explosionContainer);
  
    // Add a class to move the explosion above the volcano
    explosionContainer.classList.add('explosion-above-volcano');
  
    setTimeout(() => {
      explosionContainer.remove();
    }, 2000);
  }
  
  // Update the button click handlers
  document.querySelectorAll('.action-button').forEach(button => {
    button.addEventListener('click', async function() {
      console.log('Button clicked:', button.classList.contains('message-button') ? 'Message' : 'Date Idea');
  
      let message = '';
  
      if (button.classList.contains('message-button')) {
        try {
          const response = await fetch('/api/message');
          const data = await response.json();
          message = data.message;
        } catch (error) {
          console.error('Error fetching message:', error);
        }
      } else if (button.classList.contains('date-button')) {
        try {
          const response = await fetch('/api/date-idea');
          const data = await response.json();
          message = data.idea;
        } catch (error) {
          console.error('Error fetching date idea:', error);
        }
      } else if (button.classList.contains('heart-button')) {
        // Handle heart button click
        toggleHeart(button);
      }
  
      // Trigger explosion effect with message
      showExplosion(message);
    });
  });
  
  // Add heart button functionality
  function toggleHeart(heartButton) {
    heartButton.classList.toggle('liked');
    // Add any additional logic for heart button interaction
  }
  
  // Improve volcano explosion positioning
  const volcanoContainer = document.querySelector('.volcano-container');
  const volcano = document.querySelector('.volcano');
  
  // Position the explosion container above the volcano
  volcanoContainer.style.overflow = 'visible';
  volcano.style.overflow = 'visible';
  
  // Improve crater bubble effect
  function createCraterBubbles() {
    const crater = document.querySelector('.crater');
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