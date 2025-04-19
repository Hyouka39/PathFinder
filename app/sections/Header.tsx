import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import OTPModal from '../components/OTPModal';

const Header = () => {
  const { isLoggedIn, username, login, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = (username: string) => {
    login(username); // Use global login function
    setShowLoginModal(false);
  };

  const openRegisterModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const closeRegisterModal = () => setShowRegisterModal(false);

  const openOTPModal = () => {
    setShowRegisterModal(false);
    setShowOTPModal(true);
  };

  const closeOTPModal = () => setShowOTPModal(false);

  return (
    <header className='fixed top-2 w-full z-50 backdrop-blur-xm pl-4 pr-4 sm:pl-10 sm:pr-10'>
      <div></div>
      <div className="flex justify-center items-center text-lg text-white navbar bg-brown-6 rounded-md p-10 sm:p-8 h-16 md:h-20 lg:h-24">
        <div className="flex-1">
          <a className="btn btn-ghost text-2xl sm:text-3xl">PathFinder</a>
        </div>
        <div className="flex-none gap-2 md:gap-3 lg:gap-4">
          <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-48 pr-10 h-12 sm:h-16 sm:w-64 md:w-auto bg-brown-ghostwhite-1 rounded-md text-black text-base sm:text-base md:text-xl lg:text-2xl" />
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" onClick={handleProfileClick}>
              <div className="">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className=" gap-6 size-8 lg:size-8">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {isLoggedIn ? (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-brown-6 rounded-lg absolute z-[1] mt-8 w-48 sm:w-64 md:w-96 lg:w-[28rem] p-2 sm:p-4 shadow">
                <li>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 sm:size-12 md:size-14 lg:size-16 md:m-2 lg:m-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <p className='flex md:pl-4 lg:pl-5 text-sm md:text-xl lg:text-2xl'>{username}</p>
                  </div>
                  <hr />
                </li>
                <li>
                  <a>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 sm:size-9 md:size-11 lg:size-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>
                    </div>
                    <div className='flex pl-2 md:pl-4 lg:pl-5 text-md md:text-xl lg:text-2xl'>
                      Profile
                    </div>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 sm:size-5 md:size-6 lg:size-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  </a>
                </li>
                <li>
                  <a>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 sm:size-9 md:size-11 lg:size-12">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <div className='flex pl-2 md:pl-4 lg:pl-5 text-md md:text-xl lg:text-2xl'>
                      Settings
                    </div>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 sm:size-5 md:size-6 lg:size-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  </a>
                </li>
                <li>
                  <a>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 sm:size-9 md:size-11 lg:size-12">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                    <div className='flex pl-2 md:pl-4 lg:pl-5 text-md md:text-xl lg:text-2xl'>
                      Help
                    </div>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 sm:size-5 md:size-6 lg:size-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  </a>
                </li>
                <li>
                  <a onClick={logout}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 sm:size-9 md:size-11 lg:size-12">
                      <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                    <div className='flex pl-2 md:pl-4 lg:pl-5 text-md md:text-xl lg:text-2xl'>
                      Log Out
                    </div>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 sm:size-5 md:size-6 lg:size-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  </a>
                </li>
              </ul>
            ) : (
              <>
                {showLoginModal && <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onSwitchToRegister={openRegisterModal} onLoginSuccess={handleLoginSuccess} />}
                {showRegisterModal && <RegisterModal isOpen={showRegisterModal} onClose={closeRegisterModal} onSwitchToLogin={() => setShowLoginModal(true)} onSwitchToOTP={openOTPModal} />}
                {showOTPModal && <OTPModal isOpen={showOTPModal} onClose={closeOTPModal} />}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;