import React from 'react'
import Heading from './Heading'
import ShowImage from './ShowImage'
import RenderHTML from './RenderHTML'
const ImageHeaderWithText = ({ data }) => {
    const { headline, headline2, image, body_text } = data
    return (
        <div className='flex flex-col space-y-2 '>
            <Heading
                headline={headline}
                style={`text-2xl text-black font-semibold`}
            />
            <ShowImage
                style={`w-full h-[35rem]`}
                alt={`left-image`}
                image={image}
            />
            <Heading
                headline={headline2}
                style={`text-2xl text-black font-semibold`}
            />
            <RenderHTML
                htmlContent={body_text}
            />
        </div>
    )
}

export default ImageHeaderWithText