import React from 'react';

const BigVideo = ({ data }) => {
    const { video } = data;


    return (
        <div className=''>
            <div className='w-full'>
                <video
                    src={video}
                    autoPlay
                    loop
                    muted

                ></video>
            </div>
        </div>
    );
};

export default BigVideo;
