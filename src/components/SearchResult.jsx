import React from 'react'
import { useState } from 'react'
export default function SearchResult({result, setShowSuggestions, setActiveDoc}) {
    const handleClick = (e) => {
        setActiveDoc(result)
        setShowSuggestions(false)
    }

    const fetchPatentData = (applicationNumber) => {
      // Parameters for URL Post Request
      // https://search.patentsview.org/api/v1/patent/?q={"application.application_id":"15/855802"}&f=["patent_title", "application.application_id", "application.filing_date",   "patent_id", "applicants.applicant_organization", "examiners.examiner_first_name","examiners.examiner_last_name", "pct_data"]
      const apiUrl = 'https://search.patentsview.org/api/v1/patent/';
      const formattedApplicationNumber = applicationNumber.toString().slice(0, 2) + '/' + applicationNumber.slice(2);
      const query = {
      q: `{"application.application_id":"${formattedApplicationNumber}"}`,
      f: '["patent_title", "application.application_id", "application.filing_date", "patent_id", "applicants.applicant_organization", "examiners.examiner_first_name", "examiners.examiner_last_name", "pct_data"]',
      };
      console.log(query)
      const headers = {
      'x-api-key': "dkw0Ezmu.ao16DmJ1rIOjXJ2ebYSEi0SM8HuPRe6H",
      };

      axios.get(apiUrl, {
      params: query,
      headers: headers,
      })
      .then((response) => {
          // Handle the response data here
          console.log(response.data.patents);
          const patentData = response.data.patents
          return patentData
      })
      .catch((error) => {
          // Handle any errors here
          console.error(error);
      }
      
      );

  }

  return (
    <div onClick={handleClick}
    className=" hover:bg-slate-500 h-1/2 cursor-pointer rounded-md px-2
            w-full flex flex-col items-start">
                
            <div className=''>
              <h1 className='font-bold'>Office Action </h1>
              Application #: {result.patentApplicationNumber}    <br/>
              OA Create Date: {result.createDateTime}   <br/>
              OA Submission Date: {result.submissionDate}   <br/>
              Art Unit: {result.groupArtUnitNumber}   <br/>
              {/* Legal Section Code: {result.legalSectionCode}   <br/> */}
              ActionTypeCategory: {result.actionTypeCategory}   <br/>
              claimNumberArrayDocument: {result.claimNumberArrayDocument}  <br/>
              Rejection Types:   
                              {result.hasRejDP?  " DP" :""}   
                              {result.hasRej101? " 101 " :""}  
                              {result.hasRej102? " 102 " :""} 
                              {result.hasRej103? " 103 " :""} 
                              {result.hasRej112? " 112 " :""} 
            </div>





    </div>
  )
}
