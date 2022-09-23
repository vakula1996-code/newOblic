import React from 'react';
import classes from './inputfile.module.css'

const InputFile = ({onChange, name, value = null, accept}) => {
    return (
        <div style={{display: 'flex', whiteSpace: "nowrap", verticalAlign: 'middle'}}>
            <input
                id={name}
                type='file'
                name={name}
                onChange={onChange}
                accept={accept}
                className={classes.fileInput}
                style={{display: "none"}}
            />
            <label id='nameFile' htmlFor={name}>Файл</label>
            {value !== null
                ? <label id='nameFile' style={{margin: 'auto'}}>{value.name}</label>

                : <label id='nameFile' style={{margin: 'auto'}}>Файл не вибраний</label>

            }
        </div>

    );
};

export default InputFile;