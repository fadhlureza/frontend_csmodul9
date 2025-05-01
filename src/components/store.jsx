import React, { useState, useEffect } from 'react';
import axios from 'axios';
    
const Store = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllItems = async () => {
            try {
                setLoading(true);
                console.log('API URL:', import.meta.env.VITE_API_URL); // Debug URL
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/item`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log('API Response:', response.data); // Debug response
                if (response.data && response.data.payload) {
                    setProducts(response.data.payload.slice(0, 8));
                } else {
                    console.error("Unexpected API response format:", response.data);
                }
            } catch (error) {
                console.error("Error fetching item:", error.response || error);
            } finally {
                setLoading(false);
            }
        };

        getAllItems();
    }, []);

    return (
        <div className="store-container">
            <h1>Our Products</h1>
            {loading && <p>Loading...</p>}
            <div className="products-grid">
                {products && products.length > 0 ? (
                    products.map((item) => (
                            <div key={item.id} className="product-card">
                                <h3>{item.name}</h3>
                                <p className="price">Rp {item.price}</p>
                                <p className="description">{item.description}</p>
                            </div>
                    ))
                ) : (
                    !loading && <p>No items found</p>
                )}
            </div>
        </div>
    );
};

export default Store;
