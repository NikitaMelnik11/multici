document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const contactForm = document.getElementById('contact-form');
    const messageSent = document.getElementById('message-sent');

    // Custom cursor
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { duration: 0.23, x: e.clientX, y: e.clientY });
        gsap.to(cursorFollower, { duration: 0.33, x: e.clientX, y: e.clientY });
    });

    // Hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorFollower.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorFollower.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            gsap.to(window, { duration: 1, scrollTo: { y: targetElement, offsetY: 70 }, ease: "power3.inOut" });
        });
    });

    // Highlight active section in navigation
    function setActiveLink() {
        let index = sections.length;

        while(--index && window.scrollY + 100 < sections[index].offsetTop) {}
        
        navLinks.forEach((link) => link.classList.remove('active'));
        navLinks[index].classList.add('active');
    }

    setActiveLink();
    window.addEventListener('scroll', setActiveLink);

    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        if (nameInput.value && emailInput.value && messageInput.value) {
            messageSent.classList.remove('hidden');
            contactForm.reset();

            // Create confetti effect
            for (let i = 0; i < 50; i++) {
                createConfetti();
            }

            setTimeout(() => {
                messageSent.classList.add('hidden');
            }, 5000);
        }
    });

    // Create confetti particles
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        document.querySelector('.confetti-container').appendChild(confetti);

        const colors = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#FF8C42', '#6A0572'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        gsap.set(confetti, {
            backgroundColor: color,
            x: gsap.utils.random(0, 300),
            y: gsap.utils.random(-100, -200),
            rotation: gsap.utils.random(0, 360)
        });

        gsap.to(confetti, {
            y: '100vh',
            rotation: '+=360',
            duration: gsap.utils.random(2, 4),
            ease: 'power1.out',
            onComplete: () => confetti.remove()
        });
    }

    // Animate floating objects
    gsap.utils.toArray('.float-item').forEach((item) => {
        gsap.to(item, {
            y: gsap.utils.random(-50, 50),
            x: gsap.utils.random(-50, 50),
            rotation: gsap.utils.random(-15, 15),
            duration: gsap.utils.random(3, 5),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });

    // Animate skills progress bars
    gsap.utils.toArray('.skill-progress').forEach((bar) => {
        const progress = bar.getAttribute('data-progress');
        gsap.to(bar, {
            width: `${progress}%`,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: bar,
                start: 'top 80%',
            }
        });
    });

    // Animate sections on scroll
    sections.forEach((section) => {
        gsap.from(section.children, {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
            }
        });
    });

    // Animate character
    const tl = gsap.timeline({ repeat: -1 });
    tl.to('.character', { y: -20, duration: 1, ease: 'power1.inOut' })
      .to('.character', { y: 0, duration: 1, ease: 'power1.inOut' });

    // Parallax effect for floating objects
    gsap.utils.toArray('.float-item').forEach((item) => {
        gsap.to(item, {
            y: () => -100 * parseFloat(item.getAttribute('data-speed')),
            ease: 'none',
            scrollTrigger: {
                trigger: '#home',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    // Text reveal animation
    gsap.utils.toArray('.section-title').forEach((title) => {
        gsap.from(title, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
            }
        });
    });

    // Project items hover effect
    gsap.utils.toArray('.project-item').forEach((item) => {
        const icon = item.querySelector('.project-icon');
        const tl = gsap.timeline({ paused: true });
        
        tl.to(icon, { scale: 1.2, rotate: 10, duration: 0.3 })
          .to(item, { y: -10, boxShadow: '0 15px 30px rgba(0,0,0,0.2)', duration: 0.3 }, 0);

        item.addEventListener('mouseenter', () => tl.play());
        item.addEventListener('mouseleave', () => tl.reverse());
    });
});