import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Minus, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import OSMAutocomplete from "@/components/OSMAutocomplete";
import MapView from "@/components/MapView"; // <-- make sure MapView handles polyline drawing

const apiUri = import.meta.env.VITE_REACT_API_URI;

const formSchema = z.object({
  seat: z.number().min(1).max(10),
  price: z.number().nonnegative(),
  startTime: z.date().min(new Date()),
  endTime: z.date().min(new Date()),
});

const PublishCard = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      seat: 1,
      price: 0,
      startTime: new Date(),
      endTime: new Date(),
    },
  });

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null); // new state

  const onSubmit = async (data) => {
    if (!origin || !destination) {
      toast("Please select both origin and destination");
      return;
    }

    try {
      const body = {
        availableSeats: data.seat,
        origin: {
          place: origin.address,
          coordinates: [origin.lat, origin.lng],
        },
        destination: {
          place: destination.address,
          coordinates: [destination.lat, destination.lng],
        },
        startTime: data.startTime,
        endTime: data.endTime,
        price: data.price,
      };
      await axios.post(`${apiUri}/rides`, body, { withCredentials: true });
      toast("The ride has been created");
      form.reset();
      setOrigin(null);
      setDestination(null);
    } catch (error) {
      console.error("POST request failed:", error);
      toast("Something went wrong!");
    }
  };

  const useCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          address: "Your Location",
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setOrigin(coords);
        setCurrentLocation(coords); // save for map
      },
      (err) => {
        console.error("Geolocation error:", err);
        toast("Failed to get your location");
      }
    );
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create a Ride</CardTitle>
        <CardDescription>Publish your ride with just one click.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex gap-2 items-center">
            <OSMAutocomplete placeholder="Enter Origin" onSelect={setOrigin} />
            <Button type="button" variant="outline" onClick={useCurrentLocation}>
              Use My Location
            </Button>
          </div>
          <OSMAutocomplete placeholder="Enter Destination" onSelect={setDestination} />
        </div>

        {/* 👇 Map shows origin, destination, route, and user location */}
        <MapView origin={origin} destination={destination} currentLocation={currentLocation} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full items-center gap-4 mt-4">
            <div className="flex gap-24">
              <FormField
                control={form.control}
                name="seat"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Available seats</FormLabel>
                    <FormControl>
                      <div className="flex gap-2 items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          type="button"
                          onClick={() => field.value > 1 && field.onChange(field.value - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{field.value}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          type="button"
                          onClick={() => field.value < 10 && field.onChange(field.value + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Price"
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1.5">
                  <FormLabel>Departure Time</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      value={new Date(field.value).toISOString().slice(0, 16)}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1.5">
                  <FormLabel>Arrival Time</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      value={new Date(field.value).toISOString().slice(0, 16)}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Publish</Button>
          </form>
        </Form>
      </CardContent>
      <Toaster />
    </Card>
  );
};

export default PublishCard;
