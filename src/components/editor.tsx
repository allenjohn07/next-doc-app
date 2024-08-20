import React from 'react'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

interface EditorProps {
    onChange: (value: string) => void
    value: string
}

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image"],
        [{ font: [] }],
        ["clean"],
        [{ align: [] }],
    ],
};
const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
];

const Editor = ({ onChange, value }: EditorProps) => {
    return (
        <div>
            <ReactQuill theme='snow' value={value} onChange={onChange} className='h-[55vh] mb-6 whitespace-pre-wrap' modules={modules} formats={formats}></ReactQuill>
        </div>
    )
}

export default Editor