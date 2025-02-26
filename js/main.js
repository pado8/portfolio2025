const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.fromTo(".text", { opacity: 0, y: 50 }, {
    opacity: 1, y: 0, scrollTrigger: {
        trigger: ".text",
        start: "top 80%",
        end: "top 50%",
        scrub: true
    }
});