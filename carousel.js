"use strict";

class Carousel {
  // require variables
  #curSlide = 0;
  #slideLen;
  #leftBtn;
  #rightBtn;
  #slideContainer;
  #dotContainer;
  #itl;
  #timeout;

  constructor() {
    // Assigning the require data from DOM
    this.#slideLen = document.querySelectorAll(".slide").length;
    this.#dotContainer = document.querySelector(".dot-container");
    this.#leftBtn = document.querySelector(".left--btn");
    this.#rightBtn = document.querySelector(".right--btn");
    this.#slideContainer = document.querySelector(".slide-container");

    /* calling necessary functions */
    this.#events();
  }

  // Attaching Events
  #events() {
    this.#leftBtn.addEventListener("click", this.#leftBtnClick.bind(this));
    this.#rightBtn.addEventListener("click", this.#rightBtnClick.bind(this));

    this.#dotContainer.addEventListener(
      "click",
      this.#slidingWithDots.bind(this)
    );

    /* generating dots under the carousel */
    this.#generateDot();

    /* if there is no action, this will make the slides move */
    this.#intervalSlide();
  }

  // Left Btn Click action
  #leftBtnClick() {
    if (this.#curSlide === 0) this.#curSlide = 2;
    else this.#curSlide--;

    /* sliding to the left */
    this.#moveToSlide();

    /* when the user takes an action ,this will reset the slide's sliding after a while*/
    this.#waitInterval();
  }

  // Right Btn Click action
  #rightBtnClick() {
    /* sliding to right */
    this.#defaultSlide();

    /* when the user takes an action ,this will reset the slide's sliding after a while*/
    this.#waitInterval();
  }

  #defaultSlide() {
    if (this.#curSlide === 2) this.#curSlide = 0;
    else this.#curSlide++;

    this.#moveToSlide();
  }

  // moving to the current slide
  #moveToSlide() {
    for (let i = 0; i < 3; i++) {
      this.#slideContainer.classList.remove(`slide-${i}`);
    }

    this.#slideContainer.classList.add(`slide-${this.#curSlide}`);

    this.#changeActiveDots();
  }

  // generating dots by inserting it into the main wrapper with require data
  #generateDot() {
    for (let i = 0; i < this.#slideLen; i++) {
      this.#dotContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="dot ${i === 0 ? "active" : ""}" data-cur=${i}></div>`
      );
    }
  }

  #slidingWithDots(e) {
    if (e.target.classList.contains("dot")) {
      this.#curSlide = +e.target.dataset.cur;
      this.#moveToSlide();
      this.#waitInterval();
    }
  }

  /* chaing the active dot depending on the current slide */
  #changeActiveDots() {
    let dots = document.querySelectorAll(".dot");
    dots.forEach((el) => el.classList.remove("active"));
    dots[this.#curSlide].classList.add("active");
  }

  /* sliding every 5 seconds */
  #intervalSlide() {
    this.#itl = setInterval(this.#defaultSlide.bind(this), 5000);
  }

  // waiting if there is an action
  #waitInterval() {
    clearInterval(this.#itl);

    clearTimeout(this.#timeout);
    this.#timeout = setTimeout(() => {
      this.#itl = setInterval(this.#defaultSlide.bind(this), 5000);
    }, 10000);
  }
}

// instantiating
const carousel = new Carousel();
