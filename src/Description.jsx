import React, { useState } from 'react';

const Description = ({ description }) => {
    const [expanded, setExpanded] = useState(false);
    const limit = 30;
    const slicedContent = description ? description.slice(0, limit) : '';
    const displayContent = expanded ? description : slicedContent;

    return (
        <div className='max-w-sm text-left text-[#4F4F4F] break-words'>
            {displayContent}
            {!expanded && description && description.length > limit && '...'}
            {description && description.length > limit && (
                <span
                    style={{ whiteSpace: 'nowrap' }}
                    className='text-xs text-[#0773DF] cursor-pointer px-2 py-2'
                    onClick={() => setExpanded((preValue) => !preValue)}
                >
                    {expanded ? 'View Less' : 'View More'}
                </span>
            )}
        </div>
    );
};

export default Description;
