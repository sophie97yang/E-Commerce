import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import {useHistory} from 'react-router-dom';
// import { getAllProducts } from "../../store/products";
function SearchBar() {
    const [searchInput,setSearchInput] = useState("");
    const [select,setSelect] = useState("All");
    const products = useSelector(state => state.products.products);
    const [searchResults,setResults] = useState(products ? Object.values(products):null);
    const [hidden,setHidden] = useState(true);
    // const dispatch = useDispatch();
    const history = useHistory();


    useEffect(()=> {
        if (searchInput.length===0 && products) {
            if (select.toLowerCase()!=='all') {
                setResults(Object.values(products))
            } else {
                setResults(Object.values(products).filter(product=>product.category===select))
            }
            setHidden(true);
    }
    },[searchInput])


    const categories = new Set();
    if (!products) return null;
    const values = Object.values(products)
    values.forEach(product => categories.add(product.category))
    const options= [...categories].map(category => {
        return {value:category,label:category}
    })


    const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    setHidden(false);

    if (select.toLowerCase()!=='all') {
        setResults(Object.values(products).filter(product => product.category === select && product.name.toLowerCase().includes(searchInput.toLowerCase())))
    } else {
        setResults(Object.values(products).filter(product=>product.name.toLowerCase().includes(searchInput.toLowerCase())))
    }
    };

    const handleSelectChange = (e) => {
        e.preventDefault();
        setSelect(e.target.value);
        };

    const handleClick= (e) => {
        e.preventDefault();
        setHidden(true);
        history.push(`/search/${select}&${searchInput.length ? searchInput.split(' ').join(','): ' '}`);
        setSearchInput('');
        setSelect('All');
    }


    return (
        <div>
        <div className='search_bar'>
            <select value={select} onChange={handleSelectChange} id='select-search'>
            <option value='All'>All</option>
                {
                    [...categories].map(category => (
                        <option value={category} key={category}>{category}</option>
                    ))
                }
            </select>
            <input
                type="text"
                placeholder="Search Parmazon"
                onChange={handleChange}
                value={searchInput}
            />
            <button className="searchBarButton" onClick={handleClick}><i className="fa-solid fa-magnifying-glass"/></button>
        </div>

        <ul className={hidden ? 'hidden':'search_results'}>
            {searchResults?.map((result) => (
                <button key={result.id} className='search-list-item'
                onClick={(e)=>{
                    e.preventDefault();
                    setHidden(true);
                    history.push(`/products/${result.id}`);
                    setSearchInput('');
                    setSelect('All');
                } }
                >{result.name}</button>
            ))}

        </ul>
        </div>

    )
}

export default SearchBar
