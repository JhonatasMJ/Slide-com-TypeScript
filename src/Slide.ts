import Timeout from "./Timeout.js";

export default class Slide {
  container: Element;
  slides: Element[];
  controls: Element;
  time: number;
  index: number
 slide: Element;
 timeout: Timeout | null;
 pausedTimeout: Timeout | null;
 paused: boolean;

  constructor(
    container: Element,
    slides: Element[],
    controls: Element,
    time: number = 5000
  ) {
    this.container = container;
    this.slides = slides;
    this.controls = controls;
    this.time = time;
    this.timeout = null;
    this.pausedTimeout = null;
    this.index = 0;
    this.slide = this.slides[this.index];
    this.paused = false;
    this.init();
  }
 
  hide(slide: Element) {
    slide.classList.remove('active')
  }
    show(index:number) {
        this.index = index;
        this.slide = this.slides[index];
        this.slides.forEach((slide ) => {
            this.hide(slide)
        })
        this.slide.classList.add('active')
        this.auto(this.time)
    }
  
    auto (time:number) {
      this.timeout?.clear();
    this.timeout = new Timeout(() => this.next(), time);
    }
   prev () {
    if(this.paused) return;
    const prev = (this.index - 1) < 0 ? this.slides.length - 1: this.index - 1;
    this.show(prev);
   }

   next () {
    if(this.paused) return;
    const next = (this.index + 1) < this.slides.length ? this.index + 1: 0;
    this.show(next) 
   }

   pause () {

    this.pausedTimeout = new Timeout(() => {
      this.timeout?.pause();
      this.paused = true;
    }, 300 )
   }

   continue() {
    this.pausedTimeout?.clear();
    if(this.paused) {
      this.paused = false
      this.timeout?.continue()
    }

   }
   
    private addControls() {
      const prevButton = document.createElement('button');
      const nextButton = document.createElement('button');
      this.controls.appendChild(prevButton)
      this.controls.appendChild(nextButton)
      this.controls.addEventListener('pointerdown', () => {
        this.pause();
      })
      this.controls.addEventListener('pointerup', () => {
        this.continue();
      })
      nextButton.addEventListener('pointerup', () => {
        this.next();
      })
      prevButton.addEventListener('pointerup', () => {
        this.prev();
      })
    }
    private init () {
      this.addControls();
      this.show(this.index);
    }
}
