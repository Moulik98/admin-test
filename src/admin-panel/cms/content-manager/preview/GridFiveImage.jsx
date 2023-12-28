import React from 'react'
import RenderHTML from './RenderHTML'
import ShowImage from './ShowImage';

const GridFiveImage = ({ data }) => {
    const { body_text, image, image2, image3, image4, image5 } = data;

    return (
        <div>
            <RenderHTML htmlContent={body_text} />
            <div className='w-full flex flex-col md:flex-row  md:space-x-2  '>
                <div className='w-full md:w-9/12  '>
                    <div className='w-full flex flex-col space-y-2 md:flex-row md:space-x-2 justify-center items-center'>
                        <div className='w-full h-fit md:w-[70%]  rounded-md overflow-hidden'>
                            <ShowImage image={image} />
                        </div>
                        <div className='w-full h-fit md:w-[30%]  overflow-hidden rounded-md'>
                            <ShowImage image={image2} />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-x-2 mt-2 '>
                        <div className='md:w-full h-fit  overflow-hidden rounded-md'>
                            <ShowImage image={image3} />
                            <img  alt="" />
                        </div>
                        <div className=' w-full h-fit overflow-hidden rounded-md '>
                            <ShowImage image={image4}/>
                        </div>
                    </div>

                </div>
                <div className='w-full md:w-1/4 h-fit overflow-hidden rounded-md'>
                    <ShowImage image={image5} />
                   
                </div>
            </div>
        </div>
    )
}

export default GridFiveImage