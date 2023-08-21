import { ReactNode, FC, useEffect, useState } from "react";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider } from "../context/auth.context";
import { useThemeContext } from "../context/theme.context";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  const { darkMode } = useThemeContext();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Funkcja do obsługi zmiany szerokości ekranu
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Dodanie nasłuchiwania na zmiany szerokości ekranu
    window.addEventListener("resize", handleResize);

    // Usunięcie nasłuchiwania przy oczyszczaniu komponentu
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isNotAuthPage = pathname !== "/";
  const isNeumorphism = pathname === "/dashboard" ? "neu-big--white" : "";
  const isCalculator = pathname === "/calculator";
  const isDashboard = pathname === "/dashboard";

  return (
    <AuthProvider>
      <AnimatePresence onExitComplete={() => null} mode='wait'>
        <div
          id='theme-wrapper'
          style={
            darkMode
              ? { backgroundColor: "#14151b" }
              : { backgroundColor: "#f1f3f6" }
          }
        >
          <div
            style={
              (isCalculator || !isNotAuthPage) && screenWidth < 450
                ? { width: "375px" }
                : isDashboard && screenWidth < 450
                ? { width: "90%" }
                : isDashboard && screenWidth > 450
                ? { width: "70%" }
                : {}
            }
            className={`neu-big--white ${
              darkMode ? "neu-big--dark" : "neu-big--white"
            } ${
              isCalculator || !isNotAuthPage ? "md:w-[450px]" : "md:w-[70%]"
            } layout mx-auto sm:p-5 p-10`}
          >
            <div
              className='circle-left z-[-1]'
              style={
                darkMode
                  ? { backgroundColor: "#23777b" }
                  : { backgroundColor: "#ca8500" }
              }
            ></div>
            <div
              className='circle-right z-[-1]'
              style={
                darkMode
                  ? { backgroundColor: "#23777b" }
                  : { backgroundColor: "#ca8500" }
              }
            ></div>
            {isNotAuthPage && <Header />}
            {!isNotAuthPage && (
              <h1
                className='text-3xl text-center z-2'
                style={darkMode ? { color: "#fff" } : {}}
              >
                Calculation App
              </h1>
            )}
            <motion.main
              initial={{ opacity: 0 }}
              animate={{
                transition: { delay: 0.4, duration: 0.4, ease: "easeIn" },
                opacity: 1,
              }}
              exit={{ opacity: 0, y: 50 }}
              className={`${
                darkMode && isNeumorphism
                  ? "neu-small--dark"
                  : !darkMode && isNeumorphism
                  ? "neu-small--white"
                  : ""
              } ${
                isDashboard ? "sm:w-[350px] md:w-full" : ""
              } z-10   mx-auto min-h-[500px] md:h-[80%]`}
            >
              {children}
            </motion.main>
          </div>
        </div>
      </AnimatePresence>
    </AuthProvider>
  );
};

export default Layout;
