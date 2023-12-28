import React from 'react';
import styles from './RenderHTML.module.css'; // Import CSS module

const RenderHTML = ({ htmlContent, className }) => {
    return (
        <div className={`${styles.customList} ${styles[className]}`}>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
    );
};

export default RenderHTML;
