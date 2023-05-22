import { FC, useRef, useContext, MouseEvent } from "react";
import { Modules } from "../../../../../..";
import UploadIcon from "./uploadIcon/UploadIcon";

import './dragAndDropInput.scss';

interface IDragAndDropInput {
    inputType: number;
        // 1 - drag`nDrop for avatar
        // 2 - drag`nDrop for cover
}

const DragAndDropInput: FC<IDragAndDropInput> = ({ inputType }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const userModule = useContext(Modules).fileModule;

    const className = (
        inputType === 1 ? '-avatar' :
        inputType === 2 ? '-cover' : ''
    );
    const label = (
        inputType === 1 ? 'Upload new avatar' :
        inputType === 2 ? 'Change cover' : ''
    );
    function dragStartHandler(e: React.DragEvent) { e.preventDefault(); }
    function dragEndHandler(e: React.DragEvent) { e.preventDefault(); }

    function onDropHandler(e: React.DragEvent) {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
    }

    function onUploadFileClick(e: MouseEvent<HTMLDivElement>) {
        const input = fileInputRef.current;
        if(e.target !== fileInputRef.current && input) {
            return input.click();
        }
    }

    function onInputChangeHandler() {
        const input = fileInputRef.current?.files;
        if(input) {
            const file = input[0];
            handleFile(file);
        }
    }

    function handleFile(file: File) {
        userModule.uploadImage(file, inputType);
    }

    return(
        <div 
            className={`drag-and-drop-wrapper drag-and-drop${className}-wrapper`}
            onDragStart={e => dragStartHandler(e)}
            onDragLeave={e => dragEndHandler(e)}
            onDragOver={e => dragStartHandler(e)}
            onDrop={e => onDropHandler(e)}
            onClick={e => onUploadFileClick(e)}
        >
            <input
                className={`drag-and-drop-input drag-and-drop${className}-input`} 
                type="file"
                ref={fileInputRef}
                onChange={onInputChangeHandler}
            />
            <div className="fake-input-file-button">
                <UploadIcon/>
                <label className='drag-and-drop-input-label' htmlFor="file">{label}</label>
            </div>
        </div>
    );
}

export default DragAndDropInput;