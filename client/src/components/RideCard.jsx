import { Link } from 'react-router-dom';

const RideCard = ({ details }) => {
  return (
    <div className="border rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">
            {details.origin} ➔ {details.destination}
          </h3>
          <p className="text-gray-600">Departure: {new Date(details.departureTime).toLocaleString()}</p>
          <p className="text-gray-600">Price per seat: ₹{details.price}</p>
          <p className="text-gray-600">Available Seats: {details.availableSeats}</p>
        </div>
        <div className="flex flex-col gap-2">
          <Link
            to={`/ride/${details._id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded text-center"
          >
            Join Ride
          </Link>
          <Link
            to={`/ride/${details._id}`}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded text-center"
          >
            Book Seats
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RideCard;
