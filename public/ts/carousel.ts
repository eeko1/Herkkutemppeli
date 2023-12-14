let slideIndex: number = 1;
showSlides(slideIndex);

function showSlides(n: number): void {
  const slides: NodeListOf<Element> = document.querySelectorAll(".slide");
  const dots: NodeListOf<Element> = document.querySelectorAll(".dot");

  if (n > slides.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = slides.length;
  }

  for (let i: number = 0; i < slides.length; i++) {
    (slides[i] as HTMLElement).style.display = "none";
    dots[i].className = dots[i].className.replace(" active", "");
  }

  (slides[slideIndex - 1] as HTMLElement).style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function changeSlide(n: number): void {
  showSlides((slideIndex += n));
}

function currentSlide(n: number): void {
  showSlides((slideIndex = n));
}

const slideInterval: NodeJS.Timeout = setInterval(() => {
  changeSlide(1);
}, 10000);
