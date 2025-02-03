import { useEffect, useState } from "react";
import { Link } from "react-router";

const AccountDetails = () => {
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const user: string = localStorage.getItem('the_nexus_user') as string;
    const { id } = JSON.parse(user);
    if (!id) {
      window.location.href = '/register';
    }
    setUserId(id);
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <header className="mb-4 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">Account Details</h2>
            <p className="text-red-500 mb-3 text-center font-bold">
              Please verify all details before making any transfer. Use the unique ID generated as the "remark" of the transfer.
            </p>

            {!showAccountDetails && <button aria-label="Confirmation button" onClick={() => setShowAccountDetails(true)} className="w-[230px] mx-auto border bg-[#1b011c] text-gray-100 font-bold px-3 py-1 rounded-[8px]"> click here to continue?</button>}
          </header>

          {showAccountDetails &&
            <div className="space-y-6">
              <h2 className="text-[18px]">Ticket Price: <span className="font-bold text-3xl text-[#1b011c]">N5,000</span></h2>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md">
                  <p className="text-gray-900">Palmpay</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Account Name</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md">
                  <p className="text-gray-900">Aliyu Qassim</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Account Number</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md">
                  <p className="text-gray-900">8063980134</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Your unique ID</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md">
                  <p className="text-gray-900">{userId}</p>
                </div>
              </div>
            </div>}
          <div className="mt-8">
            {showAccountDetails && <Link to={`/booking-status/${userId}`}
              className="w-full bg-[#1b011c] text-white py-2 px-4 rounded-md transition-colors duration-200 font-medium"
            >
              Confirm payment
            </Link>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
