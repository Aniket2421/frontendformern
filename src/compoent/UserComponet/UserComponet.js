import React, { useState, useEffect } from "react";
import axios from "axios";
import Logout from "../logout/Logout";

const UserComponent = ({ userData }) => {
    const [products, setProducts] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        catgory: "",
        subcatgory: "",
        priceSort: false,
        sortOrder: "ascending",
    });
    const [filtersApplied, setFiltersApplied] = useState(false);

    useEffect(() => {
        // Load all products when the component mounts
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        try {
            const response = await axios.get("https://mernbackend-gvrq.onrender.com/allproducts");
            if (response.status === 200) {
                setProducts(response.data.data);
            } else {
                alert("Failed to fetch products.");
            }
        } catch (error) {
            console.error("Product fetch error:", error);
            alert("Failed to fetch products.");
        }
    };

    const applyFilters = async () => {
        try {
            const response = await axios.get(
                "https://mernbackend-gvrq.onrender.com/filteredproducts",
                {
                    params: filterOptions,
                }
            );
            if (response.status === 200) {
                setFiltersApplied(true);
                setProducts(response.data.data);
            } else {
                alert("Failed to fetch products based on filters.");
            }
        } catch (error) {
            console.error("Product filter error:", error);
            alert("Failed to fetch products based on filters.");
        }
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            setFilterOptions({
                ...filterOptions,
                [name]: e.target.checked,
            });
        } else {
            setFilterOptions({
                ...filterOptions,
                [name]: value,
            });
        }
    };
    const clearFilters = () => {
        setFilterOptions({
            catgory: "",
            subcatgory: "",
            priceSort: false,
            sortOrder: "ascending",
        });
        setFiltersApplied(false);
        fetchAllProducts(); // Reload all products
    };

    return (
        <div className="main-div">
            <div className="form-container">
                <div className="titel">
                    <h2>Welcome, {userData.username} (User)</h2>
                    <Logout />

                </div>
                <h3>Filter Products</h3>
                <div>
                    <label>Category:</label>
                    <select
                        name="catgory"
                        value={filterOptions.catgory}
                        onChange={handleChange}
                    >
                        <option value="electronics">Electronics</option>
                        <option value="cloths">Cloths</option>
                        <option value="decoration">Decoration</option>
                        <option value="jewellry">jewellry</option>

                    </select>
                </div>
                <div>
                    <label>Subcategory:</label>
                    <select
                        name="subcatgory"
                        value={filterOptions.subcatgory}
                        onChange={handleChange}
                    >
                        <option value="tshirt">Tshirt</option>
                        <option value="pants">Pants</option>
                        <option value="home Acessories">home Acessories</option>
                        <option value="ring">Ring</option>
                        <option value="mobile">mobile</option>
                        <option value="tv">tv</option>
                        <option value="laptop">laptop</option>
                        <option value="earbuds">earbuds</option>

                    </select>

                </div>
                <div>
                    <label>Sort by Price:</label>
                    <input
                        type="checkbox"
                        name="priceSort"
                        checked={filterOptions.priceSort}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Sort Order:</label>
                    <select
                        name="sortOrder"
                        value={filterOptions.sortOrder}
                        onChange={handleChange}
                    >
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                </div>
                <button onClick={applyFilters}>Apply Filters</button>
            </div>

            <h3>Available Products</h3>
            {filtersApplied && <button onClick={clearFilters}>Clear Filters</button>}

            <ul>
                {products.map((product) => (
                    <li key={product._id} className="product-card">
                        <h1 className="product-name">Product Name: {product.productName}</h1>
                        <p className="product-price">Price: ${product.price}</p>
                        <p className="product-category">Category: {product.catgory}</p>
                        <p className="product-category">Subcategory: {product.subcatgory}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserComponent;
