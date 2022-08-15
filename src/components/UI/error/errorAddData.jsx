import React, {useEffect, useState,useMemo} from 'react';
import Box from "@mui/material/Box";
import {Modal} from "@mui/material";
import Typography from "@mui/material/Typography";

function ErrorAddData({error,setError,errorMessages,children},...props)  {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [openError, setOpenError] = useState(false);
    const [openNotError, setOpenNotError] = useState(false);
    const handleClose = () => setOpenError(false);
    const handleCloseNotError = () => setOpenNotError(false);
    const requestStatus = () => {
        if (error === 'Hello world'){
            setOpenNotError(true)
            setError('')
        }
        else if(error !== '' && error !== 'Hello world'){
            setOpenError(true)
            setError('')
        }
    }
    useEffect(()=>{
        requestStatus()
    },[error])
    return (
        <div>
            {children}
            {openError === true
                ?
                <Modal
                    open={openError}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Помилка
                        </Typography>
                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                            {errorMessages}
                        </Typography>
                    </Box>
                </Modal>
                :<></>}
            {openNotError === true
                    ?
                    <Modal
                        open={openNotError}
                        onClose={handleCloseNotError}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Дані добавлено
                            </Typography>

                        </Box>
                    </Modal>
                    :<></>
                }



        </div>

    );
};

export default ErrorAddData;