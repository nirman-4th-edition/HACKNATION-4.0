import React, { useState } from 'react';
import { Search, Truck, AlertTriangle, FileText, Clock, DollarSign, ShoppingCart, X } from 'lucide-react';

const PharmacyMed = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [deliveryInfo, setDeliveryInfo] = useState({
        address: '',
        city: '',
        pincode: '',
        phone: ''
    });

    const medicines = [
        {
            id: 1,
            name: 'Paracetamol 500mg',
            category: 'Pain Relief',
            price: 50,
            stock: 50,
            manufacturer: 'GSK Healthcare',
            dosage: '1-2 tablets every 4-6 hours',
            description: 'For fever and mild to moderate pain relief',
            sideEffects: 'Nausea, liver problems with overdose',
            expiryDate: '2025-12',
            quantity: '15 tablets per strip',
            image: '/api/placeholder/150/150'
        },
        {
            id: 2,
            name: 'Amoxicillin 250mg',
            category: 'Antibiotics',
            price: 150,
            stock: 30,
            manufacturer: 'Cipla Ltd',
            dosage: '1 capsule three times daily',
            description: 'Broad-spectrum antibiotic for bacterial infections',
            sideEffects: 'Diarrhea, rash, nausea',
            expiryDate: '2025-06',
            quantity: '10 capsules per strip',
            image: '/api/placeholder/150/150'
        }
        // Add more medicines as needed
    ];

    // Cart functionality
    const addToCart = (medicine) => {
        const existingItem = cart.find(item => item.id === medicine.id);
        if (existingItem) {
            setCart(cart.map(item =>
                item.id === medicine.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...medicine, quantity: 1 }]);
        }
    };

    const removeFromCart = (medicineId) => {
        setCart(cart.filter(item => item.id !== medicineId));
    };

    const updateQuantity = (medicineId, newQuantity) => {
        if (newQuantity < 1) return;
        const medicine = medicines.find(m => m.id === medicineId);
        if (newQuantity > medicine.stock) return;
        
        setCart(cart.map(item =>
            item.id === medicineId
                ? { ...item, quantity: newQuantity }
                : item
        ));
    };

    // Persistent Cart Icon Component
    const PersistentCartIcon = () => (
        <div className="fixed bottom-20 md:bottom-24 right-4 md:right-8 z-40">
            <button
                onClick={() => setShowCart(true)}
                className="bg-blue-600 text-white p-3 rounded-full relative hover:bg-blue-700 shadow-lg"
            >
                <ShoppingCart className="w-6 h-6 md:w-8 md:h-8" />
                {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                        {cart.length}
                    </span>
                )}
            </button>
        </div>
    );
    

    // Enhanced Cart Modal
    const CartModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 text-blue-950">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={() => setShowCart(false)}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
                >
                    <X className="w-5 h-5" />
                </button>
                
                <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
                
                {cart.length === 0 ? (
                    <p className="text-gray-600">Your cart is empty</p>
                ) : (
                    <>
                        {cart.map(item => (
                            <div key={item.id} className="flex items-center gap-4 border-b py-4 text-blue-950">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                <div className="flex-1">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-gray-600">₹{item.price} per strip</p>
                                </div>
                                <div className="flex items-center gap-2 text-blue-950">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="px-2 py-1 border rounded hover:bg-gray-50"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="px-2 py-1 border rounded hover:bg-gray-50"
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-600 hover:text-red-800 flex items-center gap-1"
                                    >
                                        <X className="w-4 h-4" />
                                        <span className="text-sm">Remove</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                        
                        <div className="mt-6 text-blue-950">
                            <div className="flex justify-between font-semibold mb-4">
                                <span>Total:</span>
                                <span>₹{cart.reduce((total, item) => total + (item.price * item.quantity), 0)}</span>
                            </div>
                            <button
                                onClick={() => {
                                    setShowCart(false);
                                    setShowCheckout(true);
                                }}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );

    // Checkout Modal
    const CheckoutModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 text-blue-950">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={() => setShowCheckout(false)}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
                >
                    <X className="w-5 h-5" />
                </button>
                
                <h2 className="text-2xl font-bold mb-6">Checkout</h2>
                
                <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    alert('Order placed successfully!');
                    setCart([]);
                    setShowCheckout(false);
                }}>
                    <div>
                        <label className="block mb-1 font-medium text-blue-950">Delivery Address</label>
                        <textarea
                            required
                            className="w-full p-2 border rounded-lg"
                            value={deliveryInfo.address}
                            onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-blue-950">
                        <div>
                            <label className="block mb-1 font-medium text-blue-950">City</label>
                            <input
                                type="text"
                                required
                                className="w-full p-2 border rounded-lg"
                                value={deliveryInfo.city}
                                onChange={(e) => setDeliveryInfo({...deliveryInfo, city: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-blue-950">Pincode</label>
                            <input
                                type="text"
                                required
                                className="w-full p-2 border rounded-lg"
                                value={deliveryInfo.pincode}
                                onChange={(e) => setDeliveryInfo({...deliveryInfo, pincode: e.target.value})}
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block mb-1 font-medium text-blue-950">Phone Number</label>
                        <input
                            type="tel"
                            required
                            className="w-full p-2 border rounded-lg"
                            value={deliveryInfo.phone}
                            onChange={(e) => setDeliveryInfo({...deliveryInfo, phone: e.target.value})}
                        />
                    </div>
                    
                    <div className="border-t pt-4 mt-6 text-blue-950">
                        <div className="flex justify-between font-semibold mb-4">
                            <span>Total Amount:</span>
                            <span>₹{cart.reduce((total, item) => total + (item.price * item.quantity), 0)}</span>
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        >
                            Place Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    const categories = ['all', 'Pain Relief', 'Antibiotics', 'Antihistamines', 'Vitamins'];

    const filteredMedicines = medicines.filter(medicine => {
        const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            medicine.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="p-6 bg-white rounded-xl max-w-7xl mx-auto text-blue-950">
            <PersistentCartIcon />

            {/* Header */}
            <div className="mb-8 pr-16">
                <h1 className="text-3xl font-bold mb-2">Pharmacy Store</h1>
                <div className="flex items-center gap-2 text-blue-600">
                    <Truck className="w-5 h-5" />
                    <span>Free delivery on orders above ₹500</span>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="mb-8 space-y-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search medicines..."
                        className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                </div>

                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full capitalize ${
                                selectedCategory === category
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Medicine Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMedicines.map(medicine => (
                    <div key={medicine.id} className="border rounded-xl p-4 hover:shadow-lg transition-shadow">
                        <div className="flex gap-4 mb-4">
                            <img
                                src={medicine.image}
                                alt={medicine.name}
                                className="w-20 h-20 object-cover rounded-lg border"
                            />
                            <div className="flex-1">
                                <h3 className="font-bold text-lg">{medicine.name}</h3>
                                <p className="text-gray-600 text-sm">{medicine.manufacturer}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="font-bold">₹{medicine.price}</span>
                                    <span className="text-gray-500 text-sm">per strip</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm mb-4">
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-blue-600" />
                                <span>{medicine.description}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-blue-600" />
                                <span>Dosage: {medicine.dosage}</span>
                            </div>
                            {medicine.stock < 10 && (
                                <div className="flex items-center gap-2 text-yellow-600">
                                    <AlertTriangle className="w-4 h-4" />
                                    <span>Low stock: Only {medicine.stock} left</span>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => addToCart(medicine)}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            disabled={medicine.stock === 0}
                        >
                            {medicine.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                    </div>
                ))}
            </div>

            {showCart && <CartModal />}
            {showCheckout && <CheckoutModal />}
        </div>
    );
};

export default PharmacyMed;