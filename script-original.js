const professions = ['Bishnu','Nirmalya','Full Stack Developer', 'UI/UX Designer', ];
let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function type() {
    const currentProfession = professions[professionIndex];
    const typingElement = document.getElementById('typing-text');

    if (isDeleting) {
        typingElement.textContent = currentProfession.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentProfession.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeedVar = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentProfession.length) {
        typeSpeedVar = pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
        typeSpeedVar = 500;
    }

    setTimeout(type, typeSpeedVar);
}


// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1000);
});

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Animation for hamburger icon
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or respect OS preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Apply theme on page load
function applyTheme(isLight) {
    if (isLight) {
        document.body.classList.add('light-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        document.body.classList.remove('light-theme');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Set initial theme with a small delay to ensure DOM is ready
setTimeout(() => {
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        applyTheme(true);
    } else {
        applyTheme(false);
    }
}, 10);

themeToggle.addEventListener('click', () => {
    const isLight = !document.body.classList.contains('light-theme');
    applyTheme(isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    // Dispatch a custom event for other components to listen to
    document.dispatchEvent(new CustomEvent('themeChanged', {
        detail: { isLight }
    }));
});

// Initialize Particles.js
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#2196F3' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#2196F3',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            }
        },
        retina_detect: true
    });
    
    // Update particles color based on theme
    function updateParticlesColor() {
        const isLightTheme = document.body.classList.contains('light-theme');
        const particleColor = isLightTheme ? '#1976d2' : '#2196F3';
        
        // Update particles color if the library supports it
        if (window.pJSDom && window.pJSDom.length > 0) {
            // This would require reinitializing particles with new color
            // For simplicity, we'll just note that the color should change
        }
    }
    
    // Listen for theme changes
    const themeObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                updateParticlesColor();
            }
        });
    });
    
    themeObserver.observe(document.body, {
        attributes: true
    });
}

// Scroll to Top Button
const scrollToTopButton = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.classList.add('show');
    } else {
        scrollToTopButton.classList.remove('show');
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scroll Progress Bar
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// Parallax effect for hero image
window.addEventListener('mousemove', (e) => {
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        profileImg.style.transform = `translate(${xAxis}px, ${yAxis}px) scale(1.05)`;
    }
});

// Animate hero buttons with staggered delay
const heroButtons = document.querySelectorAll('.hero-buttons .btn');
heroButtons.forEach((button, index) => {
    setTimeout(() => {
        button.parentElement.style.opacity = '1';
        button.parentElement.style.transform = 'translateY(0)';
    }, 1500 + (index * 200));
});

// Listen for theme changes to update other components
document.addEventListener('themeChanged', function(e) {
    // Update any components that need to respond to theme changes
    const isLight = e.detail.isLight;
    // This is where you could add specific updates for other components
});

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(type, 1000);
});


const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation functions
function validateName(name) {
    if (!name.trim()) return 'Name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    return '';
}

function validateEmail(email) {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email';
    return '';
}

function validateSubject(subject) {
    if (!subject.trim()) return 'Subject is required';
    if (subject.trim().length < 5) return 'Subject must be at least 5 characters';
    return '';
}

function validateMessage(message) {
    if (!message.trim()) return 'Message is required';
    if (message.trim().length < 10) return 'Message must be at least 10 characters';
    return '';
}

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // Add real-time validation
    document.getElementById('name').addEventListener('blur', function() {
        const error = validateName(this.value);
        const errorElement = document.getElementById('name-error');
        if (error) {
            this.classList.add('error');
            errorElement.textContent = error;
        } else {
            this.classList.remove('error');
            errorElement.textContent = '';
        }
    });
    
    document.getElementById('email').addEventListener('blur', function() {
        const error = validateEmail(this.value);
        const errorElement = document.getElementById('email-error');
        if (error) {
            this.classList.add('error');
            errorElement.textContent = error;
        } else {
            this.classList.remove('error');
            errorElement.textContent = '';
        }
    });
    
    document.getElementById('subject').addEventListener('blur', function() {
        const error = validateSubject(this.value);
        const errorElement = document.getElementById('subject-error');
        if (error) {
            this.classList.add('error');
            errorElement.textContent = error;
        } else {
            this.classList.remove('error');
            errorElement.textContent = '';
        }
    });
    
    document.getElementById('message').addEventListener('blur', function() {
        const error = validateMessage(this.value);
        const errorElement = document.getElementById('message-error');
        if (error) {
            this.classList.add('error');
            errorElement.textContent = error;
        } else {
            this.classList.remove('error');
            errorElement.textContent = '';
        }
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate all fields
        const nameError = validateName(name);
        const emailError = validateEmail(email);
        const subjectError = validateSubject(subject);
        const messageError = validateMessage(message);
        
        // Display errors
        document.getElementById('name-error').textContent = nameError;
        document.getElementById('email-error').textContent = emailError;
        document.getElementById('subject-error').textContent = subjectError;
        document.getElementById('message-error').textContent = messageError;
        
        // Add error classes
        document.getElementById('name').classList.toggle('error', !!nameError);
        document.getElementById('email').classList.toggle('error', !!emailError);
        document.getElementById('subject').classList.toggle('error', !!subjectError);
        document.getElementById('message').classList.toggle('error', !!messageError);
        
        // Check if form is valid
        if (!nameError && !emailError && !subjectError && !messageError) {
            // Disable submit button during submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Show success message
            const formMessage = document.getElementById('form-message');
            formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            formMessage.className = 'form-message success';
            
            // Reset form
            contactForm.reset();
            
            // Re-enable submit button after a delay
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 3000);
        }
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Initialize Three.js 3D scene
function initThreeJS() {
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('threejs-container').appendChild(renderer.domElement);
    
    // Add advanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x2196F3, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0x1976d2, 1, 100);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);
    
    // Create particle system
    const particleCount = 2000;
    const particles = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        // Position
        posArray[i] = (Math.random() - 0.5) * 20;
        posArray[i + 1] = (Math.random() - 0.5) * 20;
        posArray[i + 2] = (Math.random() - 0.5) * 20;
        
        // Color
        colorArray[i] = Math.random();
        colorArray[i + 1] = Math.random();
        colorArray[i + 2] = Math.random();
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    
    // Create geometric shapes
    const geometries = [];
    
    // Create a torus knot
    const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 32);
    const torusKnotMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x2196F3,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
        emissive: 0x0000ff,
        emissiveIntensity: 0.2
    });
    const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
    torusKnot.position.x = -2;
    scene.add(torusKnot);
    geometries.push(torusKnot);
    
    // Create an icosahedron
    const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0);
    const icosahedronMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x1976d2,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
        emissive: 0x0000aa,
        emissiveIntensity: 0.2
    });
    const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    icosahedron.position.x = 2;
    scene.add(icosahedron);
    geometries.push(icosahedron);
    
    // Mouse interaction variables
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate geometries
        torusKnot.rotation.x += 0.01;
        torusKnot.rotation.y += 0.01;
        
        icosahedron.rotation.x += 0.01;
        icosahedron.rotation.y += 0.01;
        
        // Rotate particle system
        particleSystem.rotation.x += 0.001;
        particleSystem.rotation.y += 0.001;
        
        // Mouse interaction
        torusKnot.position.x = -2 + mouseX * 0.5;
        torusKnot.position.y = mouseY * 0.5;
        
        icosahedron.position.x = 2 + mouseX * 0.5;
        icosahedron.position.y = mouseY * 0.5;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Initialize GSAP animations
gsap.registerPlugin(ScrollTrigger);

// Advanced scroll animations
function initScrollAnimations() {
    // Animate section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // Animate service items
    gsap.utils.toArray('.service-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
    
    // Animate portfolio items
    gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
    
    // Animate stat items
    gsap.utils.toArray('.stat-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.8,
            opacity: 0,
            duration: 1,
            delay: i * 0.2,
            ease: 'back.out(1.7)'
        });
    });
    
    // Animate skill progress bars
    gsap.utils.toArray('.progress-fill').forEach(bar => {
        const width = bar.getAttribute('data-width');
        gsap.from(bar, {
            scrollTrigger: {
                trigger: bar,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            width: 0,
            duration: 2,
            ease: 'power2.out'
        });
    });
}

// Initialize Three.js when the page loads
window.addEventListener('load', initThreeJS);

// Initialize 3D Model Viewer
function initModelViewer() {
    const modal = document.getElementById('modelViewerModal');
    const closeBtn = document.querySelector('.close');
    
    // Close modal when clicking on X
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        destroyModelViewer();
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            destroyModelViewer();
        }
    });
}

// Create 3D model viewer
function createModelViewer(modelType) {
    const modal = document.getElementById('modelViewerModal');
    const modelTitle = document.getElementById('modelTitle');
    const modelDescription = document.getElementById('modelDescription');
    const modelContainer = document.getElementById('modelContainer');
    
    // Clear container
    modelContainer.innerHTML = '';
    
    // Set title and description based on model type
    switch(modelType) {
        case 'web':
            modelTitle.textContent = 'Web Application Architecture';
            modelDescription.textContent = 'Interactive 3D visualization of a modern web application architecture with frontend, backend, and database components.';
            break;
        case 'mobile':
            modelTitle.textContent = 'Mobile App Framework';
            modelDescription.textContent = '3D representation of a cross-platform mobile application structure with UI components and native modules.';
            break;
        case 'design':
            modelTitle.textContent = 'UI/UX Design System';
            modelDescription.textContent = '3D visualization of a comprehensive design system with components, typography, and color palette.';
            break;
        default:
            modelTitle.textContent = '3D Model Viewer';
            modelDescription.textContent = 'Interactive 3D model viewer';
    }
    
    // Show modal
    modal.style.display = 'block';
    
    // Create Three.js scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    
    const camera = new THREE.PerspectiveCamera(75, modelContainer.clientWidth / modelContainer.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(modelContainer.clientWidth, modelContainer.clientHeight);
    modelContainer.appendChild(renderer.domElement);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x2196F3, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create model based on type
    let model;
    switch(modelType) {
        case 'web':
            // Create web app architecture
            model = createWebAppModel(scene);
            break;
        case 'mobile':
            // Create mobile app framework
            model = createMobileAppModel(scene);
            break;
        case 'design':
            // Create design system
            model = createDesignSystemModel(scene);
            break;
        default:
            // Create a simple cube
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshPhongMaterial({ 
                color: 0x2196F3,
                wireframe: true
            });
            model = new THREE.Mesh(geometry, material);
            scene.add(model);
    }
    
    // Add orbit controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Handle window resize
    function onWindowResize() {
        camera.aspect = modelContainer.clientWidth / modelContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(modelContainer.clientWidth, modelContainer.clientHeight);
    }
    
    window.addEventListener('resize', onWindowResize);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        if (model) {
            model.rotation.x += 0.01;
            model.rotation.y += 0.01;
        }
        
        controls.update();
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Store references for cleanup
    modal.userData = { scene, camera, renderer, controls };
}

// Create web application model
function createWebAppModel(scene) {
    const group = new THREE.Group();
    
    // Frontend component
    const frontendGeometry = new THREE.BoxGeometry(1, 1, 1);
    const frontendMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x2196F3,
        wireframe: true
    });
    const frontend = new THREE.Mesh(frontendGeometry, frontendMaterial);
    frontend.position.x = -2;
    group.add(frontend);
    
    // Backend component
    const backendGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    const backendMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x1976d2,
        wireframe: true
    });
    const backend = new THREE.Mesh(backendGeometry, backendMaterial);
    group.add(backend);
    
    // Database component
    const databaseGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const databaseMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x0d47a1,
        wireframe: true
    });
    const database = new THREE.Mesh(databaseGeometry, databaseMaterial);
    database.position.x = 2;
    group.add(database);
    
    // Connection lines
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x2196F3 });
    
    const points1 = [];
    points1.push(new THREE.Vector3(-1.5, 0, 0));
    points1.push(new THREE.Vector3(-0.5, 0, 0));
    
    const lineGeometry1 = new THREE.BufferGeometry().setFromPoints(points1);
    const line1 = new THREE.Line(lineGeometry1, lineMaterial);
    group.add(line1);
    
    const points2 = [];
    points2.push(new THREE.Vector3(0.5, 0, 0));
    points2.push(new THREE.Vector3(1.5, 0, 0));
    
    const lineGeometry2 = new THREE.BufferGeometry().setFromPoints(points2);
    const line2 = new THREE.Line(lineGeometry2, lineMaterial);
    group.add(line2);
    
    scene.add(group);
    return group;
}

// Create mobile app model
function createMobileAppModel(scene) {
    const group = new THREE.Group();
    
    // Phone frame
    const phoneGeometry = new THREE.BoxGeometry(1.5, 3, 0.2);
    const phoneMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x2196F3,
        wireframe: true
    });
    const phone = new THREE.Mesh(phoneGeometry, phoneMaterial);
    group.add(phone);
    
    // Screen
    const screenGeometry = new THREE.BoxGeometry(1.3, 2.7, 0.1);
    const screenMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x1976d2,
        wireframe: false,
        transparent: true,
        opacity: 0.7
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.15;
    group.add(screen);
    
    // UI components
    const uiGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.1);
    const uiMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x0d47a1,
        wireframe: true
    });
    
    const ui1 = new THREE.Mesh(uiGeometry, uiMaterial);
    ui1.position.set(-0.4, 0.8, 0.25);
    group.add(ui1);
    
    const ui2 = new THREE.Mesh(uiGeometry, uiMaterial);
    ui2.position.set(0.4, 0.8, 0.25);
    group.add(ui2);
    
    const ui3 = new THREE.Mesh(uiGeometry, uiMaterial);
    ui3.position.set(0, -0.8, 0.25);
    group.add(ui3);
    
    scene.add(group);
    return group;
}

// Create design system model
function createDesignSystemModel(scene) {
    const group = new THREE.Group();
    
    // Color palette
    const colors = [
        new THREE.Color(0x2196F3),
        new THREE.Color(0x1976d2),
        new THREE.Color(0x0d47a1),
        new THREE.Color(0x64b5f6)
    ];
    
    for (let i = 0; i < colors.length; i++) {
        const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const sphereMaterial = new THREE.MeshPhongMaterial({ 
            color: colors[i],
            wireframe: true
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.x = (i - 1.5) * 1.2;
        sphere.position.y = 1;
        group.add(sphere);
    }
    
    // Typography samples
    const boxes = [];
    for (let i = 0; i < 3; i++) {
        const boxGeometry = new THREE.BoxGeometry(0.5, 0.5 - i*0.1, 0.5);
        const boxMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x2196F3,
            wireframe: true
        });
        const box = new THREE.Mesh(boxGeometry, boxMaterial);
        box.position.x = (i - 1) * 1.2;
        box.position.y = -1;
        group.add(box);
        boxes.push(box);
    }
    
    scene.add(group);
    return group;
}

// Destroy model viewer to free resources
function destroyModelViewer() {
    const modal = document.getElementById('modelViewerModal');
    const modelContainer = document.getElementById('modelContainer');
    
    if (modal.userData) {
        const { scene, camera, renderer, controls } = modal.userData;
        
        // Dispose of resources
        if (renderer) {
            renderer.dispose();
        }
        
        if (controls) {
            controls.dispose();
        }
        
        // Remove event listeners
        window.removeEventListener('resize', () => {});
        
        // Clear container
        modelContainer.innerHTML = '';
        
        // Clear userData
        modal.userData = null;
    }
}

// Handle model button clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('model-btn')) {
        const modelType = e.target.getAttribute('data-model');
        createModelViewer(modelType);
    }
});

// AI Chatbot functionality
function initChatbot() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatbotMessages = document.getElementById('chatbot-messages');
    
    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.style.display = chatbotWindow.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Close chatbot
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.style.display = 'none';
    });
    
    // Send message function
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            userInput.value = '';
            
            // Simulate AI response after a delay
            setTimeout(() => {
                const response = generateAIResponse(message);
                addMessage(response, 'bot');
            }, 1000);
        }
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Generate AI response (simulated)
    function generateAIResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello there! I'm Bishnu's AI assistant. How can I help you today?";
        } else if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
            return "Bishnu has worked on many exciting projects including web applications, mobile apps, and UI/UX designs. You can view his portfolio in the Projects section.";
        } else if (lowerMessage.includes('skill') || lowerMessage.includes('expertise')) {
            return "Bishnu is skilled in Full Stack Development, UI/UX Design, Cloud Solutions, and more. Check out his Skills section for detailed information.";
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('hire')) {
            return "You can contact Bishnu through the contact form on this website or via email at bishnusarkar4321@gmail.com.";
        } else if (lowerMessage.includes('thank')) {
            return "You're welcome! Is there anything else I can help you with?";
        } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
            return "Goodbye! Feel free to chat again if you have more questions.";
        } else {
            const responses = [
                "That's interesting! Bishnu would love to hear more about that.",
                "I'm here to help! You can also check out Bishnu's portfolio for more information.",
                "Thanks for sharing! Is there something specific you'd like to know about Bishnu's work?",
                "I understand. Bishnu is always looking for new challenges and opportunities.",
                "Great question! You might find more details in Bishnu's resume section."
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }
    
    // Send message on button click
    sendButton.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Initialize data visualization dashboard
function initDashboard() {
    // Technology Distribution Chart
    const techCtx = document.getElementById('techChart').getContext('2d');
    const techChart = new Chart(techCtx, {
        type: 'doughnut',
        data: {
            labels: ['Frontend', 'Backend', 'Database', 'Cloud', 'Mobile'],
            datasets: [{
                data: [35, 25, 15, 15, 10],
                backgroundColor: [
                    '#2196F3',
                    '#1976d2',
                    '#0d47a1',
                    '#64b5f6',
                    '#bbdefb'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: document.body.classList.contains('light-theme') ? '#333' : '#e0e0e0',
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
    
    // Experience Timeline Chart
    const experienceCtx = document.getElementById('experienceChart').getContext('2d');
    const experienceChart = new Chart(experienceCtx, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'Projects Completed',
                data: [2, 4, 6, 8, 10, 12],
                borderColor: '#2196F3',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Skills Acquired',
                data: [5, 8, 12, 15, 18, 20],
                borderColor: '#1976d2',
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: document.body.classList.contains('light-theme') ? '#333' : '#e0e0e0',
                        font: {
                            size: 12
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: document.body.classList.contains('light-theme') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: document.body.classList.contains('light-theme') ? '#333' : '#e0e0e0'
                    }
                },
                x: {
                    grid: {
                        color: document.body.classList.contains('light-theme') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: document.body.classList.contains('light-theme') ? '#333' : '#e0e0e0'
                    }
                }
            }
        }
    });
    
    // Project Categories Chart
    const projectCtx = document.getElementById('projectChart').getContext('2d');
    const projectChart = new Chart(projectCtx, {
        type: 'bar',
        data: {
            labels: ['Web Apps', 'Mobile Apps', 'UI/UX', 'E-commerce', 'Dashboards'],
            datasets: [{
                label: 'Projects',
                data: [5, 3, 4, 2, 3],
                backgroundColor: [
                    'rgba(33, 150, 243, 0.7)',
                    'rgba(25, 118, 210, 0.7)',
                    'rgba(13, 71, 161, 0.7)',
                    'rgba(100, 181, 246, 0.7)',
                    'rgba(187, 222, 251, 0.7)'
                ],
                borderColor: [
                    '#2196F3',
                    '#1976d2',
                    '#0d47a1',
                    '#64b5f6',
                    '#bbdefb'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: document.body.classList.contains('light-theme') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: document.body.classList.contains('light-theme') ? '#333' : '#e0e0e0'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: document.body.classList.contains('light-theme') ? '#333' : '#e0e0e0'
                    }
                }
            }
        }
    });
    
    // Performance Metrics Chart
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    const performanceChart = new Chart(performanceCtx, {
        type: 'radar',
        data: {
            labels: ['Speed', 'Quality', 'Innovation', 'Communication', 'Problem Solving'],
            datasets: [{
                label: 'Performance',
                data: [90, 95, 85, 92, 88],
                backgroundColor: 'rgba(33, 150, 243, 0.2)',
                borderColor: '#2196F3',
                pointBackgroundColor: '#2196F3',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#2196F3'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: document.body.classList.contains('light-theme') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'
                    },
                    grid: {
                        color: document.body.classList.contains('light-theme') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'
                    },
                    pointLabels: {
                        color: document.body.classList.contains('light-theme') ? '#333' : '#e0e0e0'
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: document.body.classList.contains('light-theme') ? '#333' : '#e0e0e0',
                        stepSize: 20
                    }
                }
            }
        }
    });
    
    // Update chart colors when theme changes
    document.addEventListener('themeChanged', function() {
        const isLightTheme = document.body.classList.contains('light-theme');
        
        // Update chart text colors
        [techChart, experienceChart, projectChart, performanceChart].forEach(chart => {
            if (chart.options.plugins.legend.labels) {
                chart.options.plugins.legend.labels.color = isLightTheme ? '#333' : '#e0e0e0';
            }
            
            if (chart.options.scales) {
                Object.keys(chart.options.scales).forEach(axis => {
                    if (chart.options.scales[axis].ticks) {
                        chart.options.scales[axis].ticks.color = isLightTheme ? '#333' : '#e0e0e0';
                    }
                    if (chart.options.scales[axis].grid) {
                        chart.options.scales[axis].grid.color = isLightTheme ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)';
                    }
                });
            }
            
            chart.update();
        });
    });
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initChatbot();
    initDashboard();
});

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initModelViewer();
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.section:not(.hero)').forEach(section => {
    observer.observe(section);
});

// Add glow effect to section titles when they come into view
const sectionTitles = document.querySelectorAll('.section-title');
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('glow');
        }
    });
}, {
    threshold: 0.5
});

sectionTitles.forEach(title => {
    titleObserver.observe(title);
});

// Portfolio item tilt effect
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = (x - centerX) / 10;
        const rotateX = (centerY - y) / 10;
        
        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
    });
});

// Animate service items
const serviceGrid = document.querySelector('.services-grid');
if (serviceGrid) {
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.service-item').forEach((item, index) => {
                    item.style.setProperty('--delay', index);
                    item.classList.add('animate');
                });
            }
        });
    }, observerOptions);
    serviceObserver.observe(serviceGrid);
}

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItemsFilter = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        portfolioItemsFilter.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

const portfolioGrid = document.querySelector('.portfolio-grid');
if (portfolioGrid) {
    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.portfolio-item').forEach((item, index) => {
                    item.style.setProperty('--delay', index);
                    item.classList.add('animate');
                });
            }
        });
    }, observerOptions);
    portfolioObserver.observe(portfolioGrid);
}

// Blog functionality removed

// Animate skill tags
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.setProperty('--delay', index);
    // Add staggered animation on page load
    setTimeout(() => {
        tag.style.opacity = '1';
        tag.style.transform = 'translateY(0)';
    }, 300 + (index * 50));
    
    // Add a subtle animation on hover
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(-2px)';
        this.style.boxShadow = '0 5px 15px rgba(33, 150, 243, 0.4)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Animate progress bars when they come into view
const progressBars = document.querySelectorAll('.progress-fill');
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.getAttribute('data-width');
            progressBar.style.width = width;
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
});

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// Statistics Counter Animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = +stat.getAttribute('data-target');
                const increment = target / 100;
                let current = 0;
                
                const updateCount = () => {
                    if (current < target) {
                        current += increment;
                        stat.innerText = Math.ceil(current);
                        setTimeout(updateCount, 20);
                    } else {
                        stat.innerText = target;
                    }
                };
                
                updateCount();
            });
            
            // Stop observing after animation
            statObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

const statsSection = document.getElementById('statistics');
if (statsSection) {
    statObserver.observe(statsSection);
}

// Testimonial Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function showSlide(index) {
    // Hide all slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev', 'next');
        if (i < index) slide.classList.add('prev');
        else if (i > index) slide.classList.add('next');
    });
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentSlide = index;
}

function nextSlide() {
    let newIndex = currentSlide + 1;
    if (newIndex >= slides.length) newIndex = 0;
    showSlide(newIndex);
}

function prevSlide() {
    let newIndex = currentSlide - 1;
    if (newIndex < 0) newIndex = slides.length - 1;
    showSlide(newIndex);
}

// Auto slide change every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

// Event listeners
if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(index);
        slideInterval = setInterval(nextSlide, 5000);
    });
});

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Use GSAP for smooth scrolling
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: targetElement.offsetTop - 80,
                    autoKill: false
                },
                ease: 'power2.inOut'
            });
        }
    });
});

// ==================== SUPER ADVANCED FEATURES ====================

// 1. AUGMENTED REALITY BUSINESS CARD
function initARBusinessCard() {
    // This function has been removed as requested
    console.log("AR Business Card feature removed");
}

// 2. VOICE RECOGNITION NAVIGATION
function initVoiceNavigation() {
    // This function has been removed as requested
    console.log("Voice Navigation feature removed");
}

// 3. MACHINE LEARNING PROJECT RECOMMENDER
function initProjectRecommender() {
    // Create recommender section
    const portfolioSection = document.getElementById('portfolio');
    if (!portfolioSection) return;

    const recommenderDiv = document.createElement('div');
    recommenderDiv.id = 'project-recommender';
    recommenderDiv.innerHTML = `
        <div class="container">
            <h2 class="section-title">Recommended Projects</h2>
            <div class="recommender-content">
                <p>Based on your interests, here are some projects you might like:</p>
                <div id="recommended-projects" class="portfolio-grid">
                    <!-- Recommended projects will be populated here -->
                </div>
                <button id="get-recommendations" class="btn">Get Personalized Recommendations</button>
            </div>
        </div>
    `;
    
    // Insert after portfolio section
    portfolioSection.parentNode.insertBefore(recommenderDiv, portfolioSection.nextSibling);

    // Add event listener for recommendation button
    document.getElementById('get-recommendations').addEventListener('click', getRecommendations);
}

// Simple recommendation algorithm
function getRecommendations() {
    // In a real implementation, this would use TensorFlow.js to analyze user behavior
    // For now, we'll just simulate recommendations
    
    const projects = document.querySelectorAll('.portfolio-item');
    const recommendedContainer = document.getElementById('recommended-projects');
    
    // Clear previous recommendations
    recommendedContainer.innerHTML = '';
    
    // Simple algorithm: recommend projects with different categories
    const projectTypes = ['web', 'mobile', 'design', 'cloud'];
    const usedIndices = [];
    
    for (let i = 0; i < Math.min(3, projects.length); i++) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * projects.length);
        } while (usedIndices.includes(randomIndex));
        
        usedIndices.push(randomIndex);
        
        // Clone the project item
        const recommendedProject = projects[randomIndex].cloneNode(true);
        recommendedProject.classList.add('recommended-project');
        recommendedContainer.appendChild(recommendedProject);
    }
    
    // Add animation
    recommendedContainer.style.opacity = '0';
    setTimeout(() => {
        recommendedContainer.style.transition = 'opacity 0.5s ease-in-out';
        recommendedContainer.style.opacity = '1';
    }, 100);
}

// 4. NEURAL NETWORK VISUALIZATION
function initNeuralNetworkViz() {
    // This function has been removed as requested
    console.log("Neural Network Visualization feature removed");
}

// 5. BLOCKCHAIN INTEGRATION SHOWCASE
function initBlockchainShowcase() {
    // Create blockchain section
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    const blockchainDiv = document.createElement('div');
    blockchainDiv.id = 'blockchain-showcase';
    blockchainDiv.innerHTML = `
        <div class="container">
            <h2 class="section-title">Blockchain Integration</h2>
            <div class="blockchain-content">
                <div class="blockchain-info">
                    <h3>Web3 Skills Showcase</h3>
                    <p>Connect your wallet to see a demonstration of blockchain integration:</p>
                    <button id="connect-wallet" class="btn">Connect Wallet</button>
                    <div id="wallet-info" style="margin-top: 20px;"></div>
                </div>
                <div class="blockchain-visual">
                    <div class="blockchain-animation">
                        <div class="block">Block 1</div>
                        <div class="block">Block 2</div>
                        <div class="block">Block 3</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Insert after contact section
    contactSection.parentNode.insertBefore(blockchainDiv, contactSection.nextSibling);

    // Add event listener for wallet connection
    document.getElementById('connect-wallet').addEventListener('click', connectWallet);
}

// Simple wallet connection simulation
async function connectWallet() {
    const walletInfo = document.getElementById('wallet-info');
    
    // Check if Web3 is available
    if (typeof Web3 === 'undefined') {
        walletInfo.innerHTML = '<p style="color: #f44336;">Web3 not available. Please install MetaMask or similar wallet.</p>';
        return;
    }

    try {
        // In a real implementation, this would connect to a wallet
        // For now, we'll just simulate a connection
        walletInfo.innerHTML = `
            <div class="wallet-details">
                <p><strong>Wallet Connected!</strong></p>
                <p>Address: 0x742d35Cc6634C0532925a3b844Bc454e4438f44e</p>
                <p>Balance: 2.5 ETH</p>
                <p>Network: Ethereum Mainnet</p>
                <button id="disconnect-wallet" class="btn" style="margin-top: 10px;">Disconnect</button>
            </div>
        `;
        
        document.getElementById('disconnect-wallet').addEventListener('click', () => {
            walletInfo.innerHTML = '<p>Wallet disconnected.</p>';
        });
        
        // Start blockchain animation
        startBlockchainAnimation();
    } catch (error) {
        walletInfo.innerHTML = `<p style="color: #f44336;">Error connecting wallet: ${error.message}</p>`;
    }
}

function startBlockchainAnimation() {
    const blocks = document.querySelectorAll('.blockchain-animation .block');
    let currentIndex = 0;
    
    function highlightBlock() {
        // Remove highlight from all blocks
        blocks.forEach(block => block.classList.remove('active'));
        
        // Highlight current block
        blocks[currentIndex].classList.add('active');
        
        // Move to next block
        currentIndex = (currentIndex + 1) % blocks.length;
        
        // Continue animation
        setTimeout(highlightBlock, 1000);
    }
    
    highlightBlock();
}

// Initialize all super advanced features when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize features with a delay to ensure all libraries are loaded
    setTimeout(() => {
        initProjectRecommender();
        initBlockchainShowcase();
    }, 2000);
});
