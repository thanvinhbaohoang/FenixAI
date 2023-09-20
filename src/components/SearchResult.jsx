import React from 'react'

export default function SearchResult({result, setShowSuggestions, setActiveDoc}) {
    const handleClick = (e) => {
        setActiveDoc(result)
        setShowSuggestions(false)
    }

  return (
    <div onClick={handleClick}
    className=" hover:bg-slate-500 cursor-pointer rounded-md px-2
            w-full flex flex-col items-start">
                
        Application: {result.patentApplicationNumber}
    </div>
  )
}
