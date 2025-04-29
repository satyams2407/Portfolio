// Initialize AOS
// Add this at the start of your JavaScript
function preloadImages() {
    const images = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg'];
    images.forEach(img => {
        new Image().src = img;
    });
}
preloadImages();


AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or use system preference
if (localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
} else {
    html.classList.remove('dark');
}

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    
    // Save preference to localStorage
    if (html.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Mobile menu functionality
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Back to top button functionality
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.classList.remove('scale-0');
        backToTopButton.classList.add('scale-100');
    } else {
        backToTopButton.classList.remove('scale-100');
        backToTopButton.classList.add('scale-0');
    }
});

// Active nav link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-blue-600', 'dark:text-blue-400');
        link.classList.add('text-gray-600', 'dark:text-gray-300');
        
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.remove('text-gray-600', 'dark:text-gray-300');
            link.classList.add('text-blue-600', 'dark:text-blue-400');
        }
    });
});

// Form submission handling (prevent default behavior for demo)
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        console.log('Form submitted with values:', formValues);
        
        // Show success message
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-check mr-2"></i> Message Sent!';
        submitButton.disabled = true;
        submitButton.classList.add('bg-green-600');
        submitButton.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('bg-green-600');
            submitButton.classList.add('bg-blue-600', 'hover:bg-blue-700');
        }, 3000);
    });
}

// Smooth anchor link scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize skill progress animation
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = width;
        }, 300);
    });
};

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', animateSkillBars);


document.addEventListener('DOMContentLoaded', () => {
    const typingEl = document.getElementById('typing');
    const roles = ['Software Engineer', 'Full-Stack Developer', 'Open Source Contributor', 'Tech Enthusiast'];
    let i = 0, j = 0, currentRole = '', isDeleting = false;

    function type() {
        if (i < roles.length) {
            if (!isDeleting && j <= roles[i].length) {
                currentRole = roles[i].substring(0, j++);
                typingEl.innerHTML = currentRole + '|';
            } else if (isDeleting && j >= 0) {
                currentRole = roles[i].substring(0, j--);
                typingEl.innerHTML = currentRole + '|';
            }

            if (j === roles[i].length + 1) {
                isDeleting = true;
                setTimeout(type, 1000);
            } else if (j < 0) {
                isDeleting = false;
                i = (i + 1) % roles.length;
            }
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }

    type();
});


tsParticles.load("tsparticles", {
    fullScreen: { enable: false },
    particles: {
        number: { value: 60 },
        color: { value: "#60a5fa" },
        links: { enable: true, color: "#60a5fa", distance: 120 },
        move: { enable: true, speed: 1 },
        size: { value: 3 },
    }
});

fetch('https://api.countapi.xyz/hit/karthik-portfolio/visits')
    .then(res => res.json())
    .then(data => {
        document.getElementById('visitor-count').innerText = data.value;
    });


    document.getElementById('download-resume').addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = 'SatyamSingh.pdf'; // Adjust this if your file path is different
        link.download = 'SatyamSingh.pdf'; // This sets the downloaded filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        const toast = document.getElementById('resume-toast');
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);


    });
    

    function toggleCertificate(id) {
        const certDiv = document.getElementById(id);
        if (certDiv.classList.contains('hidden')) {
            certDiv.classList.remove('hidden');
        } else {
            certDiv.classList.add('hidden');
        }
    }
    

    document.addEventListener("DOMContentLoaded", function () {
        const quotes = [
          "Code like poetry, ship like Elon.",
          "First, solve the problem. Then, write the code.",
          "Talk is cheap. Show me the code.",
          "Programs must be written for people to read.",
          "The best error message is the one that never shows up."
        ];
      
        new Typed("#quote-typer", {
            strings: quotes,
            typeSpeed: 45,
            backSpeed: 25,
            fadeOut: true,
            fadeOutDelay: 1000,
            loop: true,
            showCursor: true,
            cursorChar: "🖊️",
            smartBackspace: false
          });
          
      });
      


        document.addEventListener('DOMContentLoaded', function() {
            // Tech stack animation
            const techStack = [
                { name: 'JavaScript', icon: 'fab fa-js', color: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-600 dark:text-yellow-400' },
                { name: 'React', icon: 'fab fa-react', color: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' },
                { name: 'Node.js', icon: 'fab fa-node-js', color: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400' },
                { name: 'Python', icon: 'fab fa-python', color: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-600 dark:text-indigo-400' },
                { name: 'AI/ML', icon: 'fas fa-brain', color: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400' },
                { name: 'Docker', icon: 'fab fa-docker', color: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-500 dark:text-blue-300' },
                { name: 'AWS', icon: 'fab fa-aws', color: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400' },
                { name: 'Git', icon: 'fab fa-git-alt', color: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400' }
            ];
    
            const techStackContainer = document.getElementById('tech-stack');
            techStack.forEach((tech, index) => {
                const techElement = document.createElement('div');
                techElement.className = `tech-item ${tech.color} ${tech.text} px-4 py-2 rounded-full flex items-center space-x-2 cursor-default shadow-sm hover:shadow-md`;
                techElement.innerHTML = `
                    <i class="${tech.icon}"></i>
                    <span>${tech.name}</span>
                `;
                techElement.style.animationDelay = `${index * 0.1}s`;
                techStackContainer.appendChild(techElement);
            });
    
            // Add floating animation to tech items
            const techItems = document.querySelectorAll('.tech-item');
            techItems.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    item.classList.add('animate-bounce');
                });
                item.addEventListener('mouseleave', () => {
                    item.classList.remove('animate-bounce');
                });
            });
        });


        // Add vanilla-tilt.js or this simple alternative:
document.querySelectorAll('[data-tilt]').forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        el.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.profile-slide');
    const dots = document.querySelectorAll('.slide-dot');
    let currentSlide = 0;
    const slideInterval = 2000;
    let slideshowInterval;

    // Initialize first slide and dot
    function initializeSlides() {
        slides.forEach((slide, index) => {
            if (index === 0) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        dots[0].classList.add('active');
    }
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (currentSlide + 1) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function startSlideshow() {
        slideshowInterval = setInterval(nextSlide, slideInterval);
    }
    
    // Click handler for dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            clearInterval(slideshowInterval);
            const slideIndex = parseInt(this.getAttribute('data-index'));
            
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = slideIndex;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            
            startSlideshow();
        });
    });
    
    // Pause on hover
    const container = document.querySelector('.transform-style-preserve-3d');
    container.addEventListener('mouseenter', () => clearInterval(slideshowInterval));
    container.addEventListener('mouseleave', startSlideshow);
    
    // Initialize
    initializeSlides();
    startSlideshow();
    
    // Initialize tilt.js if available
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 5,
            speed: 400,
            perspective: 1000
        });
    }
});




document.addEventListener("DOMContentLoaded", () => {
    gsap.from(".nav-link", {
      y: -30,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      stagger: 0.1,
      delay: 0.2
    });
  });
  
  gsap.to(".reveal-line", {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power4.out",
    stagger: 0.3,
    delay: 0.5
  });
  


  document.querySelectorAll(".magnetic-btn").forEach((btn) => {
    const strength = 30;
  
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
  
      gsap.to(btn, {
        x: x / strength,
        y: y / strength,
        rotation: (x + y) / 60, // subtle wiggle!
        duration: 0.3,
        ease: "power2.out"
      });
    });
  
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)"
      });
    });
  });
  document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.getElementById('typingo');
    const texts = [
      "Software Engineer",
      "Full-Stack Developer",
      "Web Application Developer",
      "UI/UX Enthusiast",
      "Problem Solver",
      "Frontend Specialist",
      "Backend Architect",
      "DevOps Engineer",
      "Cloud Solutions Developer",
      "Mobile App Developer",
      "JavaScript Expert",
      "Python Developer",
      "AI/ML Practitioner",
      "Database Wizard",
      "API Specialist",
      "Technical Lead",
      "Systems Designer",
      "Security Consultant",
      "Blockchain Developer",
      "Tech Innovator",
      "Code Optimizer",
      "Agile Developer",
      "Microservices Expert",
      "Automation Engineer",
      "Tech Mentor",
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50; // Much faster typing (original was 150)
    
    function type() {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 30; // Faster deletion
      } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 50; // Faster typing
      }
      
      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 500; // Shorter pause at end
      } 
      else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 300; // Shorter pause between texts
      }
      
      setTimeout(type, typingSpeed);
    }
    
    // Start the effect
    type();
  });



  