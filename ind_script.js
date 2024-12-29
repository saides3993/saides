document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll("section");
    const scrollContainer = document.querySelector(".sections");

    // External page navigation
    // const pageMap = {
    //     'works': 'works/projects.html',
    //     'music': 'music/recursion.html',
    //     'contact': 'contact/me.html',
    //     'resume': 'resume/bagel.html'
    // };

    // Menu item clicks
    const menuItems = document.querySelectorAll('.menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Navigate directly to the href
            window.location.href = item.getAttribute('href');
        });
    });

    // Section clicks
    sections.forEach((section, index) => {
        section.addEventListener("click", () => {
            // Navigate based on section index
            switch(index) {
                case 0:
                    window.location.href = "/saides/works/projects.html";
                    break;
                case 1:
                    window.location.href = "/saides/music/recursion.html";
                    break;
                case 2:
                    window.location.href = "/saides/contact/me.html";
                    break;
                case 3:
                    window.location.href = "/saides/resume/bagel.html";
                    break;
            }
        });
    });

    // Keyboard navigation within the current page
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
});