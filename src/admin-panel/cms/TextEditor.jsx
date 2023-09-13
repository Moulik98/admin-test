import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, ContentState, convertToRaw } from 'draft-js';

const TextEditor = ({ onChange, plainText }) => {
    const [editorState, setEditorState] = useState(() => {
        if (plainText) {
            // Convert plain text to ContentState
            const contentState = ContentState.createFromText(plainText);
            return EditorState.createWithContent(contentState);
        } else {
            return EditorState.createEmpty();
        }
    });

    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    const convertToText = (editorContent) => {
        const contentState = editorContent.getCurrentContent();
        const text = contentState.getPlainText('\u0001'); // Use a delimiter to separate blocks
        return text;
    };

    const handleSave = () => {
        const content = convertToRaw(editorState.getCurrentContent());
        console.log('text editor', content);

        // Convert the EditorState to plain text
        const plainText = convertToText(editorState);
        onChange('description', plainText);

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
