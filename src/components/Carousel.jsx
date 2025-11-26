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
        <div className="w-full max-w-6xl mx-auto z-10">
            {/* Desktop Tab Navigation */}
            <div className="hidden md:flex mb-12 gap-4">
                {items.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`flex-1 flex flex-col items-start p-6 text-left transition-all duration-300 border rounded-sm ${index === currentIndex
                            ? 'bg-white/10 border-gold'
                            : 'bg-transparent hover:bg-white/5 border-white/10'
                            }`}
                    >
                        <span className={`text-xs font-bold tracking-[0.2em] uppercase mb-2 ${index === currentIndex ? 'text-gold' : 'text-gray-500'
                            }`}>
                            Step {item.step_number ?? index + 1}
                        </span>
                        <span className={`font-serif text-lg leading-tight ${index === currentIndex ? 'text-white' : 'text-gray-400'
                            }`}>
                            {item.title}
                        </span>
                    </button>
                ))}
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center justify-between mb-8 gap-4">
                <button
                    onClick={prevSlide}
                    className="p-3 border border-white/20 hover:border-gold hover:text-gold transition-colors rounded-full text-white"
                    aria-label="Previous step"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>

                <div className="flex-1 flex flex-col items-center text-center p-6 border border-gold bg-white/10 rounded-sm">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase mb-2 text-gold">
                        Step {items[currentIndex].step_number ?? currentIndex + 1}
                    </span>
                    <span className="font-serif text-lg leading-tight text-white">
                        {items[currentIndex].title}
                    </span>
                </div>

                <button
                    onClick={nextSlide}
                    className="p-3 border border-white/20 hover:border-gold hover:text-gold transition-colors rounded-full text-white"
                    aria-label="Next step"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>

            {/* Main Image Display */}
            <div className="relative w-full aspect-[16/9] bg-black/50 border border-white/10 rounded-sm overflow-hidden">
                <img
                    src={items[currentIndex].image}
                    alt={items[currentIndex].title}
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    );
};

export default Carousel;
