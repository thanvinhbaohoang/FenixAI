import React from "react"
import SearchResult from "./SearchResult"

export const SearchResultsList = ({ results, setShowSuggestions, setActiveDoc }) => {

  return (
    <div className="w-full max-h-24 shadow-md overflow-y-scroll mt-2  bg-slate-700  rounded-lg flex flex-col items-start">
        {results.map( (result, id) => {
        return (
            <div key={id} 
            className=" hover:bg-slate-500 cursor-pointer rounded-md p-2
            w-full flex flex-col items-start">
                <SearchResult result={result} setShowSuggestions={setShowSuggestions} setActiveDoc={setActiveDoc}/>
            
            </div>
        )
        })}
    </div>
  )
}
