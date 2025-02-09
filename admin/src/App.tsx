// import { Outlet } from 'react-router'
import './App.css'
import { Analytics } from "@vercel/analytics/react"
import bg_image from './assets/bg_image.jpeg'
import { useEffect, useState } from 'react'
import { supabase } from './supabase'
// import emailjs from '@emailjs/browser';

interface Booking {
  created_at: string;
  email: string;
  fullname: string;
  id: string
  phone: string;
  status: string;
}

// const SERVICE_ID = 'service_f3ytnp6';
// const TEMPLATE_ID = 'template_zbx4fme';
// const PUBLIC_KEY = 'Zg7ZI3Udlsr0ade51';

function App() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [bookingsLoading, setBookingsLoading] = useState(false);

  const handleConfirmPayment = async (id: string) => {
    console.log(id)

    setLoading(true)
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'confirmed' })
      .eq("id", id)
      .select()

    if (data) {
      console.log(data)
      const req = await fetch(
        `http://api.qrserver.com/v1/create-qr-code/?data=https://the-nexus-event.vercel.app/user/${data[0].id}&size=200x200`
      );
      const blob = await req.blob();
      const file = new File([blob], `qrcode-${data[0].id}.png`, { type: 'image/png' });

      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('qr-codes')
        .upload(`qr-${data[0].id}.png`, file);

      if (uploadError) {
        console.error('Error uploading QR code:', uploadError);
        return;
      }
      console.log('QR code uploaded successfully!' + uploadData);

      await fetchBookings();
      setLoading(false)
    } else {
      console.log(error)
      setLoading(false)
    }

  }

  const fetchBookings = async () => {
    setBookingsLoading(true)
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
    if (data) {
      console.log(data)
      setBookings(data)

      setBookingsLoading(false)
    } else {
      console.log(error)
      setBookingsLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings();
    // console.log(emailjs)
  }, [])

  return (
    <>
      <main className='lg:px-10 md:px-5 px-4 py-8 max-w-full mx-auto'>
        <header className='border lg:h-[30vh] md:h-[30vh] h-[20vh] max-w-full mx-auto rounded-[36px] overflow-hidden'>
          <img className='w-full h-full object-cover' src={bg_image} alt="The Nexus background image" />
        </header>


        <div className="overflow-x-auto mt-8">
          {bookingsLoading ? (
            <span className='block animate-spin w-8 h-8 mx-auto rounded-full border-x border-gray-700'></span>
          ) : (
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/No.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fullname</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings &&
                  bookings.map((booking: Booking, index) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.fullname}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {booking.status === "confirmed" ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {booking.status}
                          </span>) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            {booking.status}
                          </span>
                        )}
                      </td>
                      {booking.status === "pending" &&
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center justify-end">
                          {!loading ? (
                            <button aria-label='confirm a booking' className='rounded-full p-1 w-7 h-7 bg-green-100 cursor-pointer' onClick={() => handleConfirmPayment(booking.id)}><img className="w-full h-full object-cover" src="https://img.icons8.com/ios-glyphs/016630/30/checkmark--v1.png" alt="checkmark--v1" /></button>
                          ) : (
                            <span className='block w-4 h-4 border-x border-gray-700 rounded-full animate-spin'></span>
                          )}
                        </td>
                      }
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )}
        </div>

      </main>
      <Analytics />
    </>
  )
}

export default App
