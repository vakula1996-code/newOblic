import React, {useMemo} from 'react'


export default function DepFilter(date, sort, nameFilter, depName) {
    const shortList = useMemo(() => {
        if (sort === '')
            return date
        return date.map((f) => {
            const depFilter = f[depName].filter((dep) => {
                let d = String(dep[nameFilter])
                let s = String(sort)
                return d.toLowerCase().includes(s.toLowerCase());
            });
            return ({...f, techniqueDetails: depFilter})
        });
    }, [sort, date])
    return (shortList)
}