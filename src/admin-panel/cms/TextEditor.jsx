import React, { useState, useEffect, useRef } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';

const TextEditor = ({ onChange }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    const handleSave = () => {
        const content = convertToRaw(editorState.getCurrentContent());
        console.log('text editor', content);

        onChange('description', content)
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
