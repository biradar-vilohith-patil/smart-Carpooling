import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapPin, Clock, DollarSign, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RideDetail = () => {
  const { rideId } = useParams();
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_REACT_API_URI;

  useEffect(() => {
    const fetchRide = async () => {
      try {
        const res = await axios.get(`${apiUrl}/rides/${rideId}`, { withCredentials: true });
        setRide(res.data);
      } catch (err) {
        console.error("Error fetching ride details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRide();
  }, [rideId]);

  if (loading) return <div className="text-center mt-8">Loading ride details...</div>;
  if (!ride) return <div className="text-center mt-8">Ride not found.</div>;

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {ride.origin.place} ➔ {ride.destination.place}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center">
            <MapPin className="mr-2" />
            <span>From: {ride.origin.place}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2" />
            <span>To: {ride.destination.place}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2" />
            <span>Departure Time: {new Date(ride.startTime).toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2" />
            <span>Arrival Time: {new Date(ride.endTime).toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <User className="mr-2" />
            <span>Available Seats: {ride.availableSeats}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="mr-2" />
            <span>Price per seat: ₹{ride.price}</span>
          </div>

          {/* 🚗 Book Seat Button */}
          <div className="flex justify-center mt-6">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg"
              onClick={() => alert('Seat booked successfully! 🚗')}
            >
              Book Seat
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RideDetail;
