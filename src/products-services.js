initApplication();
async function initApplication() {
  await gsap;

  let mm = gsap.matchMedia();

  mm.add("(max-width: 767px)", () => {
    slides = gsap.utils.toArray(".mobile-slide");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".mobile-process-section",
        pin: true,
        scrub: true,
        start: "top top",
        end: () => {
          return "+=" + window.innerHeight * slides.length;
        },
        snap: {
          snapTo: 1 / slides.length,
          duration: { min: 0.05, max: 0.2 },
          delay: 0,
          inertia: true,
          ease: "power4.out",
        },
      },
    });
    gsap.set(slides, { opacity: 0, position: "absolute" });
    gsap.set(slides[0], { opacity: 1 });

    slides.forEach((slide, i) => {
      if (i != 0) {
        tl.to(slides[i - 1], { opacity: 0, yPercent: -75 }, i);
        tl.fromTo(
          slide,
          { opacity: 0, yPercent: 75 },
          { opacity: 1, yPercent: 0 },
          i
        );
        tl.to("#circle-svg", { rotation: i * 90 }, i);
      }
    });

    ScrollTrigger.normalizeScroll({});
    ScrollTrigger.config({ ignoreMobileResize: true });
  });

  mm.add("(min-width: 992px)", () => {
    gsap.from(".tread-grid-item", {
      scrollTrigger: {
        trigger: ".tread-grid",
        start: "top 50%",
      },
      stagger: 0.2,
      opacity: 0,
      duration: 0.3,
      ease: "power1.inOut",
    });
  });
}
