import { useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '../supabase'

const BookingEmail = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select("*")
      .eq('email', email);
    if (bookings) {
      console.log(bookings[0].id);
      navigate(`/booking-status/${bookings[0].id}`)
      setLoading(false)
    }
    else {
      console.log(`${error}`);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Check Your Booking Status
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1b011c] focus:border-[#1b011c] outline-none transition-colors"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            aria-label='Book Seat'
            type="submit"
            className="w-full cursor-pointer flex justify-center items-center h-[40px] px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-[#1b011c] hover:bg-[#1b011c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1b011c]"
          >
            {loading ? (
              <span className='block animate-spin w-4 h-4 rounded-full border-x border-gray-50'></span>)
              : (
                "Check status"
              )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default BookingEmail
