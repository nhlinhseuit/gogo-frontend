import React, {useState} from 'react';
import {Calendar, dateFnsLocalizer, NavigateAction, View} from 'react-big-calendar';
import {format, getDay, parse, startOfWeek} from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';

interface RoomAvailabilityComponentProps {
  roomId: string;
  bookings?: BookingEvent[];
  onSelectSlot: (slotInfo: { start: Date; end: Date }) => void;
  onSelectEvent: (event: BookingEvent) => void;
}

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type BookingEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resourceId?: string;
};

const mockBookings: BookingEvent[] = [
  {
    id: '1',
    title: 'Room Booked - John Doe',
    start: new Date(2024, 11, 20),
    end: new Date(2024, 11, 22),
    resourceId: 'room-1',
  },
  {
    id: '2',
    title: 'Room Booked - Alice Smith',
    start: new Date(2024, 11, 24),
    end: new Date(2024, 11, 26),
    resourceId: 'room-1',
  },
  {
    id: '3',
    title: 'Room Booked - Team Meeting',
    start: new Date(2024, 11, 28),
    end: new Date(2024, 11, 29),
    resourceId: 'room-1',
  },
];

const RoomAvailabilityComponent: React.FC<RoomAvailabilityComponentProps> = ({
                                                                               roomId,
                                                                               bookings = mockBookings,
                                                                               onSelectSlot,
                                                                               onSelectEvent,
                                                                             }) => {

  const [view, setView] = useState<View>('month');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const messages = {
    today: 'Today',
    previous: 'Back',
    next: 'Next',
    month: 'Month',
    week: 'Week',
    day: 'Day',
    agenda: 'Agenda',
  };

  const eventStyleGetter = (event: BookingEvent) => ({
    style: {
      backgroundColor: '#dc2626',
      borderRadius: '4px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    },
  });

  const handleNavigate = (date: Date, view: View, action: NavigateAction) => {
    setCurrentDate(date);
  };

  return (
    <div>
    <div className="h-[600px]">
      <Calendar
        localizer={localizer}
        events={bookings}
        startAccessor="start"
        endAccessor="end"
        view={view}
        date={currentDate}
        onView={(newView) => setView(newView)}
        onNavigate={handleNavigate}
        selectable
        onSelectSlot={onSelectSlot}
        onSelectEvent={onSelectEvent}
        eventPropGetter={eventStyleGetter}
        tooltipAccessor={(event) => `${event.title}`}
        className="rounded-md"
        messages={messages}
        defaultDate={new Date()} // Ensures the initial display is correct
      />
    </div>
    </div>

  );
};

export default RoomAvailabilityComponent;
