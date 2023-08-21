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
      const communicationRef = doc(db, "communication", "data");

      const communicationData = calculationHistory.map((obj) => {
        return { ...obj, userName: user.name.split(" ")[0] };
      });

      try {
        await updateDoc(ref, {
          calculationHistory: arrayUnion(...calculationHistory),
        });
        await updateDoc(communicationRef, {
          calculationHistory: arrayUnion(...communicationData),
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

  function calculate() {
    const result = calculateExpression(
      `${previousInput}${activeSign}${currentInput}`
    );
    calculationHistory.push({
      id: Date.now().toString(),
      calculation: `${previousInput} ${activeSign} ${currentInput}`,
      result: result.toString(),
      date: currentDate,
    });
    return result;
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
    } else if (action === "reverse") {
      return;
    } else if (action !== "number" && action !== "reverse") {
      setActiveSign(value);

      switch (action) {
        case "add":
        case "substract":
        case "multiple":
        case "divide":
          if (displayedNumber !== "") {
            setPreviousInput(displayedNumber);
            setDisplayedNumber("");
            if (!currentInput && !previousInput) {
              return;
            } else if (currentInput && !previousInput) {
              setPreviousInput(currentInput);
              setCurrentInput("");
            } else if (currentInput && previousInput) {
              const result = calculate();
              setDisplayedNumber(result);
              setCurrentInput("");
              setPreviousInput("");
            }
          } else {
            if (!currentInput && !previousInput) {
              return;
            } else if (currentInput && !previousInput) {
              setPreviousInput(currentInput);
              setCurrentInput("");
            } else if (currentInput && previousInput) {
              const result = calculate();
              setDisplayedNumber(result);
              setCurrentInput("");
              setPreviousInput("");
            }
          }
          break;

        case "equal":
          if (!currentInput && !previousInput) {
            return;
          } else if (currentInput && previousInput) {
            const result = calculate();
            setDisplayedNumber(result);
            setCurrentInput("");
            setPreviousInput("");
          }
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
    <section className='calculatorPage w-[100%] mx-auto'>
      <ToastContainer />
      <div className='calculator w-[100%] mx-auto py-4  relative '>
        {historyModal && <History history={calculationHistory} />}
        <div className='calculator__display mx-auto h-[100px] sm:w-[350px] rounded-lg mb-6 p-2'>
          <div className='w-full h-[35px] text-slate-700 text-right font-bold text-xl'>
            {displayedNumber}
          </div>
          <div className='w-full h-[75px] text-right font-bold text-3xl'>
            {currentInput}
          </div>
        </div>
        <div className='calculator__buttons mx-auto flex justify-between items-center  mb-10 sm:w-[350px]'>
          <div className='w-[60%] calculator__buttons--left grid grid-cols-3 place-content-center gap-4 pr-2'>
            {mainButtons.map((btn) => (
              <Btn
                onClick={() => handleOnClick(btn.value, btn.action)}
                key={btn.id}
                content={btn.value}
              />
            ))}
          </div>
          <div className=' w-[40%] calculator__buttons--right'>
            <div className=' grid grid-cols-2 grid-rows-3 place-content-center gap-4 pl-2'>
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
        <div className='m-0 calculator__actions flex items-center justify-around [&>*]:w-[130px] text-sm [&>nth-child(1)]:mr-3'>
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
