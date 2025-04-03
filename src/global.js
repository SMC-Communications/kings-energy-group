initGSAP();
globalAnimations();
async function initGSAP() {
  await gsap;
  gsap.registerPlugin("ScrollTrigger", "ScrollSmoother", SplitText);

  let isAtTop, prevTime;
  let bannerRevealed = false;
  let smoother = await ScrollSmoother.create({
    smooth: 1,
    effects: true,
    wrapper: ".site-wrapper",
    content: ".page-wrapper",
    onUpdate: (self) => {
      if (!bannerRevealed) {
        gsap.delayedCall(0.5, bannerReveal, [self.progress]);
      }
      if (bannerRevealed && self.progress < 0.005) {
        if (!isAtTop) {
          isAtTop = true;
          gsap.to(".nav-wrapper", {
            delay: 0.25,
            duration: 0.25,
            ease: "power1.inOut",
            backgroundColor: "transparent",
          });
        }
      } else if (isAtTop) {
        isAtTop = false;
      } else {
        //gsap.set(".nav-wrapper", { backgroundColor: "var(--nav-bg)" });
      }
      return;
    },
  });

  ScrollTrigger.normalizeScroll({ momentum: 0 });
  ScrollTrigger.config({ ignoreMobileResize: true });
}
async function globalAnimations() {
  await gsap;
  let mm = gsap.matchMedia();
  mm.add("(min-width:992px", () => {
    let containers = gsap.utils.toArray(".flex-container.gsap");

    containers.forEach((container) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          end: "bottom bottom",
          toggleActions: "restart none none none",
        },
      });
      for (i = 0; i < container.children.length; i++) {
        tl.from(
          container.children.item(i),
          {
            scale: (i, t, ts) => {
              if (t.classList.contains("flex-image-wrapper")) {
                return 0.9;
              }
            },
            opacity: 0,
            duration: 0.5,
            ease: "power1.inOut",
          },
          "<+=" + 0.25 * i
        );
      }
    });
  });
}
function bannerReveal(progress) {
  gsap.set(".nav-wrapper", {
    backgroundColor: progress > 0.01 ? "var(--nav-bg)" : "transparent",
  });
  gsap.to(".nav-wrapper", {
    duration: 0.5,
    opacity: 1,
    ease: "power1.inOut",
    onComplete: () => {
      bannerRevealed = true;
    },
  });
}
