import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/products";
function SearchBar() {
    const [searchInput,setSearchInput] = useState("");
    const [select,setSelect] = useState("All")
    const products = useSelector(state => state.products.products)
    const dispatch = useDispatch();
    const categories = new Set();
    if (!products) return null;
    const values = Object.values(products)
    values.forEach(product => categories.add(product.category))
    const options= [...categories].map(category => {
        return {value:category,label:category}
    })
    console.log(options);

    const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    };

    const handleSelectChange = (e) => {
        e.preventDefault();
        setSelect(e.target.value);
        };

    const handleClick= (e) => {
        e.preventDefault();
    }


    return (
        <div>
            <select value={select} onChange={handleSelectChange}>
            <option value='all'>All</option>
                {
                    [...categories].map(category => (
                        <option value={category}>{category}</option>
                    ))
                }
            </select>
            <input
                type="text"
                placeholder="Search Parmazon"
                onChange={handleChange}
                value={searchInput}
            />
            <button onClick={handleClick}><i className="fa-solid fa-magnifying-glass"/></button>
        </div>

    )
}

export default SearchBar
