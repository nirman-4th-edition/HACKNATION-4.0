import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import NavMenuBar from "@/components/NavMenuBar";

const products = [
  { id: 1, name: "Organic Apples", price: "₹150/kg", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Fresh Carrots", price: "₹80/kg", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Natural Honey", price: "₹300/kg", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Organic Tomatoes", price: "₹100/kg", image: "https://via.placeholder.com/150" },
];

const ProductListing = () => {
  return (
    <>
      <NavMenuBar />
      <div className="min-h-screen bg-green-100">
        {/* Header */}
        <div className="text-center py-6">
          <h1  className="text-3xl font-bold">Farm Fresh Market</h1>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mt-6">
          <Input
            className="w-3/4 md:w-1/2 rounded-lg border-gray-300 shadow-sm"
            placeholder="Search for farm-fresh products..."
          />
        </div>

        {/* Product Display Section */}
        <div className="container mx-auto px-4 mt-8">
          <h2 className="text-xl font-bold mb-4">Available Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="shadow-md">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-t-lg" />
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-green-700 font-semibold">{product.price}</p>
                  <Button className="mt-2 bg-green-600 hover:bg-green-500 text-white w-full">
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListing;
