import { useState } from "react";
import { Link } from "react-router-dom";
import { getDocs, query, where, collection } from 'firebase/firestore';
import { db } from '../../firebase/fbInstance';
import "./community.css"

function Search(){
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>([]);

  const fetchPostsByTitle = async (searchQuery: string) => {
    const postsRef = collection(db, 'post');
    const querySnapshot = await getDocs(query(postsRef, where('title', '>=', searchQuery)));
  
    const searchResults = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    return searchResults;
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();

    if (!searchQuery) {
      return;
    }

    const results = await fetchPostsByTitle(searchQuery);
    setSearchResults(results);
    setSearchQuery('');
  };

  const filterSearchResults = (searchResults: any[], query: string) => {
    return searchResults.filter((result: any) =>
      result.title.toLowerCase().includes(query.toLowerCase())
    );
  };
  
  const filteredResults = filterSearchResults(searchResults, searchQuery);

  return (
    <>
      <form onSubmit={handleSearch} className='searchForm'>
        <label id="search" className="searchlabel">검색</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="제목을 검색하세요"
          id="search"
          className="serchBar"
        />
        <button type="submit" className="searchBtn">검색</button>
      </form>

      {filteredResults.length > 0 && (
        <div className="searchResultCon">
          <h3>검색결과</h3>
          {filteredResults.map((result: any) => (
            <div key={result.id} className='searchResultdiv'>
              <Link to={`/content/${result.id}`}>{result.title}</Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export default Search