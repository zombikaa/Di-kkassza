import { avatars } from '@/appwrite/config';
import LoadingPage from '@/components/shared/Loader/LoadingPage';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface IUser {
  firstName: string;
  lastName: string;
  balance: number;
  salary: number;
  scholarship: number;
  currency: string;
  name: string;
  pfp: string | URL;
  balanceWcurrency: string;
  email: string;
}

const INITIAL_USER: IUser = {
  firstName: '',
  lastName: '',
  name: '',
  balance: 0,
  salary: 0,
  scholarship: 0,
  currency: '',
  balanceWcurrency: '',
  email: '',
  pfp: '',
};

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuthUser = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/get?userData=true`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer a12b3c',
        },
      });
      const currentAccount = await response.json();
    if (currentAccount && currentAccount.collectionData && currentAccount.collectionData.length > 0) {
      const collectionData = currentAccount.collectionData[0];
      const user = currentAccount.user;

      setUser({
        firstName: collectionData.firstName,
        lastName: collectionData.lastName,
        name: `${collectionData.lastName} ${collectionData.firstName}`,
        balance: collectionData.balance,
        salary: collectionData.salary ?? 0,
        scholarship: collectionData.scholarship ?? 0,
        currency: collectionData.currency,
        pfp: avatars.getInitials(`${collectionData.lastName} ${collectionData.firstName}`),
        balanceWcurrency: `${collectionData.balance} ${collectionData.currency}`,
        email: user.email,
      });

      setIsAuthenticated(true);
      return true;
      } else {
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.error('Error checking authenticated user:', error);
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const authCheck = async () => {
      const publicPaths = ['/signup', '/login'];
      const isAuthenticated = await checkAuthUser();

      if (isAuthenticated) {
        if (publicPaths.includes(location.pathname)) {
          navigate('/');
        }
      } else {
        if (!publicPaths.includes(location.pathname)) {
          navigate('/login');
        }
      }
      setIsLoading(false);
    };

    authCheck();
  }, [navigate, location.pathname]);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? (
        <div className='w-full h-dvh flex justify-center items-center'>
          <LoadingPage />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const useUserContext = () => useContext(AuthContext);