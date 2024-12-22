// Add smooth hover effects for contact items
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        item.style.background = `radial-gradient(circle at ${x}px ${y}px, 
                                rgba(255,255,255,0.1), 
                                rgba(255,255,255,0.05))`;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.background = 'rgba(255,255,255,0.05)';
    });
});

// Copy email to clipboard functionality
document.querySelector('.contact-item a[href^="mailto:"]').addEventListener('click', function(e) {
    e.preventDefault();
    navigator.clipboard.writeText(this.textContent)
        .then(() => {
            const originalText = this.textContent;
            this.textContent = 'Email copied!';
            setTimeout(() => {
                this.textContent = originalText;
            }, 2000);
        });
});