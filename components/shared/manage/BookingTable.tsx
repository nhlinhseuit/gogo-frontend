import React, { useState, useEffect } from 'react';
import { getAllBookings, updateBookingStatus } from '@/lib/actions/ManageActions';
import StayBooking from '@/types/StayBooking';


interface BookingTableProps {
  roomId: string
}
const BookingsTable: React.FC<BookingTableProps> = (props) => {
  const [bookings, setBookings] = useState<StayBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(5);
  console.log(currentPage)
  console.log(totalPages)
  console.log("pageSize", pageSize);


  const bookingStatuses = [
    'NEW',
    'FILLED_INFO',
    'PAID',
    'PENDING',
    'CONFIRMED',
    'CHECKED_IN',
    'CHECKED_OUT',
    'CANCELLED',
    'NO_SHOW',
  ];

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'NEW': return 'text-blue-600';
      case 'FILLED_INFO': return 'text-gray-600';
      case 'PAID': return 'text-green-600';
      case 'PENDING': return 'text-yellow-600';
      case 'CONFIRMED': return 'text-cyan-600';
      case 'CHECKED_IN': return 'text-teal-600';
      case 'CHECKED_OUT': return 'text-gray-600';
      case 'CANCELLED': return 'text-red-600';
      case 'NO_SHOW': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const fetchBookingsData = async (page: number) => {
    try {
      setLoading(true);
      const response = await getAllBookings(props.roomId, page, pageSize);
      setBookings(response.data);
      setTotalPages(Math.ceil(response.totalElements / pageSize));
      setLoading(false);
    } catch (err) {
      setError('Error fetching bookings');
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBookingsData(currentPage);
  }, [currentPage, pageSize, props.roomId]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    return
    try {
      await updateBookingStatus(bookingId, newStatus);
      await fetchBookingsData(currentPage);
    } catch (err) {
      setError('Error updating booking status');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="text-gray-600">Loading...</div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <span className="block sm:inline">{error}</span>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Bookings Management</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-primary-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Booking ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Guest Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Room
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Check-in
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Check-out
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Bill
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {booking.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {`${booking.firstName ?? ""} ${booking.lastName ?? ""}`}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {booking.room.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {booking.checkinDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {booking.checkoutDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${booking.total_bill}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="text-sm">{booking.email}</div>
                <div className="text-sm text-gray-500">{booking.phone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <select
                  value={booking.status}
                  // onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${getStatusColor(booking.status)}`}
                >
                  {bookingStatuses.map((status) => (
                    <option
                      key={status}
                      value={status}
                      className={getStatusColor(status)}
                    >
                      {status}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === 0
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage >= totalPages - 1
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing page{' '}
                <span className="font-medium">{currentPage + 1}</span> of{' '}
                <span className="font-medium">{totalPages}</span>
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(0)}
                  disabled={currentPage === 0}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 0
                      ? 'text-gray-300'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  First
                </button>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                  className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 0
                      ? 'text-gray-300'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                {Array.from(Array(totalPages).keys()).map(index => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index)}
                    className={`relative inline-flex items-center px-4 py-2 border ${
                      currentPage === index
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                        : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages - 1}
                  className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium ${
                    currentPage >= totalPages - 1
                      ? 'text-gray-300'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
                <button
                  onClick={() => handlePageChange(totalPages - 1)}
                  disabled={currentPage >= totalPages - 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage >= totalPages - 1
                      ? 'text-gray-300'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  Last
                </button>
              </nav>
            </div>
          </div>
        </div>
    </div>
</div>
)
  ;
};

export default BookingsTable;
