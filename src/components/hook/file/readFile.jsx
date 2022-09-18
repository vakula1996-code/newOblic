import React, {useState} from 'react'
import axios from "axios";
import {LOCAL_URLS, UPLOAD} from "../../../utils/const";


export const ReadFile = () => {

    // Create new plugin instance
    // const defaultLayoutPluginInstance = defaultLayoutPlugin();
    //
    // // for onchange event
    // const [pdfFile, setPdfFile] = useState(null);
    // const [pdfFileError, setPdfFileError] = useState('');
    //
    // // for submit event
    // const [viewPdf, setViewPdf] = useState(null);
    //
    // // onchange event
    // const fileType = ['application/pdf'];
    // const handlePdfFileChange = (e) => {
    //     let selectedFile = e.target.files[0];
    //     if (selectedFile) {
    //         if (selectedFile && fileType.includes(selectedFile.type)) {
    //             let reader = new FileReader();
    //             reader.readAsDataURL(selectedFile);
    //             reader.onloadend = (e) => {
    //                 setPdfFile(e.target.result);
    //                 setPdfFileError('');
    //             }
    //         } else {
    //             setPdfFile(null);
    //             setPdfFileError('Please select valid pdf file');
    //         }
    //     } else {
    //         console.log('select your file');
    //     }
    // }
    //
    // // form submit
    // const handlePdfFileSubmit = (e) => {
    //     e.preventDefault();
    //     if (pdfFile !== null) {
    //         setViewPdf(pdfFile);
    //     } else {
    //         setViewPdf(null);
    //     }
    // }
    // const [modal, setModal] = useState(false)
    const [file, setFile] = useState()

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    // const downLoadDocument = () => {
    //     const link = document.createElement('a');
    //     link.href = LOCAL_URLS + UPLOAD;
    //     document.body.appendChild(link);
    //
    //     link.click();
    //
    //     link.parentNode.removeChild(link)
    //
    //
    // }

    const [idFile, setIfFile] = useState('')

    const OnSumbit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target.form);
        const imagedata = document.querySelector('input[type="file"]').files[0];
        formData.append('file', imagedata)

        axios
            .post(LOCAL_URLS + UPLOAD, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },

            })
            .then((res) => {
                setIfFile(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const openFile = (id) => {
        const link = document.createElement('a');
        link.href = LOCAL_URLS + 'api/upload/id/' + idFile
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link)
    }

    return (<div className='container'>
        {/*<button onClick={downLoadDocument}>Cкачать</button>*/}
        <form onSubmit={OnSumbit}>
            <h1>Зона тестов</h1>
            <input
                id="contained-button-content"
                name="file"
                type="file"
            />
            <button>
                Сохранить и закрыть
            </button>
        </form>
        <button onClick={openFile}>
            Відкрити
        </button>
    </div>)
}

export default ReadFile;