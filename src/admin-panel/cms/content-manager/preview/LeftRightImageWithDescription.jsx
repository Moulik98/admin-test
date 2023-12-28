import React from 'react'
import ShowImage from './ShowImage'
import Heading from './Heading'
import RenderHTML from './RenderHTML'

const LeftRightImageWithDescription = ({ data }) => {
    const { image, image2, body_text, body_text2, large_text, large_text2, headline, sub_headline } = data
    return (
        <main className=''>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className="">
                    <Heading
                        headline={large_text}
                        style={`text-2xl text-black font-semibold `}
                    />

                    <div className='py-5 text-lg leading-9'>
                        <RenderHTML
                            htmlContent={body_text}
                        />
                    </div>
                    <div className="border-2 rounded-md">
                        <ShowImage
                            style={`w-full h-fit`}
                            alt={`left-image`}
                            image={image}
                        />
                    </div>
                </div>
                <div className="">
                    <div className="border-2 rounded-md">
                        <ShowImage
                            style={`w-full h-fit`}
                            alt={`left-image`}
                            image={image2}
                        />
                    </div>
                    <Heading
                        headline={large_text}
                        style={`text-2xl text-black font-semibold pt-3`}
                    />

                    <div className='py-5 text-lg leading-9'>
                        <RenderHTML
                            htmlContent={body_text}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default LeftRightImageWithDescription