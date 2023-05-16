import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

import axios from "axios";
import HashLoader from "react-spinners/HashLoader";

import { Profile, SearchProfile } from "../types/types";
import { loadingSpinnerCss } from "../utility/customCss";

interface ProfileContextType {
  userData: Profile[];
  setUserData: React.Dispatch<React.SetStateAction<Profile[]>>;
  search: SearchProfile[];
  setSearch: React.Dispatch<React.SetStateAction<SearchProfile[]>>;
  getAllUsers: Function;
}

export const ProfileContext = createContext<ProfileContextType | null>(null);

export const ProfileViewData = ({ children }: { children: ReactNode }) => {
  let data: any;
  const [userData, setUserData] = useState<Profile[]>(data);
  const [isLoading, setIsLoading] = useState(false);

  // const getAllUsers = () => {
  //   setIsLoading(true);
  //   try {
  //     axios({
  //       method: "get",
  //       url: "http://localhost:3001/users",
  //     }).then((response) => {
  //       setUserData(response.data);
  //       console.log(response);
  //       setIsLoading(false);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getAllUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/users");
      setUserData(response.data);
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const [search, setSearch] = useState<SearchProfile[]>([]);

  const contextValue: any = useMemo(() => {
    return { userData, setUserData, search, setSearch, getAllUsers };
  }, [userData, setUserData, search, setSearch, getAllUsers]);

  return (
    <>
      {isLoading ? (
        <HashLoader style={loadingSpinnerCss} color="#1d90f5" />
      ) : (
        <ProfileContext.Provider value={contextValue}>
          {children}
        </ProfileContext.Provider>
      )}
    </>
  );
};
