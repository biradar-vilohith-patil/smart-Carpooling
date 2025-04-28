import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Search from "@/components/Search";
import Sidebar from "@/components/Sidebar";
import RideCard from "@/components/RideCard";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { SlidersHorizontal, MoveRight } from "lucide-react";
import axios from "axios";

const SearchPage = () => {
  const { search } = useLocation();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const queryParams = new URLSearchParams(search);
  const from = queryParams.get("from");
  const to = queryParams.get("to");
  const date = queryParams.get("date");

  useEffect(() => {
    const fetchRides = async () => {
      if (!from || !to || !date) {
        setError(true);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_API_URI}/rides/find`, {
          params: {
            origin: from,
            destination: to,
            time: date,
          },
          withCredentials: true,
        });
        setRides(res.data.rides);
        setError(false);
      } catch (err) {
        console.error("Error fetching rides:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, [from, to, date]);

  return (
    <main>
      <div className="z-10 flex justify-center items-center border-b bg-background p-8">
        <Search />
        <Dialog>
          <DialogTrigger className="md:hidden border border-lg p-2 bg-background absolute right-0">
            <SlidersHorizontal />
          </DialogTrigger>
          <DialogContent>
            <Sidebar />
          </DialogContent>
        </Dialog>
      </div>

      <div className="container p-0 max-w-screen-xl grid md:grid-cols-5">
        <div className="hidden md:block">
          <div className="sticky top-16">
            <Sidebar />
          </div>
        </div>

        <div className="col-span-3 py-6 md:col-span-4 lg:border-l">
          <div className="container">
            {loading && (
              <>
                <Skeleton className="h-[200px] w-full my-3 p-4 rounded-xl" />
                <Skeleton className="h-[200px] w-full my-3 p-4 rounded-xl" />
              </>
            )}
            {!loading && error && (
              <h3 className="text-red-600 text-xl font-semibold">
                Error loading rides. Please try again.
              </h3>
            )}
            {!loading && !error && (
              <>
                <h3>
                  {from} <MoveRight className="inline-block" /> {to}
                </h3>
                <h3>{rides.length} rides available</h3>
                {rides.length === 0 ? (
                  <h3 className="text-xl font-semibold">
                    No rides available based on your search criteria.
                  </h3>
                ) : (
                  rides.map((ride) => (
                    <Link key={ride._id} to={`/ride/${ride._id}`}>
                      <RideCard details={ride} />
                    </Link>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
