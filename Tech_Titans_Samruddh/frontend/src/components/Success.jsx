import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold text-green-600">Payment Successful! 🎉</h1>
                <p className="text-gray-700 mt-2">Thank you for your purchase.</p>
                <button
                    onClick={() => navigate("/marketplace")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Back to Marketplace
                </button>
            </div>
        </div>
    );
};

export default Success;