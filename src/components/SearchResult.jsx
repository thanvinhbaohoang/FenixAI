import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'



export default function SearchResult({result, setShowSuggestions, setActiveDoc}) {
  const [patentData, setPatentData] = useState({})
  const [loading, setLoading] = useState(true)

 // useEffect with an empty dependency array (runs once, like componentDidMount)
 useEffect( () => {
  setPatentData({})
  fetchPatentData(result.patentApplicationNumber)
}, [result]); //  dependency on result means it runs once when result change

  
  const fetchPatentData = async (value) => {
    console.log("FETCHPATENTDATA CALLED")
    // Parameters for URL Post Request
    // https://search.patentsview.org/api/v1/patent/?q={"application.application_id":"15/855802"}&f=["patent_title", "application.application_id", "application.filing_date",   "patent_id", "applicants.applicant_organization", "examiners.examiner_first_name","examiners.examiner_last_name", "pct_data"]
    const apiUrl = 'https://search.patentsview.org/api/v1/patent/';
    const formattedApplicationNumber = value.toString().slice(0, 2) + '/' + value.slice(2);
    const query = {
    q: `{"application.application_id":"${formattedApplicationNumber}"}`,
    f: '["patent_title", "application.application_id", "application.filing_date", "patent_id", "applicants.applicant_organization", "examiners.examiner_first_name", "examiners.examiner_last_name", "pct_data"]',
    };
    const headers = {
    'x-api-key': "dkw0Ezmu.ao16DmJ1rIOjXJ2ebYSEi0SM8HuPRe6H",
    };

    axios.get(apiUrl, {
    params: query,
    headers: headers,
    })
    .then((response) => {
    // Handle the response data here
    const data = response.data.patents
    setPatentData(data[0])
    setLoading(false)
    })
    .catch((error) => {
    // Handle any errors here
    console.error(error);
    }
    );

  } 
  const handleClick =  () => {
       
      console.log("handleClick PatentRes",patentData)
      // await fetchPatentData(result.patentApplicationNumber)
      console.log("======  handleClick PatentData",patentData)
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

        // patentResults: patentResults, // Use fetchedPatentData here
        patent_id : patentData?.patent_id,
        patent_title: patentData?.patent_title,
        filing_date: patentData?.application[0].filing_date,
        applicant_organization: patentData?.applicants,
        examiners: patentData?.examiners[0].examiner_last_name
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
    className={`hover:bg-slate-500 h-1/2 
    ${loading? "cursor-wait":"cursor-pointer"}
    cursor-pointer rounded-md px-2 w-full 
    flex flex-col items-start`}>
                
            <div className='flex flex-col items-start'>
              <h1 className='font-bold'>Office Action </h1>
              {loading? "LOADING..." : <p>Application #: {result.patentApplicationNumber}   </p>
 }
              <div></div>
              {/* OA Create Date: {result.createDateTime}   <br/>
              OA Submission Date: {result.submissionDate}   <br/>
              Art Unit: {result.groupArtUnitNumber}   <br/>
              Legal Section Code: {result.legalSectionCode}   <br/>
              ActionTypeCategory: {result.actionTypeCategory}   <br/>
              claimNumberArrayDocument: {result.claimNumberArrayDocument}  <br/>
              Rejection Types:   
                              {result.hasRejDP?  " DP" :""}   
                              {result.hasRej101? " 101 " :""}  
                              {result.hasRej102? " 102 " :""} 
                              {result.hasRej103? " 103 " :""} 
                              {result.hasRej112? " 112 " :""} 
          

            <h1 className='font-bold mt-4'>Patent Data</h1>
            <div className='flex flex-col'>
              <div>{patentData?.patent_title? patentData?.patent_title:"Loading Title..."}</div>
              <div>{patentData?.patent_id? patentData.patent_id:"Loading PatentID..."}</div>
              <div>{patentData?.examiners? patentData.examiners[0].examiner_last_name:"Loading Examiner..."}</div>
              <div>{patentData?.examiners? patentData.application.filing_date:"Loading FilingDate..."}</div>
              <div>{patentData?.applicants? patentData.applicants.applicant_organization:"Loading Applicant..."}</div>

            </div> */}
            </div>
          

    </div>
  )
}
