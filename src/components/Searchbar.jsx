import { useState } from "react"
import axios from "axios";


export const SearchBar = ( {setResults} ) => {
    const [input, setInput] = useState("")


    const fetchData = (value) => {
        // Parameters for URL Post Request
        const url = 'https://developer.uspto.gov/ds-api/oa_rejections/v2/records';
        const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        };

        const data = new URLSearchParams();
        // Use this if want to query directly from server instead
            // data.append('criteria', `id:${value}`); 

        // Use the below to pull all data then filter on front-end
        data.append('criteria', '*:*');
        data.append('start', '0');
        data.append('rows', '100');

        // Post Request
        axios.post(url, data, { headers })
            .then((response) => {
                const docs = response.data.response.docs
                const filteredDocs = docs.filter( (doc) => {
                    return doc && doc.patentApplicationNumber&& doc.patentApplicationNumber.toLowerCase().includes(value)
                })
                console.log(filteredDocs)
                setResults(filteredDocs);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const handleChange = (value) => {
        setInput(value);
        fetchData(value)
    }


    return (

        <form className="w-[30vw] flex items-center">   
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                    </svg>
                </div>
                <input type="text" 
                id="simple-search" 
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Search Application #..." required/>

            </div>
            <button type="submit" 
            onSubmit={fetchData}
            className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span className="sr-only">Search</span>
            </button>
        </form>
    )
}