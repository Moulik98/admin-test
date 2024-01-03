import React from 'react'
import Heading from './Heading'
import ShowImage from './ShowImage'
import RenderHTML from './RenderHTML'
const CompanyLogo = ({ data }) => {
    const { image } = data;
    return (
        <div className='flex flex-col '>
            <ShowImage
                style={`w-full`}
                alt={`company-logo`}
                image={image}
            />
        </div>
    )
}

export default CompanyLogo