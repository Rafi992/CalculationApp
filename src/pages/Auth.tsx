import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useThemeContext } from "../context/theme.context";

const Auth = () => {
  const navigate = useNavigate();
  const { darkMode } = useThemeContext();

  async function handleGoogleAuth() {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const { uid, email, displayName } = result.user;

      const userRef = doc(db, "users", uid);
      const userSnapshot = await getDoc(userRef);
      if (!userSnapshot.exists()) {
        // Jeśli użytkownik nie istnieje w Firestore, dodaj go
        await setDoc(userRef, {
          id: uid,
          email,
          displayName,
        });
      }
      navigate("/dashboard");
    } catch (error) {
      toast.error(`'Błąd logowania:', ${error}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  return (
    <section className='authPage h-[500px] w-full flex justify-center items-center'>
      <div className='authPage__wrapper w-full'>
        <h3
          className='text-center text-xl font-semibold mb-[50px] w-[200px] mx-auto'
          style={darkMode ? { color: "#fff" } : {}}
        >
          Zaloguj się do aplikacji korzystając ze swojego konta google
        </h3>
        <div className='authPage__buttons'>
          <button
            onClick={handleGoogleAuth}
            className='authPage__buttons--google block bg-[#ca8500] text-white p-5 w-[250px] rounded-lg mb-5 text-md font-main mx-auto text-lg font-medium'
            style={
              darkMode ? { color: "#111", backgroundColor: "#23777b" } : {}
            }
          >
            Google
          </button>
        </div>
      </div>
    </section>
  );
};

export default Auth;
