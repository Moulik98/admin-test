import React from 'react'

const Heading = ({ headline, style }) => {
    return (
        <h1 className={style}>{headline}</h1>
    )
}

export default Heading