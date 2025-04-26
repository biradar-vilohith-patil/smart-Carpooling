import { useState } from "react";
import RideCard from '@/components/RideCard';
import Search from '@/components/Search';
import Sidebar from '@/components/Sidebar';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import useFetch from '@/hooks/useFetch';
import { MoveRight, SlidersHorizontal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const SearchPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const from = params.get("from");
  const to = params.get("to");
  const date = params.get("date");
  const seat = params.get("seat");

  const [triggerSearch, setTriggerSearch] = useState(false);

  // Only trigger search if valid query params
  const { loading, data, error } = (from && to && date)
    ? useFetch(`rides/find?origin=${from}&destination=${to}&time=${date}`, false)
    : { loading: false, data: null, error: false };

  const rides = data?.rides || [];

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

            {!loading && error && (from && to && date) && (
              <h3 className="text-red-600 text-xl font-semibold">
                Error loading rides. Please try again.
              </h3>
            )}

            {!loading && !error && (from && to && date) && (
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
