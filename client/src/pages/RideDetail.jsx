import { useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import { Skeleton } from "@/components/ui/skeleton";

const RideDetails = () => {
  const { id } = useParams();
  const { loading, data, error } = useFetch(`rides/${id}`);

  if (loading) {
    return (
      <div className="p-6">
        <Skeleton className="h-6 w-1/2 mb-4" />
        <Skeleton className="h-6 w-1/3 mb-4" />
        <Skeleton className="h-6 w-1/4" />
      </div>
    );
  }

  if (error || !data) {
    return <div className="p-6 text-red-600 font-semibold">Error fetching ride details. Please try again later.</div>;
  }

  const ride = data.ride;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{ride.origin} ➔ {ride.destination}</h1>
      <p className="text-lg mb-2">Departure: {new Date(ride.departureTime).toLocaleString()}</p>
      <p className="text-lg mb-2">Arrival: {new Date(ride.arrivalTime).toLocaleString()}</p>
      <p className="text-lg mb-2">Available Seats: {ride.availableSeats}</p>
      <p className="text-lg mb-4">Price per seat: ₹{ride.price}</p>

      <div className="flex gap-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded">
          Join Ride
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded">
          Book Seats
        </button>
      </div>
    </div>
  );
};

export default RideDetails;
