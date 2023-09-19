import fenixLogo from './assets/fenixAI.png'
import { SearchBar } from './components/Searchbar'
import { SearchResultsList } from './components/SearchResultsList'
import { useState } from 'react'
import './App.css'


function App() {
  const [results, setResults]=  useState([]);
  return (
    <div className='flex flex-col items-center gap-12 justify-between'>
        
        <a href="https://fenix.ai" target="_blank" rel="noreferrer">
          <img src={fenixLogo} className="logo fixed bottom-0 right-0" alt="fenixAI logo" />
        </a>

        <h1 className='text-3xl font-bold text-orange-50'>FenixAI</h1>
            
       <div>
        <SearchBar setResults={setResults}/>
        <SearchResultsList results={results}/>
       </div>
       
        

    </div>
  )
}

export default App
