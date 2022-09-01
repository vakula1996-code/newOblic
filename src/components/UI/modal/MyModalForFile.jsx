import React from 'react';
import classes from "./MyModal.module.css";
import MyButtonCloseWindow from "../button/MyButtonCloseWindow";

const MyModalForFile = ({children, visible, setVisible}) => {
    const rootClasses = [classes.myModalForFile]

    if (visible === true) {
        rootClasses.push(classes.active);
    }
    return (
        <div className={rootClasses.join(' ')}>
            <div className={classes.myModalContentForFile} onClick={(e) => e.stopPropagation()}>
                <MyButtonCloseWindow onClick={() => setVisible(false)}>Закрити вікно</MyButtonCloseWindow>
                {children}
            </div>
        </div>
    );
};

export default MyModalForFile;