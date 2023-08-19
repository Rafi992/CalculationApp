import { ReactNode, FC } from "react";
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

  const isNotAuthPage = pathname !== "/";
  const isNeumorphism = pathname === "/dashboard" ? "neu-big--white" : "";
  const isCalculator = pathname === "/calculator";

  return (
    <AuthProvider>
      <AnimatePresence onExitComplete={() => null} mode='wait'>
        <div
          id='theme-wrapper'
          style={
            darkMode
              ? { backgroundColor: "#202328" }
              : { backgroundColor: "#f1f3f6" }
          }
        >
          <div
            style={isCalculator || !isNotAuthPage ? { width: "450px" } : {}}
            className={`neu-big--white ${
              darkMode ? "neu-big--dark" : "neu-big--white"
            } layout h-[550px] sm:h-[400px]  sm:w-[450px] md:w-[550px] lg:w-[70%] md:h-[600px] `}
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
                transition: { delay: 0.4, duration: 0.4, ease: "linear" },
                opacity: 1,
              }}
              exit={{ opacity: 0, y: 50 }}
              className={`${
                darkMode && isNeumorphism
                  ? "neu-small--dark"
                  : !darkMode && isNeumorphism
                  ? "neu-small--white"
                  : ""
              } z-10 sm:w-[400px] md:w-[100%] h-[500px]`}
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
