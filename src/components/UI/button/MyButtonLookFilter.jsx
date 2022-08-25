import React from 'react';
import classes from "./MyButton.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const MyButtonLookFilter = ({children, ...props}) => {
    return (
        <button {...props} className={classes.buttonLookFilters} >
            <MoreVertIcon/>
        </button>
    );
};

export default MyButtonLookFilter;