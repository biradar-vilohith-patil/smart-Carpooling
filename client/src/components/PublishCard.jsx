import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Minus, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import LocationAutocomplete from "@/components/LocationAutocomplete";

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

  // 👇 NEW: Origin & Destination location objects
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

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
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create a Ride</CardTitle>
        <CardDescription>Publish your ride with just one click.</CardDescription>
      </CardHeader>

      <CardContent>
        <LocationAutocomplete placeholder="Enter origin" onSelect={setOrigin} />
        <LocationAutocomplete placeholder="Enter destination" onSelect={setDestination} />

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
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="Price" min="0" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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
                      value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ""}
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
                      value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ""}
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
