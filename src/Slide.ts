export default class Slide {
  container: Element;
  slides: Element[];
  controls: Element;
  time: number;
  index: number
 slide: Element;
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
    this.index = 0;
    this.slide = this.slides[this.index];
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
    }
  
}
