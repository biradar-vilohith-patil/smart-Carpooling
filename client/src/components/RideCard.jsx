import { Link } from 'react-router-dom';

const RideCard = ({ details }) => {
  return (
    <div className="border rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center">
        <div>
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const RideCard = ({details}) => {
  const {creator, origin, destination, startTime, endTime, price} = details;
  function getTime(dateTimeInput){
    const selectedDate = new Date(dateTimeInput);
    // Extract the time without seconds
    const hours = selectedDate.getHours();
    const minutes = selectedDate.getMinutes();
    // Format the time as HH:mm
    return `${hours}:${minutes}`;
  }

  return (
    <div className="container border rounded-md my-3 p-4 border-radius">
      <div className="relative border-s sm:mx-5">
        <div className="mx-5 mb-6 ms-4">
          <div className="absolute -z-0 w-3 h-3 bg-accent rounded-full mt-1.5 -start-1.5"></div>
          <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">{getTime(startTime)}</time>
          <h3 className="text-md md:text-lg font-semibold">{origin.place}</h3>
        </div>
        <div className="mx-5 mb-6 ms-4">
          <div className="absolute -z-0 w-3 h-3 bg-accent rounded-full mt-1.5 -start-1.5"></div>
          <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">{getTime(endTime)}</time>
          <h3 className="text-md md:text-lg font-semibold">{destination.place}</h3>
        </div>
        <h1 className="absolute -z-0 text-lg md:text-2xl font-bold top-0 right-0">₹{price} </h1>
      </div>
      <div>
        <div className="inline-flex items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>Profile</AvatarFallback>
          </Avatar>
          <span className="flex-grow flex flex-col pl-4">
            <span className="title-font font-medium">{creator.name}</span>
            <span className="text-muted-foreground text-xs tracking-widest mt-0.5">UI DEVELOPER</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default RideCard;
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
