import { Link } from "react-router-dom";
import { useThemeContext } from "../context/theme.context";

const ErrorPage = () => {
  const { darkMode } = useThemeContext();

  return (
    <section className='h-[100%] w-full grid place-content-center bg-gray-800'>
      <div className='w-[50%] h-[50%] neu-error'>
        <h3
          className='text-center text-xl font-semibold mb-[50px] w-[200px] mx-auto'
          style={darkMode ? { color: "#fff" } : {}}
        >
          Coś poszło nie tak wróć do{" "}
          <Link className='text-[#ca8500]' to='/'>
            Strony Głównej
          </Link>
        </h3>
      </div>
    </section>
  );
};

export default ErrorPage;
