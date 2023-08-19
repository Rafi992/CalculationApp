import { useState, useEffect } from "react";
import Table from "../components/Home/Table";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { useAuthContext } from "../context/auth.context";
import { useThemeContext } from "../context/theme.context";

const Home: React.FC = () => {
  const { user } = useAuthContext();

  const [myCalculation, setMyCalculation] = useState(false);
  const [calculation, setCalculation] = useState<Calculation[]>([]);
  const { darkMode } = useThemeContext();

  useEffect(() => {
    if (user) {
      const ref = doc(db, `users/${user.id}`);
      const unsubscribe = onSnapshot(ref, (doc) => {
        if (doc.exists()) {
          const calculations = doc.get("calculationHistory");
          setCalculation(calculations);
        } else {
          console.log("Nie znaleziono dokumentu użytkownika");
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  return (
    <section className='homePage sm:w-[350px] md:w-full mx-auto'>
      <div className='homePage_header m-5 sm:w-[350px]'>
        <button
          onClick={() => setMyCalculation(true)}
          className={`${
            darkMode ? "neu-small--dark" : "neu-small--white"
          }  p-2 mr-5 `}
        >
          Moje Wyniki
        </button>
        <button
          onClick={() => setMyCalculation(false)}
          className={`${
            darkMode ? "neu-small--dark" : "neu-small--white"
          }  p-2 `}
        >
          Wszystkie obliczenia
        </button>
      </div>
      <div className='homePage__table w-full h-full'>
        {calculation ? (
          myCalculation ? (
            <Table calculationHistory={calculation} />
          ) : (
            // All users
            <Table calculationHistory={calculation} />
          )
        ) : (
          <h2 className='text-center font-semibold text-xl mt-10 w-[80%] mx-auto'>
            Brak Obliczeń. Przejdź do zakładki kalkulator aby dodać nowe
          </h2>
        )}
      </div>
    </section>
  );
};

export default Home;
