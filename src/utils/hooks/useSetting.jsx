import { useQuery } from "@tanstack/react-query";
import { getAllSetting } from "../apis/client/academy";

import CryptoJS from "crypto-js";

export const useSetting = () => {
  const settingStorage = JSON.parse(localStorage.getItem("setting"));
  
  // Check if the settingStorage is not expired or invalid (optional for extra security)
  const isSettingExpired = settingStorage && settingStorage.timestamp && Date.now() - settingStorage.timestamp > 3600000; // 1 hour expiration time

  const { data: setting, isLoading, isError } = useQuery({
    queryKey: ["setting"],
    queryFn: () => getAllSetting(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
    enabled: !settingStorage || isSettingExpired,  // Refetch if no setting or expired
  });

  if (setting && (!settingStorage || isSettingExpired)) {
    const secretKey = "mn-setting-3444";
    const encryptedSetting = CryptoJS.AES.encrypt(JSON.stringify(setting), secretKey).toString();

    localStorage.setItem("setting", JSON.stringify({ data: encryptedSetting, timestamp: Date.now() }));

    const hash = CryptoJS.SHA256(encryptedSetting).toString(CryptoJS.enc.Hex);
    localStorage.setItem("settingHash", hash);
  }

  const storedData = localStorage.getItem("setting");
  const storedHash = localStorage.getItem("settingHash");

  if (storedData && storedHash) {
    const { data: encryptedSetting } = JSON.parse(storedData);
    const bytes = CryptoJS.AES.decrypt(encryptedSetting, "mn-setting-3444");
    const decryptedSetting = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    const currentHash = CryptoJS.SHA256(encryptedSetting).toString(CryptoJS.enc.Hex);
    if (storedHash !== currentHash) {
      console.error("Data integrity compromised!");
    }

    return {
      settingStorage: decryptedSetting,
      isLoading,
      isError,
    };
  }

  return {
    settingStorage: null,
    isLoading,
    isError,
  };
};


// const data = useSetting();

// console.log(data.settingStorage);