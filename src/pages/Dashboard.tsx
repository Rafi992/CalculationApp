import { useState, useEffect, useMemo } from "react";
import Table from "../components/Home/Table";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { useAuthContext } from "../context/auth.context";
import { useThemeContext } from "../context/theme.context";

const Dashboard: React.FC = () => {
  const { user } = useAuthContext();

  const [dataSource, setDataSource] = useState("users");
  const [data, setData] = useState([]);
  const cachedData = useMemo(() => new Map(), []);
  const { darkMode } = useThemeContext();

  const fetchData = async (source: string, userId: string) => {
    if (cachedData.has(source)) {
      setData(cachedData.get(source));
    } else {
      const ref = doc(
        db,
        source === "users" ? `${source}/${userId}` : `${source}/data`
      );
      const unsubscribe = onSnapshot(ref, (doc) => {
        if (doc.exists()) {
          const calculations = doc.get("calculationHistory");
          cachedData.set(source, calculations);
          setData(calculations);
        } else {
          console.log("Nie znaleziono dokumentu");
        }
      });
      return () => {
        unsubscribe();
      };
    }
  };
  useEffect(() => {
    if (user) {
      fetchData(dataSource, user.id);
    }
  }, [user, dataSource]);

  const handleSourceChange = (differentSource: string) => {
    setDataSource(differentSource);
  };

  return (
    <section className='homePage w-[90%] mx-auto'>
      <div className='homePage_header my-5 w-full'>
        <button
          onClick={() => handleSourceChange("users")}
          className={`${
            darkMode ? "neu-small--dark" : "neu-small--white"
          }  p-2 mr-5 text-xs md:text-md	`}
        >
          Moje Wyniki
        </button>
        <button
          onClick={() => handleSourceChange("communication")}
          className={`${
            darkMode ? "neu-small--dark" : "neu-small--white"
          }  p-2 mt-3 sm text-xs md:text-md`}
        >
          Wszystkie obliczenia
        </button>
      </div>
      <div className='homePage__table w-full h-full text-xs md:text-md'>
        {data ? (
          <Table calculationHistory={data} type={dataSource} />
        ) : (
          <h2 className='text-center font-semibold text-xl mt-10 w-[80%] mx-auto'>
            Brak Obliczeń. Przejdź do zakładki kalkulator aby dodać nowe
          </h2>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
