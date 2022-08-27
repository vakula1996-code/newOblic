import React, {useMemo} from 'react'


export default function DepFilter(date, sort, nameFilter, depName) {
    const shortList = useMemo(() => {
        if (sort === '')
            return date
        return date.filter((f) => {
            const depFilter = f[depName].filter((dep) => {
                let d = String(dep[nameFilter])
                let s = String(sort)
                return d.toLowerCase().includes(s);
            });
            return depFilter.length > 0
        });
    }, [sort, date])
    return (shortList)
}