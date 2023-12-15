import React from 'react'
const ShowImage = ({ image, alt, style }) => {
    return (
        <div className={`${style}`}>
            <img className='w-full h-full object-contain' alt={alt} src={image} />
        </div>
    )
}

export default ShowImage