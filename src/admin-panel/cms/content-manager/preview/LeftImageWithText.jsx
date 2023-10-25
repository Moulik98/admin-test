import React from 'react'
import ShowImage from './ShowImage'
import RenderHTML from './RenderHTML'
import Heading from './Heading'
const LeftImageWithText = ({ data }) => {
    const { image, body_text, headline, sub_headline } = data
    return (
        <div className='grid grid-cols-2 gap-5'>
            <div>
                <ShowImage
                    style={`w-full h-96`}
                    alt={`left-image`}
                    image={image}
                />
            </div>
            <div className='px-10'>
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