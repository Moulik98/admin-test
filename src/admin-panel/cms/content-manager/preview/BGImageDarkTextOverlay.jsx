import React from 'react'
import Heading from './Heading'
import RenderHTML from './RenderHTML'

const BGImageDarkTextOverlay = ({ data }) => {
    const { image, headline, body_text } = data;
    return (
        <div
            className='relative flex justify-end items-center w-full h-80 bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${image})` }}
        >
            {/* You can add your text overlay here */}
            <div className='max-w-sm  mr-12 md:mr-24 lg:mr-32 p-5 bg-black bg-opacity-25 list-disc'>
                <Heading
                    headline={headline}
                    style={`text-xl text-white font-normal`}
                />
                <RenderHTML
                    style={`text-white`}
                    htmlContent={body_text}
                    className={'dark-overlay'}
                />
            </div>
        </div>
    )
}

export default BGImageDarkTextOverlay