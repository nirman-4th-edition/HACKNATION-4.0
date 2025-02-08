import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FarmerCardProps {
  name: string;
  location: string;
  imageUrl: string;
  rating: number;
  specialties: string[];
  contractAvailable: boolean;
}

export const FarmerCard = ({
  name,
  location,
  imageUrl,
  rating,
  specialties,
  contractAvailable,
}: FarmerCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
        {contractAvailable && (
          <Badge className="absolute top-2 right-2 bg-forest text-white">
            Contract Available
          </Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-forest">{name}</CardTitle>
        <CardDescription>{location}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-2">
          <span className="text-yellow-500">{"★".repeat(rating)}</span>
          <span className="text-gray-400">{"★".repeat(5 - rating)}</span>
          <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {specialties.map((specialty) => (
            <Badge key={specialty} variant="outline" className="bg-forest-light/10">
              {specialty}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};