import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, User, DollarSign, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const RideCard = ({ details }) => {
  return (
    <Card className="w-full my-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">{details.origin} ➔ {details.destination}</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <MapPin className="mr-2" />
          <span>From: {details.origin}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="mr-2" />
          <span>To: {details.destination}</span>
        </div>
        <div className="flex items-center">
          <Clock className="mr-2" />
          <span>Departure: {new Date(details.departureTime).toLocaleString()}</span>
        </div>
        <div className="flex items-center">
          <Clock className="mr-2" />
          <span>Arrival: {new Date(details.arrivalTime).toLocaleString()}</span>
        </div>
        <div className="flex items-center">
          <User className="mr-2" />
          <span>Seats Available: {details.availableSeats}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="mr-2" />
          <span>Price: ₹{details.price}</span>
        </div>
      </CardContent>

      <div className="flex justify-end p-4">
        <Link to={`/ride/${details._id}`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded flex items-center">
            Join Now
            <ArrowRight className="ml-2" />
          </button>
        </Link>
      </div>
    </Card>
  );
};

export default RideCard;
