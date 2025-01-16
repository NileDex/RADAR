import React, { useState, useEffect } from 'react';
import './Caroucel.css';

type Slide = {
  image: string;
  alt: string;
};

type CarouselProps = {
  slides: Slide[];
  interval?: number;
};

export const Carousel: React.FC<CarouselProps> = ({ slides, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function for going to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Function for going to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  // Set the interval for automatic sliding
  useEffect(() => {
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className="carousel">
      <div
        className="carousel-slides"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="carousel-slide" key={index}>
            <img src={slide.image} alt={slide.alt} />
          </div>
        ))}
      </div>
      <button className="carousel-button prev" onClick={prevSlide}>
        ❮
      </button>
      <button className="carousel-button next" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
};
