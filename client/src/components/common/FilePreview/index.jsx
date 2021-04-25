import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';

import './index.scss';
import wordIcon from 'assets/images/file-icons/word.svg';
import excelIcon from 'assets/images/file-icons/excel.svg';
import pdfIcon from 'assets/images/file-icons/pdf.svg';
import {Tooltip} from "../Tooltip";

export const FilePreview = (
    {
        file,
        fileName,
        fileExtension,
    }
) => {
    const [downloadUrl, setDownloadUrl] = useState(file);
    const [icon, setIcon] = useState(file);

    useEffect(() => {
        if (file) {
            setDownloadUrl(file);
            switch (fileExtension) {
                case 'docx':
                case 'doc':
                    setIcon(wordIcon);
                    break;
                case 'xlsx':
                case 'xls':
                case 'csv':
                    setIcon(excelIcon);
                    break;
                case 'pdf':
                    setIcon(pdfIcon);
                    break;
                default:
                    setIcon(file);
                    break;
            }
        }
    }, [file,fileExtension]);

    return (
        <a
            className='tr__file-preview'
            download
            href={downloadUrl}
            style={{
                display: 'inline',
            }}
        >
            <Tooltip content= {fileName}>
                <img
                    className='file-icon'
                    src={icon || downloadUrl}
                    alt={fileName}
                />
            </Tooltip>
            {/*<img*/}
            {/*    className='file-icon'*/}
            {/*    src={icon || downloadUrl}*/}
            {/*    alt={fileName}*/}
            {/*/>*/}
        </a>
    );
}

FilePreview.propTypes = {
    file: PropTypes.string,
    fileName: PropTypes.string,
    fileExtension: PropTypes.string,
}
