import React from 'react'
import ShowImage from './ShowImage';
const GridTwoImage = ({ data }) => {
    const { image, image2 } = data;
    return (
        <main className=' flex justify-center items-center '>
            <div className="w-full flex md:flex-row flex-col max-md:space-y-5 md:space-x-5 ">
                <div className=" border  rounded-md w-full md:w-1/2">

                    <ShowImage
                        style={`w-full `}
                        alt={`left-image`}
                        image={image}
                    />
                </div>
                <div className="border rounded-md w-full md:w-1/2">
                    <ShowImage
                        style={`w-full `}
                        alt={`left-image`}
                        image={image2}
                    />
                </div>
            </div>
        </main>
    )
}

export default GridTwoImage