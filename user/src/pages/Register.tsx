import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { v4 } from 'uuid';
import { supabase } from '../supabase';

const BookSeat = () => {
  const [formData, setFormData] = useState({
    id: '',
    fullname: '',
    email: '',
    phone: '',
    status: 'pending',
  });
  const [loading, setLoading] = useState(false);
  const [continueButton, setContinueButton] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@(gmail\.com|[^\s@]+\.[^\s@]+)$/;
    const isGmail = email.toLowerCase().includes('@gmail.com');
    if (!isGmail && !email.toLowerCase().includes('@gmail.com')) return false;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
  };

  const isUserExist = async (email: string): Promise<string> => {
    const { data: bookings } = await supabase
      .from('bookings')
      .select("*")
      .eq('email', email);

    console.log(bookings);
    if (bookings && bookings.length > 0) {
      if (bookings[0].status === 'pending') {
        return "pending";
      } else {
        return "exist";
      }
    }
    return "not exist";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const id: string = v4().split('-')[0];
    console.log(id);
    formData.id = id;
    if (!isValidEmail(formData.email)) {
      alert('Please enter a valid email address.');
      setLoading(false);
      return;
    }
    if (!isValidPhone(formData.phone)) {
      alert('Please enter a valid phone number.');
      setLoading(false);
      return;
    }

    const user_status = await isUserExist(formData.email);

    if (user_status === "exist") {
      alert('This email address has already been used, please use another email address.');
      setLoading(false);
      return;
    }
    if (user_status === "pending") {
      alert("This email address has a pending payment, please continue to the payment page.");
      setLoading(false);
      setContinueButton(true);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([formData])
        .select()

      if (data) {
        localStorage.setItem('the_nexus_user', JSON.stringify(formData));
        console.log(formData)
        setLoading(false);
        navigate('/account-details');
      } else {
        new Error(`${error}`);
      }
    } catch (error) {
      console.error('An error occurred:', error)
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen max-w-[1440px] mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-gray-50 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Book Your Seat
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                required
                value={formData.fullname}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1b011c] focus:ring-[#1b011c] py-1 pl-2"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address (Gmail Only)
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1b011c] focus:ring-[#1b011c] py-1 pl-2"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1b011c] focus:ring-[#1b011c] py-1 pl-2"
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
                  "Book seat"
                )}
            </button>
            {continueButton && <Link to="/account-details"
              className="w-full cursor-pointer flex justify-center items-center h-[40px] px-4 border rounded-md shadow-sm font-medium bg-gray-50 border-[#1b011c] text-[#1b011c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1b011c]"
            >
              Continue to payment page
            </Link>}
          </form>
        </div>
      </div>
    </>
  );
};

export default BookSeat;
