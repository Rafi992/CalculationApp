import { FC } from "react";
import { useThemeContext } from "../../context/theme.context";

type PropsType = {
  calculationHistory: Calculation[];
};

interface Calculation {
  id: string;
  calculation: string;
  result: string;
  date: string;
}

const Table: FC<PropsType> = ({ calculationHistory }: PropsType) => {
  const { darkMode } = useThemeContext();
  return (
    <div className='table sm:w-[400px] md:w-[90%] h-full mx-auto my-5 overflow-y-scroll'>
      <div className='table__header w-[100%]  h-10 bg-[#23777b] rounded-t-md flex items-center justify-between text-white text-lg [&>*]:p-5 [&>*]:text-center  [&>*]:flex-1'>
        <span>Nr</span>
        <span>Obliczenia</span>
        <span>Wynik</span>
        <span>Data</span>
        <span>Akcja</span>
      </div>
      <div className='table__body'>
        {calculationHistory.map((item, index) => (
          <div
            key={item.id}
            className={`${
              darkMode
                ? "even:bg-[#333] odd:bg-[#202328] text-[#fff]"
                : "even:bg-[#f1f3f6] odd:bg-slate-50 text-[#111]"
            } table__body--row w-full h-8  flex items-center justify-between text-md [&>*]:p-5 [&>*]:text-center [&>*]:flex-1`}
          >
            <span>{index + 1}</span>
            <span>{item.calculation}</span>
            <span>{item.result}</span>
            <span>{item.date}</span>
            <span>Delete</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
