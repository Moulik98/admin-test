'use client'
import React from 'react';

const RenderHTML = ({ htmlContent }) => {
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
    );
};

export default RenderHTML;