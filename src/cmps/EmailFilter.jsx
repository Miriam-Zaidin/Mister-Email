import { useEffect, useState } from "react"

export function EmailFilter({ filterBy, onSetFilter }) {
    const [filterByTxt, setFilterByTxt] = useState(filterBy)

    function handleChange(ev) {
        setFilterByTxt(ev.target.value)
    }

    useEffect(() => {
        onSetFilter({txt:filterByTxt})
    }, [filterByTxt])

    return (
        <form className="email-filter">
            <label htmlFor="search">Search</label>
            <input value={filterByTxt} onChange={handleChange} id="search" type="text" />
        </form>
    )
}
