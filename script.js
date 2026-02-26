
gsap.registerPlugin(ScrollTrigger);

// --- 1. THE "FLOAT AND DOCK" LOGO ANIMATION (RESPONSIVE) ---
let headerTl = gsap.timeline({
    scrollTrigger: {
        trigger: "body",
        start: "top top", 
        end: "+=400", 
        scrub: 1,     
    }
});

// Setup responsive docking coordinates using GSAP matchMedia
let mm = gsap.matchMedia();

mm.add("(min-width: 901px)", () => {
    // DESKTOP: Move to left: 150px
    headerTl.to("#dynamic-logo", {
        top: "40px", left: "150px", scale: 0.35, transform: "translate(-50%, -50%)", ease: "power2.out"
    }, 0);
});

mm.add("(max-width: 900px)", () => {
    // MOBILE: Move tighter to the left edge (left: 80px), scale down a bit more
    headerTl.to("#dynamic-logo", {
        top: "40px", left: "80px", scale: 0.25, transform: "translate(-50%, -50%)", ease: "power2.out"
    }, 0);
});

// Fade in the header and hero text (runs for both mobile and desktop)
headerTl.to("#main-nav", { opacity: 1, ease: "power2.out" }, 0.1); 
headerTl.to(".hero-content", { opacity: 1, y: 0, ease: "power3.out", duration: 1 }, 0);


// (Keep Part 2 and Part 3 exactly the same as before!)

// A. Move the massive logo into the header
headerTl.to("#dynamic-logo", {
    top: "40px",         // Center of the 80px header
    left: "150px",       // Indented slightly from the left screen edge
    scale: 0.35,         // Shrink it down to header size
    transform: "translate(-50%, -50%)", // Keep it anchored properly
    ease: "power2.out"
}, 0); 

// B. Fade in the background header navigation panel at the same time
headerTl.to("#main-nav", {
    opacity: 1,
    ease: "power2.out"
}, 0.1); // Starts slightly after the logo begins moving

// C. Fade in the Hero Text (Since it starts hidden)
headerTl.to(".hero-content", {
    opacity: 1,
    y: 0,
    ease: "power3.out",
    duration: 1
}, 0);


// --- 2. THE TECH REVEALS (Snapping the dense panels in) ---
const revealItems = gsap.utils.toArray('.reveal-right');

revealItems.forEach((item) => {
    gsap.from(item, {
        x: 200,            // Start slightly to the right
        opacity: 0,        
        duration: 0.8,     
        ease: "power4.out", 
        scrollTrigger: {
            trigger: item,
            start: "top 85%", // Snap in when 85% down the screen
            toggleActions: "play none none reverse" 
        }
    });
});


// --- 3. TRUSTSCORE HUD ANIMATION ---
const circle = document.querySelector('.ring-progress');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI; 

const targetScore = 84; // Boosted the fake score to look better
const offset = circumference - (targetScore / 100) * circumference;

ScrollTrigger.create({
    trigger: ".dashboard-hud", 
    start: "top 75%", 
    onEnter: () => {
        gsap.to(circle, {
            strokeDashoffset: offset,
            duration: 2.5,
            ease: "power3.out"
        });

        gsap.to({ value: 0 }, {
            value: targetScore,
            duration: 2.5,
            ease: "power3.out",
            onUpdate: function() {
                document.getElementById('score-counter').innerText = Math.round(this.targets()[0].value);
            }
        });
    },
    once: true 
});
