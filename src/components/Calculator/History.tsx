import { FC } from "react";
import { useThemeContext } from "../../context/theme.context";

interface Props {
  history: Calculation[];
}

const History: FC<Props> = ({ history }: Props) => {
  const { darkMode } = useThemeContext();

  return (
    <div
      className={`${
        darkMode
          ? "bg-gray-800 shadow-gray-800 text-white"
          : "bg-white shadow-slate-300 text-[#111]"
      } historyModal absolute top-[30%] left-[50%] w-[300px] h-[450px]   mx-auto rounded-md shadow-lg  p-5 mb-5`}
    >
      <h4 className='mx-auto font-medium text-sm text-center mb-3'>
        Aktualna historia wyników
      </h4>
      {history.length > 0 ? (
        <div className='  historyModal__view h-[90%] overflow-y-scroll'>
          <ul className='h-full w-full text-center mt-5'>
            {history.map((item) => (
              <li key={item.id}>
                Wynik: {`${item.calculation} = ${item.result}`}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h3 className='h-full w-full leading-[350px] text-center align-middle'>
          Brak wyników
        </h3>
      )}
    </div>
  );
};

export default History;
