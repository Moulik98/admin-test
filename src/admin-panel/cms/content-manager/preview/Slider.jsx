import React, { useRef, useState, useEffect } from 'react';

const Slider = ({ sliderImage }) => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(null);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        setStartX(e.clientX);
        setScrollLeft(containerRef.current.scrollLeft);
        containerRef.current.style.scrollBehavior = 'auto';
    };

    const handleMouseUp = () => {
        if (isDragging) {
            setIsDragging(false);
            containerRef.current.style.scrollBehavior = 'smooth';
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const deltaX = e.clientX - startX;
            containerRef.current.scrollLeft = scrollLeft - deltaX;
        }
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('mousemove', handleMouseMove);
        } else {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        }
        return () => {
            // Clean up the event listeners when the component unmounts
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isDragging]);

    return (
        <div className='w-full overflow-x-hidden relative'>
            <div
                onMouseDown={handleMouseDown}
                ref={containerRef}
                className='w-full min-h-fit h-full flex flex-row gap-5 overflow-x-auto whitespace-no-wrap relative no-scrollbar'>
                {
                    sliderImage?.map((image, index) => (
                        <div ref={contentRef} className='w-[30%] h-96 shrink-0 cursor-grabbing' key={index}>
                            <img
                                src={image.image_url}
                                alt={`Image ${index}`}
                                className='w-full h-full object-cover rounded-3xl'
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Slider;
