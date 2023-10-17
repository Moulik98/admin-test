import React from 'react'
import ShowImage from './ShowImage'
import Heading from './Heading'
import BulletPoints from './BulletPoints';
import RenderHTML from './RenderHTML'
const SingleImageSidebar = ({ data }) => {
    const { image, image2, image_caption, headline, sub_headline, headline2, body_text, body_text2, bullet_point, bullet_point2 } = data
    return (
        <div className='flex flex-col md:flex-row'>
            <div className='w-full md:w-[30%] flex flex-col  space-y-2'>
                <ShowImage
                    style={`w-full h-96`}
                    alt={`left-image`}
                    image={image}
                />
            </div>
            <div className='w-full md:w-[45%] flex flex-col space-y-2 px-2'>
                <Heading
                    headline={headline}
                    style={`text-2xl text-black font-semibold leading-0`}
                />
                <Heading
                    headline={sub_headline}
                    style={`text-2xl text-gray-500 font-semibold`}
                />
                <RenderHTML
                    htmlContent={body_text}
                />
                <BulletPoints
                    bulletPoints={bullet_point}
                />
            </div>
            <div className='w-full md:w-[25%] flex flex-col space-y-2'>
                <ShowImage
                    style={`w-full h-40`}
                    image={image2}
                    alt={`right-image`}
                />
                <Heading
                    headline={headline2}
                    style={`text-lg text-black font-semibold`}
                />
                <RenderHTML
                    htmlContent={body_text2}
                />
                <BulletPoints
                    bulletPoints={bullet_point2}
                />
            </div>
        </div>
    )
}

export default SingleImageSidebar