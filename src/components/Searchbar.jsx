import { useState } from "react"
import { SearchResultsList } from "./SearchResultsList";
import axios from "axios";


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
        data.append('rows', '100');

        // Post Request
        axios.post(url, data, { headers })
            .then((response) => {
                const docs = response.data.response.docs
                // const filteredDocs = docs.filter( (doc) => {
                //     return doc && doc.patentApplicationNumber&& doc.patentApplicationNumber.toLowerCase().includes(value)
                // })
                // console.log(filteredDocs)
                // Filter Out Fetched Results
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
    }

    const displayActiveDoc = (doc) => {
        return(
        <div className="flex border-2 mt-4  p-4 flex-col items-start rounded-lg">
            <div>Application #: {doc.patentApplicationNumber} </div>
            <div>Create Date: {doc.createDateTime}   </div>

            <div>Art Unit: {doc.groupArtUnitNumber}   </div>
            <div>Legal Section Code?: {doc.legalSectionCode}   </div>
            <div>Action Type: {doc.actionTypeCategory}   </div>
            <div>Pending Claims: {doc.claimNumberArrayDocument}   </div>
            <div> Rejection Types </div>
            <div>DP: {doc.hasRejDP}   </div>
            <div>101: {doc.hasRej101}   </div>
            <div>102: {doc.hasRej102}   </div>
            <div>103: {doc.hasRej103}   </div>
            <div>112: {doc.hasRej112}   </div>
        </div>
        )
    }

    return (
        <div>
        <form className="w-full flex flex-col items-center">   
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

            {/* Only Show Suggestions if Input is not empty */}
            <div className="inherit w-full">
                {showSuggestions && <SearchResultsList setShowSuggestions={setShowSuggestions} setActiveDoc={setActiveDoc} results={results} />}
            </div>

            
        </form>

        
        {activeDoc? displayActiveDoc(activeDoc):"NO Doc Chosen"}
            
            

        </div>

    )
}