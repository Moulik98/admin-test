import React from 'react'
import ShowImage from './ShowImage';

const BigBanner = ({ data }) => {
  const { image } = data;
  return (
    <div className=''>
      <div className='w-full'>
        <ShowImage
          style={`w-full `}
          alt={`left-image`}
          image={image}
        />
      </div>
    </div>
  )
}

export default BigBanner