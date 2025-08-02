import React from 'react';

function HeroSection({ heroSlides, currentSlide, setCurrentSlide }) {
  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative h-full flex items-center justify-center text-center text-white">
              <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-5xl md:text-7xl font-bold luxury-font-heading mb-6 fade-in">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-4 slide-in-left">
                  {slide.subtitle}
                </p>
                <p className="text-lg mb-8 max-w-2xl mx-auto slide-in-right">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-accent' : 'bg-white/50'
            } touch-friendly`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSection;