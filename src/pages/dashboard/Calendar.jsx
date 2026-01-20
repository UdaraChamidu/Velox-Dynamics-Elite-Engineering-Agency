import React, { useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addHours } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Plus, Clock, User, Video, MapPin } from 'lucide-react';
import DashboardNav from '../../components/navigation/DashboardNav';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import BookingModal from '../../components/calendar/BookingModal';
import { useAuth } from '../../contexts/AuthContext';

// Sri Lankan timezone settings
const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), // Monday start for Sri Lanka
  getDay,
  locales,
});

const Calendar = () => {
  const { currentUser } = useAuth();
  const [view, setView] = useState('month');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'AI Consultation - John Doe',
      start: new Date(2024, 0, 25, 10, 0),
      end: new Date(2024, 0, 25, 11, 0),
      type: 'consultation',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Project Review Meeting',
      start: new Date(2024, 0, 27, 14, 0),
      end: new Date(2024, 0, 27, 15, 30),
      type: 'meeting',
      status: 'confirmed'
    }
  ]);

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setShowBookingModal(true);
  };

  const handleSelectEvent = (event) => {
    // Show event details modal (to be implemented)
    console.log('Selected event:', event);
  };

  const handleBooking = (bookingData) => {
    const newEvent = {
      id: events.length + 1,
      title: `${bookingData.consultationType} - Pending Approval`,
      start: bookingData.startTime,
      end: addHours(bookingData.startTime, 1),
      type: bookingData.consultationType.toLowerCase(),
      status: 'pending',
      notes: bookingData.notes,
      userId: currentUser.id
    };

    setEvents([...events, newEvent]);
    setShowBookingModal(false);
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = '#8B5CF6'; // Default purple
    
    switch (event.status) {
      case 'confirmed':
        backgroundColor = '#22C55E'; // Green
        break;
      case 'pending':
        backgroundColor = '#F59E0B'; // Orange
        break;
      case 'cancelled':
        backgroundColor = '#EF4444'; // Red
        break;
      default:
        break;
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  const CustomToolbar = (toolbar) => {
    const goToBack = () => {
      toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
      toolbar.onNavigate('NEXT');
    };

    const goToToday = () => {
      toolbar.onNavigate('TODAY');
    };

    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <div>
          <h2 className="text-2xl font-bold">{toolbar.label}</h2>
          <p className="text-sm text-muted-foreground">Sri Lanka Time (GMT+5:30)</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={goToBack}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="sm" onClick={goToNext}>
            Next
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant={view === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('month')}
          >
            Month
          </Button>
          <Button
            variant={view === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('week')}
          >
            Week
          </Button>
          <Button
            variant={view === 'day' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('day')}
          >
            Day
          </Button>
        </div>
      </div>
    );
  };

  return (
    <DashboardNav>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Calendar & Scheduling</h1>
            <p className="text-muted-foreground mt-1">
              Book consultations and manage your appointments
            </p>
          </div>
          <Button onClick={() => setShowBookingModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Book Consultation
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{events.filter(e => e.status === 'confirmed').length}</p>
                <p className="text-xs text-muted-foreground">Confirmed</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{events.filter(e => e.status === 'pending').length}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{events.length}</p>
                <p className="text-xs text-muted-foreground">Total Bookings</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {new Date().toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    timeZone: 'Asia/Colombo'
                  })}
                </p>
                <p className="text-xs text-muted-foreground">Sri Lanka Time</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Calendar */}
        <Card className="p-6">
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            selectable
            view={view}
            onView={setView}
            eventPropGetter={eventStyleGetter}
            components={{
              toolbar: CustomToolbar
            }}
            step={30}
            timeslots={2}
            defaultDate={new Date()}
          />

          {/* Legend */}
          <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-500"></div>
              <span className="text-muted-foreground">Confirmed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-500"></div>
              <span className="text-muted-foreground">Pending Approval</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500"></div>
              <span className="text-muted-foreground">Cancelled</span>
            </div>
          </div>
        </Card>

        {/* Booking Modal */}
        {showBookingModal && (
          <BookingModal
            isOpen={showBookingModal}
            onClose={() => setShowBookingModal(false)}
            onBook={handleBooking}
            selectedSlot={selectedSlot}
          />
        )}
      </div>
    </DashboardNav>
  );
};

export default Calendar;
