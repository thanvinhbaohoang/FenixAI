import React from "react"
import SearchResult from "./SearchResult"

export const SearchResultsList = ({ results, patentResults, setShowSuggestions, setActiveDoc }) => {

  return (
    <div className="w-full shadow-md overflow-x-hidden overflow-y-scroll mt-2    rounded-lg flex flex-col items-start">
        {results.map( (result, id) => {
        return (
            <div key={id} 
            className=" border-2  mb-6 bg-slate-700 hover:bg-slate-500 cursor-pointer rounded-md p-2
            w-full flex flex-col items-start">
                
                <SearchResult result={result} patentResults={patentResults} setShowSuggestions={setShowSuggestions} setActiveDoc={setActiveDoc}/>
              
            
            </div>
        )
        })}
    </div>
  )
}
