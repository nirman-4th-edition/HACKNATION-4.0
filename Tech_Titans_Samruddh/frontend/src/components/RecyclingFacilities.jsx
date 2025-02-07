import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "./Navbar";

const RecyclingFacilities = () => {
    const [location, setLocation] = useState(null);
    const [facilities, setFacilities] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setLocation(userLocation);
                    fetchRecyclingFacilities(userLocation);
                },
                () => {
                    setError("Geolocation not supported or permission denied");
                }
            );
        } else {
            setError("Geolocation is not supported by this browser");
        }
    }, []);

    const fetchRecyclingFacilities = async (userLocation) => {
        try {
            const response = await fetch(
                `http://localhost:8080/recycle?lat=${userLocation.lat}&lng=${userLocation.lng}`
            );
            const data = await response.json();
            console.log(data);
            if (data.results) {
                setFacilities(data.results);
            } else {
                setError("No recycling facilities found");
            }
        } catch (error) {
            setError("Failed to fetch recycling facilities");
        }
    };

    return (
        <>
            <Navbar />
            <div className="p-6 bg-gray-100 min-h-screen mt-24">
                <h1 className="text-3xl font-bold mb-4">Recycling Facilities</h1>
                <p className="mb-6 text-gray-600">
                    Locate nearby recycling centers to properly dispose of waste.
                </p>
                {error && <p className="text-red-500">{error}</p>}
                {location ? (
                    <MapContainer
                        center={[location.lat, location.lng]}
                        zoom={13}
                        className="h-96 w-full rounded-lg shadow-lg"
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[location.lat, location.lng]}>
                            <Popup>Your Location</Popup>
                        </Marker>
                        {facilities.map((facility, index) => (
                            <Marker
                                key={index}
                                position={[
                                    facility.geometry.location.lat,
                                    facility.geometry.location.lng,
                                ]}
                            >
                                <Popup>{facility.name}</Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                ) : (
                    <p>Fetching location...</p>
                )}
            </div>
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

export default RecyclingFacilities;