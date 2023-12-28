import React from 'react';
import Heading from './Heading';
import RenderHTML from './RenderHTML';
const BGImageLightTextOverlay = ({ data }) => {
    const { image, headline, body_text } = data;
    return (
        <div
            className='relative flex justify-end items-center w-full h-80 bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${image})` }}
        >
            {/* You can add your text overlay here */}
            <div className='max-w-sm mr-32 p-5 bg-white bg-opacity-25 list-disc'>
                <Heading
                    headline={headline}
                    style={`text-xl text-black font-normal`}
                />
                <RenderHTML
                    htmlContent={body_text}
                />
            </div>
        </div>
    );
};

export default BGImageLightTextOverlay;
