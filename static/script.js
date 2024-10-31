document.addEventListener('DOMContentLoaded', () => {
    const explosionContainer = document.getElementById('explosionContainer');
    const explosionMessage = document.getElementById('explosionMessage');
    const messageButton = document.getElementById('messageButton');
    const dateButton = document.getElementById('dateButton');

    // Function to create bubble effect
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        // Random size between 20 and 40 pixels
        const size = Math.random() * 20 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Random position near the crater
        const left = 45 + Math.random() * 10; // 45-55%
        bubble.style.left = `${left}%`;
        bubble.style.top = '0';
        
        return bubble;
    }

    // Function to show explosion with message
    function showExplosion(message) {
        explosionMessage.textContent = message;
        explosionContainer.classList.remove('hidden');
        
        // Create multiple bubbles
        for (let i = 0; i < 5; i++) {
            const bubble = createBubble();
            explosionContainer.appendChild(bubble);
            
            // Remove bubble after animation
            setTimeout(() => bubble.remove(), 2000);
        }

        // Hide explosion container after animation
        setTimeout(() => {
            explosionContainer.classList.add('hidden');
            // Clear any remaining bubbles
            const bubbles = explosionContainer.querySelectorAll('.bubble');
            bubbles.forEach(bubble => bubble.remove());
        }, 2000);
    }

    // Message button click handler
    messageButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/message');
            const data = await response.json();
            showExplosion(data.message);
        } catch (error) {
            console.error('Error fetching message:', error);
        }
    });

    // Date idea button click handler
    dateButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/date-idea');
            const data = await response.json();
            showExplosion(data.idea);
        } catch (error) {
            console.error('Error fetching date idea:', error);
        }
    });

    // Create continuous bubble effect in crater
    function createCraterBubbles() {
        if (Math.random() < 0.3) { // 30% chance to create a bubble
            const bubble = createBubble();
            explosionContainer.appendChild(bubble);
            setTimeout(() => bubble.remove(), 2000);
        }
    }

    // Start crater bubbles
    setInterval(createCraterBubbles, 500);
});