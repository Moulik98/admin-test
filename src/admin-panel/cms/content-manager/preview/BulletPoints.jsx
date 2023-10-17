import React from 'react';

const BulletPoints = ({ bulletPoints }) => {
    const isBulletPoints = bulletPoints?.length > 0 ? true : false;
    return (

        <div className={`px-7 py-5 bg-gray-100 rounded ${isBulletPoints ? 'border border-gray-200' : 'hidden'}`}>
            <ul className='list-disc'>
                {bulletPoints?.map((item, index) => (
                    <li className='text-left' key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default BulletPoints;
