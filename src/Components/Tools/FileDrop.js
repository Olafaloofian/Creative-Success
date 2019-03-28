import React from 'react';
import {useDropzone} from 'react-dropzone';

export default function FileDrop(props) {
    const {acceptedFiles, rejectedFiles, getRootProps, getInputProps} = useDropzone({
        accept: 'image/jpeg, image/png'
    });

    const acceptedFilesItems = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const rejectedFilesItems = rejectedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section>
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            <p>Only *.jpeg and *.png images will be accepted</p>
        </div>
        <aside>
            <h4>Accepted files</h4>
            <ul>
            {acceptedFilesItems}
            </ul>
            <h4>Rejected files</h4>
            <ul>
            {rejectedFilesItems}
            </ul>
        </aside>
        </section>
    );
}