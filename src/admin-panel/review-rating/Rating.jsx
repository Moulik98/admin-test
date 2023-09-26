
import React from 'react'
import { FaStar } from "react-icons/fa";
const colors = {
    orange: "#FFE70F",
    grey: "#DEDEDE"

};
const Rating = ({ rating }) => {
    const stars = Array(rating).fill(0)
    return (
        <div className='flex flex-row mt-5'>
            {stars.map((_, index) => {
                return (
                    <FaStar
                        key={index}
                        size={16}

                        color={colors.orange}
                        style={{
                            marginRight: 10,
                            cursor: "pointer"
                        }}
                    />
                )
            })}
        </div>

    )
}

export default Rating