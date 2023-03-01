import { lerp } from "./util/lerp";

class App {
    constructor() {
        /* SMOOTH SCROLL PROPERTIES */
        this.scrollElement = document.querySelector("[smooth-scroll]");
        this.currentScrollPos = 0;
        this.targetScrollPos = 0;
        this.scrollEase = 0.1;

        this._initSmoothScroll();
        this._update();
    }
    /* REQUEST ANIMATION FRAME LOOP */
    _update() {
        this._smoothScroll();
        this.frame = requestAnimationFrame(this._update.bind(this));
    }

    _initSmoothScroll() {
        /* CALCULATE TOTAL SCROLLALBE HEIGHT */
        document.body.style.height = `${this.scrollElement.getBoundingClientRect().height}px`;
    }

    _smoothScroll() {
        /* CAMPTURE POSITION OF SCREEN WITH NATIVE SCROLL */
        this.targetScrollPos = window.scrollY;

        /* CALCULATE VALUE THAT EASES THE TARGETSCROLLPOS */
        this.currentScrollPos = lerp(
            this.currentScrollPos,
            this.targetScrollPos,
            this.scrollEase
        );

        this.currentScrollPos = parseFloat(this.currentScrollPos.toFixed(2));

        const transformProperty = `translate3d(0, ${this.currentScrollPos * -1}px, 0)`;

        this.scrollElement.style.transform = transformProperty;
    }
}

new App();