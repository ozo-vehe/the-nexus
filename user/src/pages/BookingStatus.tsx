import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { supabase } from "../supabase";

const BookingStatus = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [booking, setBooking] = useState({
    id: '',
    phone: '',
    status: '',
  });

  const { id } = params;

  useEffect(() => {
    const fetchBooking = async () => {
      const { data: bookings, error } = await supabase
        .from('bookings')
        .select("*")
        .eq('id', id);
      if (bookings) {
        console.log(bookings[0]);
        setBooking(bookings[0]);
        setLoading(false)
      }
      else {
        console.log(`${error}`);
        console.log(id);
        setLoading(false);
      }
    }
    fetchBooking();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-[#1b011c] w-full">
            <h1 className="text-2xl font-bold text-white">Booking Status</h1>
          </div>

          {loading ? (
            <div className="spinner h-full min-h-[300px] flex items-center justify-center">
              <span className="block w-8 h-8 border-x border-gray-600 rounded-full animate-spin"></span>
            </div>
          ) : (
            <div className="p-6">
              <div className="mb-6">
                {booking.status === "confirmed" ? (
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h2 className="text-lg font-semibold text-gray-800">Booking Confirmed</h2>
                      <p className="text-gray-600">Your booking has been successfully confirmed</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-4">
                    <div className="lg:w-12 md:w-12 w-14 h-12 p-2 bg-yellow-500 rounded-full flex items-center justify-center">
                      <img className="w-full h-full object-cover" src="https://img.icons8.com/metro/ffffff/26/clock--v1.png" alt="clock--v1" />
                    </div>
                    <div className="w-fit">
                      <h2 className="text-lg font-semibold text-gray-800">Confirmation pending</h2>
                      <p className="text-gray-600">Your booking status will be updated once payment is confirmed</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Booking Reference</h3>
                    <p className="mt-1 text-lg font-semibold text-gray-800">{booking.id}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Date</h3>
                    <p className="mt-1 text-lg font-semibold text-gray-800">February 15, 2025</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Time</h3>
                    <p className="mt-1 text-lg font-semibold text-gray-800">5:00 PM</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                    {booking.status === "confirmed" ? (
                      <p className="mt-1 text-lg font-semibold text-green-600">Confirmed</p>
                    ) : (
                      <p className="mt-1 text-lg font-semibold text-yellow-600">Pending</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Link to="/" className="min-w-[100px] text-center bg-[#1b011c] text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1b011c] focus:ring-offset-2 font-bold">
                  Home
                </Link>
                <button type="button" aria-label="Show account details" className="text-center min-w-[100px] bg-[#1b011c] text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1b011c] focus:ring-offset-2 font-bold cursor-pointer" onClick={() => setShowAccountDetails(!showAccountDetails)}>Account Details</button>
              </div>

              {showAccountDetails && 
              <div className="account_details mt-6">
                <div className="space-y-4">
                  <h2 className="text-[18px]">Ticket Price: <span className="font-bold text-3xl text-[#1b011c]">N5,000</span></h2>
                  <ul className="flex flex-col gap-3 text-xl list-disc px-5">
                    <li>Bank Name: Palmpay</li>
                    <li>Account Name: Aliyu Qassim</li>
                    <li>Account Number: 8063980134</li>
                    <li>Your unique ID: {id} </li>
                    </ul>
                </div>
              </div>}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default BookingStatus
