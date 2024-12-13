/*if (document.readyState === "complete") {
  indexAnimations();
} else {
  document.onreadystatechange = () => {
    if (document.readyState === "complete") {
      indexAnimations();
    }
  };
}*/
checkMedia();
async function checkMedia() {
  await gsap;

  let mm = gsap.matchMedia();
  mm.add("(min-width: 992px)", () => {
    indexAnimations();
  });
}

async function indexAnimations() {
  await gsap;
  triggerElement = document.querySelector(".home-intro");
  gsap.set(".tire-tread-bg", {
    transformOrigin: "top left",
    translateZ: 1,
    rotationX: -0.5,
    rotationY: 0.25,
  });

  let splitHeadline = new SplitText(".intro-subhead", { type: "lines" });
  let splitParagraphs = new SplitText(".intro-paragraph", { type: "lines" });

  ScrollTrigger.create({
    trigger: triggerElement,
    start: () => `top top`,
    pin: true,
  });
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      pinnedContainer: triggerElement,
      start: "top 90%",
      end: "bottom bottom",
      toggleActions: "restart none none none",
    },
  });
  tl.to(".tire-tread-bg", {
    duration: 1,
    rotationX: 0,
    rotationY: 0,
    ease: "sine.out",
  });
  tl.set(".tire-tread-bg", {
    translateZ: 0,
  });
  tl.from(".intro-heading", {
    duration: 0.5,
    y: "150%",
    rotationX: -90,
    opacity: 0,
    ease: "power1.inOut",
    stagger: 0.4,
  });
  tl.from(
    ".intro-image",
    {
      opacity: 0,
      duration: 2,
      ease: "power1.inOut",
    },
    "<+=0.5"
  );
  tl.from(
    ".intro-location",
    {
      duration: 0.3,
      y: "100%",
      opacity: 0,
      ease: "power1.inOut",
      stagger: 0.2,
    },
    "<+=0.5"
  );
  tl.from(
    ".intro-copy-wrapper",
    {
      duration: 1,
      opacity: 0,
      ease: "power1.inOut",
    },
    ">"
  );
}
