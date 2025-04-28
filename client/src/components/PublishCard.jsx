import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import OSMAutocomplete from "@/components/OSMAutocomplete";
import MapView from "@/components/MapView"; // if you have map feature
import axios from "axios";
import { Minus, Plus } from "lucide-react";

const apiUri = import.meta.env.VITE_REACT_API_URI;

const formSchema = z.object({
  seat: z.number().min(1).max(10),
  price: z.number().nonnegative(),
  startTime: z.date().min(new Date()),
  endTime: z.date().min(new Date())
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

  const onSubmit = async (data) => {
    if (!origin || !destination) {
      toast.error("Please select both Origin and Destination!");
      return;
    }

    try {
      const body = {
        availableSeats: data.seat,
        origin: {
          place: origin.address,
          coordinates: [origin.lat, origin.lng]
        },
        destination: {
          place: destination.address,
          coordinates: [destination.lat, destination.lng]
        },
        startTime: data.startTime,
        endTime: data.endTime,
        price: data.price
      };

      await axios.post(`${apiUri}/rides`, body, { withCredentials: true });

      toast.success("Ride published successfully!");
      form.reset();
      setOrigin(null);
      setDestination(null);
    } catch (error) {
      console.error("Ride publish failed:", error);
      toast.error("Failed to publish ride. Try again.");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Offer a Ride</CardTitle>
        <CardDescription>Share your ride with others!</CardDescription>
      </CardHeader>
      <CardContent>

        {/* Location Inputs */}
        <div className="space-y-2 mb-4">
          <OSMAutocomplete placeholder="Enter Origin" onSelect={(selected) => setOrigin(selected)} />
          <OSMAutocomplete placeholder="Enter Destination" onSelect={(selected) => setDestination(selected)} />
        </div>

        {/* Show Map Preview if Needed */}
        {origin && destination && (
          <div className="my-4">
            <MapView origin={[origin.lat, origin.lng]} destination={[destination.lat, destination.lng]} />
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">

            {/* Seat Count */}
            <div className="flex gap-6">
              <FormField
                control={form.control}
                name="seat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Seats</FormLabel>
                    <FormControl>
                      <div className="flex gap-2 items-center">
                        <Button variant="outline" size="icon" type="button" onClick={() => field.value > 1 && field.onChange(field.value - 1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{field.value}</span>
                        <Button variant="outline" size="icon" type="button" onClick={() => field.value < 10 && field.onChange(field.value + 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Price"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Departure Time */}
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departure Time</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ""}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Arrival Time */}
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Arrival Time</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ""}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button type="submit" className="w-full">Publish Ride</Button>
          </form>
        </Form>

      </CardContent>
      <Toaster />
    </Card>
  );
};

export default PublishCard;
