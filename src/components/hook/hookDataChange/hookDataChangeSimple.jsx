import React from 'react';

const HookDataChangeSimple = ({data, setData, nameData, id, idName}) => (event) => {
    setData(data.map(item =>
            item[idName] === id
                ?
                {...item, [nameData]: event.target.value}
                :
                item
        )
    )
};

export default HookDataChangeSimple;