import React, {useState} from 'react'
// Import the main component
// Worker
// Plugins
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import MyModalForFile from "../../UI/modal/MyModalForFile";
import DocViewer from "react-doc-viewer";


export const ReadFile = () => {

    // Create new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    // for onchange event
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfFileError, setPdfFileError] = useState('');

    // for submit event
    const [viewPdf, setViewPdf] = useState(null);

    // onchange event
    const fileType = ['application/pdf'];
    const handlePdfFileChange = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setPdfFile(e.target.result);
                    setPdfFileError('');
                }
            } else {
                setPdfFile(null);
                setPdfFileError('Please select valid pdf file');
            }
        } else {
            console.log('select your file');
        }
    }

    // form submit
    const handlePdfFileSubmit = (e) => {
        e.preventDefault();
        if (pdfFile !== null) {
            setViewPdf(pdfFile);
        } else {
            setViewPdf(null);
        }
    }
    const [modal, setModal] = useState(false)

    return (
        <div className='container'>

            <br></br>

            <form className='form-group' onSubmit={handlePdfFileSubmit}>
                <input type="file" className='form-control'
                       required onChange={handlePdfFileChange}
                />
                {pdfFileError && <div className='error-msg'>{pdfFileError}</div>}
                <br></br>
                <button type="submit" className='btn btn-success btn-lg' onClick={() => setModal(true)}>
                    Переглянути вибраний файл
                </button>
            </form>
            <MyModalForFile visible={modal} setVisible={setModal}>
                <DocViewer documents={pdfFile}/>
            </MyModalForFile>
        </div>
    )
}

export default ReadFile;