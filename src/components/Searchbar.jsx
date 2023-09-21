import { useState } from "react"
import { SearchResultsList } from "./SearchResultsList";
import axios from "axios";
import { FilterButtons } from "./FilterButtons";

export const SearchBar = ( ) => {
    const [input, setInput] = useState("")
    const [results, setResults]=  useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeDoc, setActiveDoc] = useState({})

    const fetchData = (value) => {
        // Parameters for URL Post Request
        const url = 'https://developer.uspto.gov/ds-api/oa_rejections/v2/records';
        const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        };

        const data = new URLSearchParams();
        // Use the below to pull all data then filter on front-end
        data.append('criteria', `patentApplicationNumber:${value}*`);
        data.append('start', '0');
        data.append('rows', '3');

        // Post Request
        axios.post(url, data, { headers })
            .then((response) => {
                const docs = response.data.response.docs
                setResults(docs);

                 // Show or hide suggestions based on input length
                setShowSuggestions(value.length > 0);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

 

    const handleChange = (value) => {
        setInput(value);
        fetchData(value)
        // fetchPatentData(value)
    }
    
   
    const displayActiveDoc = (doc) => {
        return(
        <div className="flex border-2 mt-4  p-4 flex-col items-start rounded-lg">
            <div className="font-bold"> Office Action</div>
            <div>Application #: {doc.patentApplicationNumber} </div>
            {/* <div>Create Date: {doc.createDateTime}   </div> */}

            <div>Art Unit: {doc.groupArtUnitNumber}   </div>
            <div>Legal Section Code?: {doc.legalSectionCode}   </div>
            <div>Action Type: {doc.actionTypeCategory}   </div>
            <div>Pending Claims: {doc.claimNumberArrayDocument}   </div>
            Rejection Types:   
                              {doc.hasRejDP?  " DP" :""}   
                              {doc.hasRej101? " 101 " :""}  
                              {doc.hasRej102? " 102 " :""} 
                              {doc.hasRej103? " 103 " :""} 
                              {doc.hasRej112? " 112 " :""} 
          
                
            <div className=" mt-10 font-bold">Patent Information</div>
        </div>
        )
    }

    return (
        <div className="">
        <form className="w-full flex gap-4 items-center">   
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="text" 
                id="simple-search" 
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Search Application #..." required/>
            </div>

       


            <FilterButtons/>
        </form>
        
                    {/* Only Show Suggestions if Input is not empty */}
                    <div className="inherit w-full">
                {showSuggestions && <SearchResultsList setShowSuggestions={setShowSuggestions} setActiveDoc={setActiveDoc} results={results} />}
            </div>

        {activeDoc? displayActiveDoc(activeDoc):"NO Doc Chosen"}
            
            

        </div>

    )
}