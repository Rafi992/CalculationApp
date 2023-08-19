import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const initialAuthContext: AuthContextType = {
  user: null,
  setUser: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialAuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser?.email || "",
            name: firebaseUser?.displayName || "",
          });
        }
        if (!firebaseUser) {
          setUser(null);
          navigate("/");
        } else if (firebaseUser && pathname === "/dashboard") {
          navigate("/dashboard");
        } else if (firebaseUser && pathname === "/calculator") {
          navigate("/calculator");
        } else {
          navigate("/dashboard");
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
