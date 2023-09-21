import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'



export default function SearchResult({result, patentResults, setShowSuggestions, setActiveDoc}) {

  const handleClick =  () => {
       
      console.log("handleClick PatentRes",patentResults)
      const finalResult = {
        patentApplicationNumber: result.patentApplicationNumber,
        groupArtUnitNumber: result.groupArtUnitNumber,
        legalSectionCode : result.legalSectionCode,
        actionTypeCategory: result.actionTypeCategory,
        claimNumberArrayDocument: result.claimNumberArrayDocument,
        hasRejDP: result.hasRejDP,
        hasRej101: result.hasRej101,
        hasRej102:result.hasRej102,
        hasRej103: result.hasRej103,
        hasRej112: result.hasRej112,

        patentResults: patentResults, // Use fetchedPatentData here
        patent_id : patentResults.patent_id,
        patent_title: patentResults.patent_title,
        filing_date: patentResults.application[0].filing_date,
        applicant_organization: patentResults.applicants,
        examiners: patentResults.examiners[0].examiner_last_name
      };
  
      setShowSuggestions(false);
      setActiveDoc(finalResult);
   
    }



  // const fetchPatentData =  (applicationNumber) => {
  //   // Parameters for URL Post Request
  //   // https://search.patentsview.org/api/v1/patent/?q={"application.application_id":"15/855802"}&f=["patent_title", "application.application_id", "application.filing_date",   "patent_id", "applicants.applicant_organization", "examiners.examiner_first_name","examiners.examiner_last_name", "pct_data"]
  //   const apiUrl = 'https://search.patentsview.org/api/v1/patent/';
  //   const formattedApplicationNumber = applicationNumber.toString().slice(0, 2) + '/' + applicationNumber.slice(2);
  //   const query = {
  //   q: `{"application.application_id":"${formattedApplicationNumber}"}`,
  //   f: '["patent_title", "application.application_id", "application.filing_date", "patent_id", "applicants.applicant_organization", "examiners.examiner_first_name", "examiners.examiner_last_name", "pct_data"]',
  //   };
  //   const headers = {
  //   'x-api-key': "dkw0Ezmu.ao16DmJ1rIOjXJ2ebYSEi0SM8HuPRe6H",
  //   };

  //   axios.get(apiUrl, {
  //   params: query,
  //   headers: headers,
  //   })
  //   .then((response) => {
  //       // Handle the response data here
  //       const data = response.data.patents
  //       setPatentData(data)
  //     })
  //   .catch((error) => {
  //       // Handle any errors here
  //       console.error("ERROR");
  //   }
  //   );

  // } 


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
          

            <h1 className='font-bold mt-4'>Patent Data</h1>

            </div>
          

    </div>
  )
}
