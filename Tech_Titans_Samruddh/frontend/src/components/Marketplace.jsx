import React, { useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Marketplace = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("");
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const handleSearch = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleAddToCart = (product) => {
        setCart([...cart, product]);
    };

    const handleRemoveFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const handleCheckout = () => {
        navigate('/checkout', { state: { cart } });
    };

    const products = [
        {
            id: 1,
            name: "Recycled Concrete",
            description: "High-quality recycled concrete, ideal for construction foundations and pathways.",
            price: "50 per ton",
            category: "Concrete",
            image: "/ScrapMetal.jpg",
        },
        {
            id: 2,
            name: "Recycled Timber",
            description: "Sustainably sourced timber perfect for construction or furniture.",
            price: "75 per cubic meter",
            category: "Timber",
            image: "/RecyledBricks.jpg",
        },
        {
            id: 3,
            name: "Recycled Steel",
            description: "Durable and affordable recycled steel for construction projects.",
            price: "150 per ton",
            category: "Steel",
            image: "/RecycledTiles.jpg",
        },
        {
            id: 4,
            name: "Recycled Steel",
            description: "Durable and affordable recycled steel for construction projects.",
            price: "150 per ton",
            category: "Steel",
            image: "/RecycledStone.jpg",
        },
        {
            id: 5,
            name: "Recycled Steel",
            description: "Durable and affordable recycled steel for construction projects.",
            price: "150 per ton",
            category: "Steel",
            image: "/RecycledPlastic.jpg",
        },
        {
            id: 6,
            name: "Recycled Steel",
            description: "Durable and affordable recycled steel for construction projects.",
            price: "150 per ton",
            category: "Steel",
            image: "/RecycledInsulationMaterials.jpg",
        },
        {
            id: 7,
            name: "Recycled Steel",
            description: "Durable and affordable recycled steel for construction projects.",
            price: "150 per ton",
            category: "Steel",
            image: "/RecycledBrick.jpg",
        },
        {
            id: 8,
            name: "Recycled Steel",
            description: "Durable and affordable recycled steel for construction projects.",
            price: "150 per ton",
            category: "Steel",
            image: "/RecycledAsphalt.jpg",
        },
        {
            id: 9,
            name: "Recycled Steel",
            description: "Durable and affordable recycled steel for construction projects.",
            price: "150 per ton",
            category: "Steel",
            image: "/MetalRoofing.jpg",
        },
        {
            id: 10,
            name: "Recycled Steel",
            description: "Durable and affordable recycled steel for construction projects.",
            price: "150 per ton",
            category: "Steel",
            image: "/CrushedConcrete.jpg",
        },
        {
            id: 11,
            name: "Recycled Steel",
            description: "Durable and affordable recycled steel for construction projects.",
            price: "150 per ton",
            category: "Steel",
            image: "/ConcreteBlocks.jpg",
        },
    ];

    const filteredProducts = products.filter(
        (product) => product.name.toLowerCase().includes(searchQuery) && (filter === "" || product.category === filter)
    );

    return (
        <>
            <Navbar />
            <section className="bg-gray-200 text-gray-900 pt-24 pb-10 min-h-screen">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-10">Marketplace</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                                    <p className="text-gray-900 font-bold mb-4">${product.price} per unit</p>
                                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {cart.length > 0 && (
                        <div className="mt-10 bg-white p-6 rounded shadow">
                            <h2 className="text-3xl font-bold mb-6">Cart</h2>
                            <ul className="space-y-4">
                                {cart.map((item) => (
                                    <li key={item.id} className="flex items-center justify-between border-b pb-2">
                                        <span className="font-semibold">{item.name} - ${item.price}</span>
                                        <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                                    </li>
                                ))}
                            </ul>
                            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mt-4" onClick={handleCheckout}>Checkout</button>
                        </div>
                    )}
                </div>
            </section>
            <footer className="bg-gray-800 text-white py-10">
                <div className="container mx-auto text-center">

                    <div className="mb-4">
                        <p>Contact us: info@cdwastemanagement.com</p>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <a href="#" className="hover:underline">Facebook</a>
                        <a href="#" className="hover:underline">Twitter</a>
                        <a href="#" className="hover:underline">LinkedIn</a>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Marketplace;