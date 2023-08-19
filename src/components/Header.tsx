import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthContext } from "../context/auth.context";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { useThemeContext } from "../context/theme.context";

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isNotAuthPage = pathname !== "/";
  const { darkMode, setDarkMode } = useThemeContext();

  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);

  function logout() {
    close();
    signOut(auth);
    navigate("/");
  }

  function toggleDarkMode() {
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
    setDarkMode(!darkMode);
  }

  return (
    <header className='w-full relative'>
      <AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { ease: "easeOut", duration: 0.3 },
            }}
            exit={{
              y: 30,
              opacity: 0,
              transition: { ease: "easeOut", duration: 0.3 },
            }}
            className={`${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-[#111]"
            } menu-modal absolute right-0 top-20 w-[250px] p-5 rounded-md shadow-lg z-10`}
          >
            <ul className='w-full text-right cursor-pointer [&>*]:mb-2'>
              {user && (
                <li>
                  Witaj - <span className='font-bold'>{user.name}</span>{" "}
                </li>
              )}
              <li className='w-full text-right' onClick={toggleDarkMode}>
                {darkMode ? "Light Mode" : "Dark Mode"}
              </li>
              {user && <li onClick={logout}>Wyloguj</li>}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <div className='w-full h-full flex justify-between items-center'>
        <div className='h-full'>
          <h1
            className='logo text-2xl'
            style={darkMode ? { color: "#fff" } : {}}
          >
            Calculation App
          </h1>
        </div>
        <div
          className={`${
            darkMode ? "neu-circle--dark" : "neu-circle--white"
          } settings h-full neu-circle--white neu__btn`}
          onClick={() => (modalOpen ? close() : open())}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke={darkMode ? "#ffffff" : "#111111"}
            className='w-8 h-8'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75'
            />
          </svg>
        </div>
      </div>
      {isNotAuthPage && darkMode ? (
        <nav className='my-6'>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#23777b" : "#fff",
              boxShadow: isActive
                ? "inset 12px 12px 24px #1b1e22, inset -12px -12px 24px #25282e"
                : "12px 12px 24px #1b1e22, -12px -12px 24px #25282e",
            })}
            className={`${
              darkMode ? "neu-small--dark" : "neu-small--white"
            } neu__btn neu-small--white p-2 mr-4 rounded-md`}
            to='/dashboard'
          >
            Strona Główna
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#23777b" : "#fff",
              boxShadow: isActive
                ? "inset 12px 12px 24px #1b1e22, inset -12px -12px 24px #25282e"
                : "12px 12px 24px #1b1e22, -12px -12px 24px #25282e",
            })}
            className={`${
              darkMode ? "neu-small--dark" : "neu-small--white"
            } neu__btn neu-small--white p-2 mr-4 rounded-md`}
            to='/calculator'
          >
            Kalkulator
          </NavLink>
        </nav>
      ) : (
        <nav className='my-6'>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#23777b" : "#111",
              boxShadow: isActive
                ? "inset 12px 12px 24px #d2d3d6, inset -12px -12px 24px #ffffff"
                : "12px 12px 24px #d2d3d6, -12px -12px 24px #ffffff",
            })}
            className='neu__btn neu-small--white p-2 mr-4 rounded-md'
            to='/dashboard'
          >
            Strona Główna
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#23777b" : "#111",
              boxShadow: isActive
                ? "inset 12px 12px 24px #d2d3d6, inset -12px -12px 24px #ffffff"
                : "12px 12px 24px #d2d3d6, -12px -12px 24px #ffffff",
            })}
            className='neu__btn neu-small--white p-2 rounded-md'
            to='/calculator'
          >
            Kalkulator
          </NavLink>
        </nav>
      )}
    </header>
  );
};

export default Header;
