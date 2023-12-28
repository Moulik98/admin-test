import React from 'react'
import Heading from './Heading';
import RenderHTML from './RenderHTML';

const BigHeadingAndDescription = ({ data }) => {
    const { large_text, body_text } = data;
    return (
        <main className='p-10'>
            <div className="flex flex-col justify-center items-center " >
                <Heading
                    headline={large_text}
                    style={`text-xl sm:text-4xl md:text-6xl text-black text-center font-semibold pt-3`}
                />
                <div className='py-5 text-lg leading-9'>
                    <RenderHTML
                        htmlContent={body_text}
                    />
                </div>
            </div>
        </main>
    )
}

export default BigHeadingAndDescription