import React from 'react';
import Heading from './Heading';
import Slider from './Slider'
const ImageSlider = ({ data }) => {
    const { headline, slider_images } = data;

    return (
        <div className='flex flex-col space-y-5 '>
            <Heading
                headline={headline}
                style='text-2xl text-black font-semibold' // Use single quotes for style
            />
            <Slider sliderImage={slider_images} />
        </div>
    );
};

export default ImageSlider;
