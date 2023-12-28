import React from 'react'
import RenderHTML from './RenderHTML'

const ProductDescription = ({ data }) => {
    const { body_text } = data;
    return (
        <div>
            <RenderHTML
                htmlContent={body_text}
            />
        </div>
    )
}

export default ProductDescription