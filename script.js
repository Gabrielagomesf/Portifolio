document.addEventListener("DOMContentLoaded", () => {
    // Efeito de Hover na Sidebar
    const sidebar = document.querySelector(".sidebar");
    sidebar.addEventListener("mouseenter", () => {
        sidebar.classList.add("expanded");
    });
    sidebar.addEventListener("mouseleave", () => {
        sidebar.classList.remove("expanded");
    });

    // Animação de Scroll Suave para os Links Internos
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: "smooth"
                });
            }
        });
    });

    // Efeito de Zoom no Portfólio
    document.querySelectorAll(".portfolio-item").forEach(item => {
        item.addEventListener("mouseenter", () => {
            item.classList.add("zoomed");
        });
        item.addEventListener("mouseleave", () => {
            item.classList.remove("zoomed");
        });
    });

    // Efeito de Animação para os Cards de Serviço
    const serviceCards = document.querySelectorAll(".service-card");
    window.addEventListener("scroll", () => {
        const triggerBottom = window.innerHeight * 0.85;
        serviceCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerBottom) {
                card.classList.add("show");
            }
        });
    });
});
