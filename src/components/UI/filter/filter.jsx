import React, {useMemo} from 'react'


export default function Sort(date, sort, nameFilter) {

    const shortList = useMemo(() => {
        if (sort === '')
            return date
        return date.filter((f) => {
            let d = String(f[nameFilter])
            let s = String(sort)
            return d.toLowerCase().includes(s);
        });
    }, [sort, date])

    return (shortList)
}