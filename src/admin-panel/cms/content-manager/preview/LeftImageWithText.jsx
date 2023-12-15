import React from 'react'
import ShowImage from './ShowImage'
import RenderHTML from './RenderHTML'
import Heading from './Heading'
const LeftImageWithText = ({ data }) => {
    const { image, body_text, headline, sub_headline } = data
    return (
        <div className='flex flex-row gap-5'>
            <div className='w-2/5'>
                <ShowImage
                    style={`w-full h-72`}
                    alt={`left-image`}
                    image={image}
                />
            </div>
            <div className='flex-1 px-10'>
                <Heading
                    headline={headline}
                    style={`text-2xl text-black font-semibold `}
                />
                <Heading
                    headline={sub_headline}
                    style={`text-xl text-gray-500 font-semibold`}
                />
                <div className='py-5 text-lg leading-9'>
                    <RenderHTML
                        htmlContent={body_text}
                    />
                </div>
            </div>
        </div>
    )
}

export default LeftImageWithText