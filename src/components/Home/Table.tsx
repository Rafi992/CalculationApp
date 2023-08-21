import { FC, useEffect, useState } from "react";
import { useThemeContext } from "../../context/theme.context";

type PropsType = {
  calculationHistory: Calculation[];
  type: string;
};

interface Calculation {
  id: string;
  calculation: string;
  result: string;
  date: string;
  userName?: string;
}

const Table: FC<PropsType> = ({ calculationHistory, type }: PropsType) => {
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
  return (
    <div className='table  mx-auto overflow-hidden rounded-b-md'>
      <div className='table__header w-[100%] mx-auto h-10 bg-[#23777b] rounded-t-md flex items-center justify-between text-white [&>*]:p-5 [&>*]:text-center  [&>*]:flex-1 text-xs md:text-lg'>
        <span className='max-w-[50px]'>Nr</span>
        <span>Obliczenia</span>
        <span>Wynik</span>
        {type === "users" && screenWidth > 450 ? (
          <span>Data</span>
        ) : type !== "users" && screenWidth > 450 ? (
          <span>Użytkownik</span>
        ) : null}
      </div>
      <div className='table__body h-[100%]  w-[100%] mx-auto sm:text-sm overflow-y-scroll  '>
        {calculationHistory.map((item, index) => (
          <div
            key={index}
            className={`${
              darkMode
                ? "even:bg-[#333] odd:bg-[#202328] text-[#fff]"
                : "even:bg-[#f1f3f6] odd:bg-slate-50 text-[#111]"
            } table__body--row w-full h-8  flex items-center justify-between text-md [&>*]:p-5 [&>*]:text-center [&>*]:flex-1`}
          >
            <span className='max-w-[50px]'>{index + 1}</span>
            <span>{item.calculation}</span>
            <span>{item.result}</span>
            {type === "users" && screenWidth > 450 ? (
              <span>{item.date}</span>
            ) : type !== "users" && screenWidth > 450 ? (
              <span>{item.userName}</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
