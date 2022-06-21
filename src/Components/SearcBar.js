import "../App.css";

import React,{useEffect, useState} from "react";

import Book from "./Book";
import { Link } from "react-router-dom";
import { search } from "../BooksAPI";

const SearcBar = (props) => {
  let [query, setQuery] = useState("")
  let [searchResults,setSearchResults] = useState([])

  useEffect(() => {
    let isActive = true
    if(query.trim()){
      search(query).then(result =>{
        if (result.error) console.log(result);
        else{
          if(isActive){
            let filteredResult = result.filter(
              result => result.title.toLowerCase().includes(query))
            setSearchResults(filteredResult)
          }
          
        }
      })
    }

    return () => {
      isActive = false
      setSearchResults([])
    }
   
  }, [query])
  
  
  


  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/">
          <button className="close-search">Close</button>
        </Link>

        <div className="search-books-input-wrapper">
          <input type="text"
           placeholder="Search by title or author"
           value={query}
           onChange={(e)=>setQuery(e.target.value)} />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults&&
          searchResults.length > 0 &&
          searchResults.map(book => (
            <li key={book.id}>
            <Book selectedbook={book}/></li>
          ))}
        </ol>
      </div>
    </div>
  );
};


export default SearcBar;
