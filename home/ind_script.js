document.addEventListener('DOMContentLoaded', () => {
    // Consolidated event handlers
    

    // Smooth Scrolling
    const sections = document.querySelectorAll("section");
    const scrollContainer = document.querySelector(".sections");

    let targetScrollPosition = 0;
    let currentScrollPosition = 0;
    let animationFrame;

    const pageMap = {
        'home': 'index.html',
        'works': 'works.html',
        'music': 'music.html',
        'contact': 'contact.html',
        'resume': 'resume.html'
    };

    // Easing function for more natural scrolling
    const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    const smoothScroll = () => {
        const difference = targetScrollPosition - currentScrollPosition;
        const step = difference * 0.1; // Adjust scroll speed

        currentScrollPosition += step;
        
        if (Math.abs(difference) < 0.5) {
            currentScrollPosition = targetScrollPosition;
            cancelAnimationFrame(animationFrame);
        } else {
            animationFrame = requestAnimationFrame(smoothScroll);
        }

        scrollContainer.scrollTo(0, currentScrollPosition);
    };

    // sections.forEach((section, index) => {
    //     section.addEventListener("click", () => {
    //         targetScrollPosition = index * window.innerHeight;
    //         cancelAnimationFrame(animationFrame);
    //         animationFrame = requestAnimationFrame(smoothScroll);
    //     });
    // });
    sections.forEach((section, index) => {
        section.addEventListener("click", () => {
            // Navigate to a new page based on the section index
            switch(index) {
                case 0:
                    window.location.href = "works.html";
                    break;
                case 1:
                    window.location.href = "music.html";
                    break;
                case 2:
                    window.location.href = "contact.html";
                    break;
                case 3:
                    window.location.href = "resume.html";
                    break;
            }
        });
    });
    const menuItems = document.querySelectorAll('.menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            
            // Get the page from the data attribute or href
            const pageKey = item.getAttribute('data-page') || 
                            item.getAttribute('href')?.replace('#', '').replace('.html', '');
            
            // Navigate to the corresponding page
            if (pageKey && pageMap[pageKey]) {
                window.location.href = pageMap[pageKey];
            }
        });
    });
});

    // Optional: Keyboard navigation
document.addEventListener('keydown', (e) => {
    const currentSection = Math.floor(scrollContainer.scrollTop / window.innerHeight);
    
    if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
        scrollContainer.scrollTo({
            top: (currentSection + 1) * window.innerHeight,
            behavior: 'smooth'
        });
    }
    
    if (e.key === 'ArrowUp' && currentSection > 0) {
        scrollContainer.scrollTo({
            top: (currentSection - 1) * window.innerHeight,
            behavior: 'smooth'
        });
    }
});
