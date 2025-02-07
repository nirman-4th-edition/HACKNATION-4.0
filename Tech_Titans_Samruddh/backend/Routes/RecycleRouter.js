import e from "express";

const router = e.Router();
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY; 
router.get("/", async (req, res) => {
    try {
        const { lat, lng } = req.query;
        const radius = 5000; // 5km search radius
        const type = "recycling"; // Place type

        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${GOOGLE_PLACES_API_KEY}`;
        
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching recycling facilities:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

export default router;