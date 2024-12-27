import Flight from "@/types/Flight";
import { extractDateAndTime } from "@/utils/util";
import React from "react";

const CheckFlight = ({ item }: { item: Flight }) => {
  const departure_time = extractDateAndTime(
    item?.outbound_flight.departure_time
  );
  const arrival_time = extractDateAndTime(item?.outbound_flight.arrival_time);
  function subtractTimeStrings(
    time1: string,
    time2: string
  ): { hours: number; minutes: number } {
    // Convert 24-hour time string to Date object
    const parseTime = (time: string): Date => {
      const [hours, minutes] = time.split(":").map(Number);
      return new Date(
        `1970-01-01T${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:00`
      );
    };

    const date1 = parseTime(time1);
    const date2 = parseTime(time2);

    // Calculate time difference in milliseconds
    const diffInMs = Math.abs(date1.getTime() - date2.getTime());
    const totalMinutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return { hours, minutes };
  }

  function getSubtractTime(arrival_time: string, departure_time: string) {
    // Get the time difference between arrival and departure
    const { hours, minutes } = subtractTimeStrings(
      arrival_time,
      departure_time
    );
    return `${hours}h ${minutes}m`;
  }

  function getDuration(
    start: string | undefined,
    end: string | undefined
  ): string {
    if (!start || !end) return "0";
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    // Calculate the difference in milliseconds
    const diffInMs = endDate.getTime() - startDate.getTime();

    // Convert milliseconds to total minutes
    const totalMinutes = Math.floor(diffInMs / (1000 * 60));

    // Extract hours and minutes
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    // Return the formatted result
    return `${hours}h ${minutes}m `;
  }

  // Example usage
  const startTime = "2024-12-25T06:00:00Z";
  const endTime = "2024-12-25T10:00:00Z";
  const result = getDuration(startTime, endTime);

  console.log(result); // Output: "4h0"

  return (
    <div className="w-[100%] pr-4 mt-6 flex gap-x-20">
      <div className="flex">
        <div className="w-full">
          <p className="paragraph-semibold">
            {" "}
            {departure_time?.time} - {arrival_time?.time}{" "}
          </p>
          <p className="text-gray-400 regular">
            {item?.outbound_flight.airline.name}
          </p>
        </div>
      </div>
      <div>
        <h6 className="paragraph-semobold text-gray-700">
          {getDuration(departure_time?.time, arrival_time?.time)}
        </h6>
        <p className="text-gray-400 regular">
          {item?.outbound_flight.departure_airport.code}
        </p>
      </div>
    </div>
  );
};

export default CheckFlight;
