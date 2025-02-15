// import { Outlet } from 'react-router'
import './App.css'
import { Analytics } from "@vercel/analytics/react"
// import bg_image from './assets/bg_image.jpeg'
import nexus_video from './assets/nexus_video.mp4'
import { Link } from 'react-router'

function App() {

  return (
    <>
      <main className='lg:px-10 md:px-5 px-4 py-8 max-w-[1440px] mx-auto'>
        <header className='lg:h-[80vh] md:h-[70vh] h-[50vh] max-w-[1440px] mx-auto rounded-[36px] overflow-hidden'>
          {/* <img className='w-full h-full object-cover' src={bg_image} alt="The Nexus background image" /> */}
          <video className="w-full h-full object-cover" playsInline autoPlay muted>
            <source src={nexus_video} type="video/mp4" />
          </video>
        </header>

        <div className="event_details py-8">
          <h1 className="lg:text-5xl md:text-4xl text-3xl mb-8 font-bold text-gray-900">Dinner and Award Night</h1>
          <div className="event_time mb-8">
            <h3 className="lg:text-[22px] md:text-[18px] text-[18px] text-gray-800 font-bold">Date and time:</h3>
            <p className='lg:text-[18px] text-[16px] text-gray-700'>Saturday, February 15 2025</p>
            <p className='lg:text-[18px] text-[16px] text-gray-700'>5:30 PM - 11:30 PM GMT+1</p>
          </div>

          <div className="event_location mb-8">
            <h3 className="lg:text-[22px] md:text-[18px] text-[18px] text-gray-800 font-bold">Venue:</h3>
            {/* <p className='text-[18px] text-gray-700'>Syde Resort, 11B Rabah Road, Ungwan Sarki Muslimi, Nassarawa 800283, Kaduna </p> */}
            <a href='https://maps.app.goo.gl/5DxmxenKvCyTbxnUA' target='_blank' className='flex items-center gap-2 lg:text-[18px] text-[16px] text-gray-700'>Syde Resort, 11B Rabah Road, Ungwan Sarki Muslimi, Nassarawa 800283, Kaduna <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/place-marker.png" alt="place-marker"/></a>
          </div>

          <div className="event_description max-w-[900px]">
            <h3 className='lg:text-[22px] md:text-[18px] text-[18px] text-gray-800 font-bold capitalize'>Welcome to our Dinner and Award Night!</h3>
            <p className='leading-7 lg:text-[18px] md:text-[18px] text-[16px]'>Join us for an unforgettable evening of celebration and recognition as we honor the hard work, dedication, and achievements of the final-year medical students and their remarkable impact throughout their medical journey.

              This is a perfect opportunity to relax, network, and create lasting memories with friends, classmates and mentors before embarking on the next phase of their medical career.

              Don’t miss out on this special occasion! Reserve your spot now and get ready for an evening filled with great food, great company, and well-deserved accolades.</p>
          </div>
        </div>

        <div className="event_button flex flex-wrap gap-4">
          {/* <Link to="/register" aria-label="Book seat button" className=' bg-[#1b011c]/90 text-gray-100 px-5 py-2 rounded-[8px] outline-none border-none font-bold hover:bg-[#1b011c] transition-all duration-300 cursor-pointer' >Book a seat</Link> */}

          <Link to="/booking-email" aria-label="Book seat button" className=' bg-gray-50 border border-[#1b011c] text-[#1b011c] px-5 py-2 rounded-[8px] outline-none font-bold cursor-pointer' >See booking status</Link>
        </div>
      </main>
      <Analytics />
    </>
  )
}

export default App
