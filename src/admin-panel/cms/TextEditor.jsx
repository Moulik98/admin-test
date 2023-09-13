import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

const TextEditor = ({ onChange, htmlContent }) => {
    const [editorState, setEditorState] = useState(() => {
        if (htmlContent) {
            // Convert HTML content to ContentState
            const blocksFromHTML = convertFromHTML(htmlContent);
            const contentState = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            );
            return EditorState.createWithContent(contentState);
        } else {
            return EditorState.createEmpty();
        }
    });


    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };



    const handleSave = () => {
        const contentState = editorState.getCurrentContent();
        const htmlContent = stateToHTML(contentState);


        onChange('description', htmlContent);

        // You can send this content to your server or handle it as needed.
    };

    const handleBlur = () => {
        // Trigger the save action when the editor loses focus
        handleSave();
    };

    return (
        <div className="border p-2">
            <Editor
                onBlur={handleBlur}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
            />
        </div>
    );
};

export default TextEditor;
