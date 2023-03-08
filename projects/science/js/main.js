AOS.init({
    duration: 800
});

const flightPath = {
    curviness: 1.25,
    autoRotate: true,
    values: [
        {x: (window.innerWidth * 0.2), y: (window.innerHeight * -0.04)},
        {x: (window.innerWidth * 0.45), y: (window.innerHeight * 0.00)},
        {x: (window.innerWidth * 0.7 ), y: (window.innerHeight * 0.03)},
        {x: (window.innerWidth), y: (window.innerHeight * -0.05)}
    ]
}

const tween = new TimelineLite();

tween.add(
 TweenLite.to(".fish", 1, {
  bezier: flightPath,
  ease: Power1.easeInOut
 })
);

const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
    triggerElement: ".fish-space",
    duration: window.innerHeight + 200,
    triggerHook: 1,
})
    .setTween(tween)
    //.addIndicators()
    .addTo(controller);







    var tween2 = TweenLite.to(".look-upwards-text", 1, {className: "+=big-text"});

    const controller2 = new ScrollMagic.Controller();

    const scene2 = new ScrollMagic.Scene({
    	triggerElement: ".look-upwards-section",
    	duration: window.innerHeight,
    	triggerHook: 1

    })
    	.setTween(tween2)
    	//.addIndicators()
    	.addTo(controller2);
