import React, { useState } from 'react';

const Carousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    if (!items || items.length === 0) {
        return <div className="text-red-500">No items in carousel</div>;
    }

    return (
        <div className="relative w-full max-w-4xl mx-auto z-10">
            {/* Main Image Display */}
            <div className="relative h-[400px] md:h-[600px] bg-black border border-white/20 overflow-hidden rounded-sm">
                <img
                    src={items[currentIndex].image}
                    alt={items[currentIndex].title}
                    className="w-full h-full object-contain"
                />

                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-8 pt-24">
                    <h3 className="font-serif text-2xl text-white mb-2">{items[currentIndex].title}</h3>
                    <p className="text-gray-300 font-sans max-w-2xl">{items[currentIndex].description}</p>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-6">
                <button
                    onClick={prevSlide}
                    className="p-3 border border-white/20 hover:border-gold hover:text-gold transition-colors rounded-full text-white"
                    aria-label="Previous slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>

                {/* Indicators */}
                <div className="flex space-x-3">
                    {items.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-gold' : 'bg-white/20 hover:bg-white/50'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={nextSlide}
                    className="p-3 border border-white/20 hover:border-gold hover:text-gold transition-colors rounded-full text-white"
                    aria-label="Next slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Carousel;
