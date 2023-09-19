import React from "react"

export const SearchResultsList = ({ results }) => {
  return (
    <div className="w-full mt-2 p-2 bg-slate-700  rounded-lg flex flex-col items-start">
        {results.map( (result, id) => {
        return (
            <div key={id} 
            className="my-4 hover:bg-slate-500 cursor-pointer rounded-md px-2
            w-full flex flex-col items-start">
                <div>Application #: {result.patentApplicationNumber} </div>
                <div>Art Unit: {result.groupArtUnitNumber}   </div>
                <div>Create Date: {result.createDateTime}   </div>
                <div>Legal Section Code?: {result.legalSectionCode}   </div>
                <div>Action Type: {result.actionTypeCategory}   </div>
                <div>Pending Claims: {result.claimNumberArrayDocument}   </div>
                <div> Rejection Types </div>
                <div>DP: {result.hasRejDP}   </div>
                <div>101: {result.hasRej101}   </div>
                <div>102: {result.hasRej102}   </div>
                <div>103: {result.hasRej103}   </div>
                <div>112: {result.hasRej112}   </div>

            </div>
        )
        })}
    </div>
  )
}
