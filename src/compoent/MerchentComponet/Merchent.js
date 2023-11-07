import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Merchent.css";
import Logout from "../logout/Logout";

const Merchant = ({ userData }) => {
    const [productData, setProductData] = useState({
        productName: "",
        price: "",
        catgory: "electronics", // Initialize with a default value
        subcatgory: "tshirt", // Initialize with a default value
    });

    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleAddProduct = async () => {
        try {
            const response = await axios.post("https://mernbackend-gvrq.onrender.com/addproduct", {
                ...productData,
                productAddBy: userData.username,
            });

            if (response.status === 201) {
                alert("Product added successfully!");
                setProductData({
                    productName: "",
                    price: "",
                    catgory: "electronics",
                    subcatgory: "tshirt",
                });
            } else {
                alert("Failed to add the product.");
            }
        } catch (error) {
            console.error("Product creation error:", error);
            alert(
                "Failed to add the product. Please check your information and try again."
            );
        }
    };

    const handleUpdateProduct = async () => {
        try {
            const response = await axios.patch(
                "https://mernbackend-gvrq.onrender.com/updateproduct",
                {
                    productName: productData.productName,
                    price: productData.price,
                    catgory: productData.catgory,
                    subcatgory: productData.subcatgory,
                    id: selectedProductId,
                }
            );

            if (response.status === 200) {
                alert("Product updated successfully!");
                setProductData({
                    productName: "",
                    price: "",
                    catgory: "electronics",
                    subcatgory: "tshirt",
                });
                setSelectedProductId(null);
            } else {
                alert("Failed to update the product.");
            }
        } catch (error) {
            console.error("Product update error:", error);
            alert(
                "Failed to update the product. Please check your information and try again."
            );
        }
    };

    useEffect(() => {
        // Fetch the products created by the merchant
        const fetchMerchantProducts = async () => {
            try {
                const response = await axios.get(
                    `https://mernbackend-gvrq.onrender.com/products/${userData.username}`
                );
                if (response.status === 200) {
                    setProducts(response.data.data);
                } else {
                    alert("Failed to fetch merchant products.");
                }
            } catch (error) {
                console.error("Product fetch error:", error);
                alert("Failed to fetch merchant products.");
            }
        };

        fetchMerchantProducts();
    }, [userData.username, productData]);

    const handleEditProduct = (productId) => {
        // Set the selected product for editing
        const selectedProduct = products.find(
            (product) => product._id === productId
        );
        setProductData({
            productName: selectedProduct.productName,
            price: selectedProduct.price,
            catgory: selectedProduct.catgory,
            subcatgory: selectedProduct.subcatgory,
        });
        setSelectedProductId(productId);
    };

    return (
        <div className="main-div">
            <div className="form-container">
                <div className="titel">
                    <h2>Welcome, {userData.username} (Merchant)</h2>
                    <Logout />
                </div>
                <h3>Add a New Product</h3>
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="productName"
                        value={productData.productName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <select
                        name="catgory"
                        value={productData.catgory}
                        onChange={handleChange}
                    >
                        <option value="electronics">Electronics</option>
                        <option value="cloths">Cloths</option>
                        <option value="decoration">Decoration</option>
                        <option value="jewelry">Jewelry</option>

                    </select>
                </div>
                <div>
                    <label>Subcategory:</label>
                    <select
                        name="subcatgory"
                        value={productData.subcatgory}
                        onChange={handleChange}
                    >
                        <option value="tshirt">T-shirt</option>
                        <option value="pants">Pants</option>
                        <option value="home Accessories">Home Accessories</option>
                        <option value="ring">Ring</option>
                        <option value="mobile">mobile</option>
                        <option value="tv">tv</option>
                        <option value="laptop">laptop</option>
                        <option value="earbuds">earbuds</option>




                    </select>
                </div>
                <button onClick={handleAddProduct}>Add Product</button>
            </div>

            <h3>Update Product</h3>
            {selectedProductId ? (
                <div>
                    <button onClick={() => setSelectedProductId(null)}>
                        Cancel Update
                    </button>
                    <div>
                        <label>Product Name:</label>
                        <input
                            type="text"
                            name="productName"
                            value={productData.productName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type="text"
                            name="price"
                            value={productData.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Category:</label>
                        <select
                            name="catgory"
                            value={productData.catgory}
                            onChange={handleChange}
                        >
                            <option value="electronics">Electronics</option>
                            <option value="cloths">Cloths</option>
                            <option value="decoration">Decoration</option>
                            <option value="jewelry">Jewelry</option>
                        </select>
                    </div>
                    <div>
                        <label>Subcategory:</label>
                        <select
                            name="subcatgory"
                            value={productData.subcatgory}
                            onChange={handleChange}
                        >
                            <option value="tshirt">T-shirt</option>
                            <option value="pants">Pants</option>
                            <option value="home Accessories">Home Accessories</option>
                            <option value="ring">Ring</option>
                            <option value="mobile">mobile</option>
                            <option value="tv">tv</option>
                            <option value="laptop">laptop</option>
                            <option value="earbuds">earbuds</option>
                        </select>
                    </div>
                    <button onClick={handleUpdateProduct}>Update Product</button>
                </div>
            ) : (
                <p>Select a product to update</p>
            )}

            <h3>Products Created by You</h3>
            <ul>
                {products.map((product) => (
                    <li key={product._id} className="product-card">
                        <h1 className="product-name">
                            Product Name: {product.productName}
                        </h1>
                        <p className="product-price">Price: ${product.price}</p>
                        <p className="product-category">Category: {product.catgory}</p>
                        <p className="product-category">
                            Subcategory: {product.subcatgory}
                        </p>
                        <button
                            className="edit-button"
                            onClick={() => handleEditProduct(product._id)}
                        >
                            Edit
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Merchant;
