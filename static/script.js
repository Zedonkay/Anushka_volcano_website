document.addEventListener('DOMContentLoaded', () => {
    const explosionContainer = document.getElementById('explosionContainer');

    // Function to create explosion effect container and message
    function showExplosion(message) {
        console.log('Explosion triggered with message:', message);
        // Remove the 'hidden' class to make the explosion container visible
        explosionContainer.classList.remove('hidden');

        const explosionBubble = document.createElement('div');
        explosionBubble.className = 'explosion-bubble';

        // Create explosion message
        const explosionMessage = document.createElement('div');
        explosionMessage.className = 'explosion-message';
        explosionMessage.textContent = message;

        // Assemble explosion elements
        explosionBubble.appendChild(explosionMessage);
        explosionContainer.appendChild(explosionBubble);

        // Remove the explosion container after the animation completes
        setTimeout(() => {
            explosionContainer.innerHTML = '';
            explosionContainer.classList.add('hidden');
        }, 2000);
    }

    // Handle button clicks
    document.querySelectorAll('.action-button').forEach(button => {
        button.addEventListener('click', async function() {
            console.log('Button clicked:', button.classList.contains('message-button') ? 'Message' : 'Date Idea');

            let message = '';

            // Set message based on button clicked
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
            }

            // Trigger explosion effect with message
            showExplosion(message);
        });
    });

    // Function to create bubble effect
    function createBubble() {
        // ... (rest of the function remains the same)
    }

    // Create continuous bubble effect in crater
    function createCraterBubbles() {
        // ... (rest of the function remains the same)
    }

    // Start crater bubbles
    setInterval(createCraterBubbles, 500);
});