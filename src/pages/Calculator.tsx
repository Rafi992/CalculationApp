import { FC, useState } from "react";
import Btn from "../components/Calculator/Btn";
import { actionButtons, mainButtons } from "../utils/calculator-buttons";
import { calculateExpression } from "../utils/calculateExpresion";
import History from "../components/Calculator/History";
import { db } from "../firebase/firebase-config";
import { useAuthContext } from "../context/auth.context";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";

const Calculator: FC = () => {
  const { user } = useAuthContext();

  const [displayedNumber, setDisplayedNumber] = useState("");
  const [currentInput, setCurrentInput] = useState("");
  const [previousInput, setPreviousInput] = useState("");
  const [activeSign, setActiveSign] = useState("");

  const [historyModal, setHistoryModal] = useState(false);
  const [calculationHistory, setCalculationHistory] = useState<Calculation[]>(
    []
  );

  const date = new Date();
  const currentDate = `${
    date.getDate().toString().length < 2 ? "0" + date.getDate() : date.getDate()
  }/${
    (date.getMonth() + 1).toString().length < 2
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1
  }/${date.getFullYear()}`;

  async function saveCurrentCalculationHistory() {
    if (user && calculationHistory.length > 0) {
      const ref = doc(db, "users", user.id);
      try {
        await updateDoc(ref, {
          calculationHistory: arrayUnion(...calculationHistory),
        });
        toast.success("Historia obliczeń zaktualizowana", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "light",
        });
        setCalculationHistory([]);
      } catch (error) {
        toast.error(`${error}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.warn("Brak historii obliczeń", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    return;
  }

  function handleOnClick(value: string, action: string) {
    if (action === "number") {
      if (displayedNumber === "0" || currentInput === "0") {
        setCurrentInput(value);
        setDisplayedNumber(value);
      } else {
        setCurrentInput(currentInput + value);
        setDisplayedNumber(currentInput + value);
      }
    } else if (action !== "number") {
      setActiveSign(value);

      switch (action) {
        case "add":
          if (!previousInput) {
            setPreviousInput(currentInput);
            setCurrentInput("");
          } else if (previousInput && currentInput) {
            const result = Number(previousInput) + Number(currentInput);
            setDisplayedNumber(result.toString());
            setCurrentInput("");
            setPreviousInput(result.toString());
            calculationHistory.push({
              id: Math.random().toString(),
              calculation: `${previousInput} ${activeSign} ${currentInput}`,
              result: result.toString(),
              date: currentDate,
            });
          } else {
          }
          break;
        case "substract":
          if (!previousInput) {
            setPreviousInput(currentInput);
            setCurrentInput("");
          } else if (previousInput && currentInput) {
            const result = Number(previousInput) - Number(currentInput);
            setDisplayedNumber(result.toString());
            setCurrentInput("");
            setPreviousInput(result.toString());
            calculationHistory.push({
              id: Math.random().toString(),
              calculation: `${previousInput} ${activeSign} ${currentInput}`,
              result: result.toString(),
              date: currentDate,
            });
          } else {
          }
          break;
        case "multiple":
          if (!previousInput) {
            setPreviousInput(currentInput);
            setCurrentInput("");
          } else if (previousInput && currentInput) {
            const result = Number(previousInput) * Number(currentInput);
            setDisplayedNumber(result.toString());
            setCurrentInput("");
            setPreviousInput(result.toString());
            calculationHistory.push({
              id: Math.random().toString(),
              calculation: `${previousInput} ${activeSign} ${currentInput}`,
              result: result.toString(),
              date: currentDate,
            });
          } else {
          }
          break;
        case "divide":
          if (!previousInput) {
            setPreviousInput(currentInput);
            setCurrentInput("");
          } else if (previousInput && currentInput) {
            const result = Number(previousInput) / Number(currentInput);
            setDisplayedNumber(result.toString());
            setCurrentInput("");
            setPreviousInput(result.toString());
            calculationHistory.push({
              id: Math.random().toString(),
              calculation: `${previousInput} ${activeSign} ${currentInput}`,
              result: result.toString(),
              date: currentDate,
            });
          } else {
          }
          break;
        case "equal":
          const result = calculateExpression(
            `${previousInput}${activeSign}${currentInput}`
          );
          calculationHistory.push({
            id: Math.random().toString(),
            calculation: `${previousInput} ${activeSign} ${currentInput}`,
            result: result.toString(),
            date: currentDate,
          });

          setDisplayedNumber(result);
          setCurrentInput("");
          setPreviousInput("");
          break;
        case "back":
          if (currentInput.length > 0) {
            const newInput = currentInput.slice(0, -1);
            setCurrentInput(newInput);
            setDisplayedNumber(newInput);
          }

          break;
        case "clear":
          setCurrentInput("");
          setPreviousInput("");
          setDisplayedNumber("0");
          break;
      }
    }
  }

  return (
    <section className='calculatorPage w-[100%] mx-auto '>
      <ToastContainer />
      <div className='calculator w-[100%] mx-auto py-4  relative '>
        {historyModal && <History history={calculationHistory} />}
        <div className='calculator__display h-[100px] sm:w-[350px] rounded-lg mb-6 p-2'>
          <div className='w-full h-[35px] text-slate-700 text-right font-bold text-xl'>
            {displayedNumber}
          </div>
          <div className='w-full h-[75px] text-right font-bold text-3xl'>
            {currentInput}
          </div>
        </div>
        <div className='calculator__buttons flex justify-between items-center  mb-10 sm:w-[350px]'>
          <div className='w-[60%] calculator__buttons--left grid grid-cols-3 place-content-center gap-4'>
            {mainButtons.map((btn) => (
              <Btn
                onClick={() => handleOnClick(btn.value, btn.action)}
                key={btn.id}
                content={btn.value}
              />
            ))}
          </div>
          <div className=' w-[40%] calculator__buttons--right'>
            <div className=' grid grid-cols-2 grid-rows-3 place-content-center gap-4'>
              {actionButtons.map((btn) => (
                <Btn
                  onClick={() => handleOnClick(btn.value, btn.action)}
                  key={btn.id}
                  content={btn.value}
                  icon={btn.icon}
                />
              ))}
            </div>
            <div className='w-[120px] mx-auto mt-4'>
              <Btn
                full={true}
                onClick={() => handleOnClick("=", "equal")}
                content='='
              />
            </div>
          </div>
        </div>
        <div className='m-0 calculator__actions w-[350px] flex items-center justify-around [&>*]:w-[150px] [&>*]:m-0'>
          <Btn
            onClick={saveCurrentCalculationHistory}
            color='23777b'
            content='Zapisz Wyniki'
          />
          <Btn
            onClick={() => setHistoryModal(!historyModal)}
            color='ca8500'
            content='Historia'
          />
        </div>
      </div>
    </section>
  );
};

export default Calculator;
