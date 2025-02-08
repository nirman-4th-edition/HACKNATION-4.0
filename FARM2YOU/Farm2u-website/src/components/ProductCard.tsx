import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  name: string;
  price: number;
  unit: string;
  imageUrl: string;
  farmerName: string;
  isContract: boolean;
  availableDate?: string;
}

export const ProductCard = ({
  name,
  price,
  unit,
  imageUrl,
  farmerName,
  isContract,
  availableDate,
}: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
        {isContract && (
          <Badge className="absolute top-2 right-2 bg-forest text-white">
            Contract Farming
          </Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-forest">{name}</CardTitle>
        <CardDescription>by {farmerName}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-2xl font-bold text-forest">₹{price}</span>
          <span className="text-gray-600">/{unit}</span>
        </div>
        {isContract && availableDate && (
          <p className="text-sm text-gray-600 mb-4">
            Expected harvest: {availableDate}
          </p>
        )}
        <Button className="w-full bg-forest hover:bg-forest-light">
          {isContract ? "Book Contract" : "Buy Now"}
        </Button>
      </CardContent>
    </Card>
  );
};