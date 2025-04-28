// src/services/production.jsx
import { useCallback, useEffect, useState } from "react";
import { academy_client } from "../../utils/apis/client.config";

export function getData(param) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setErrors(null);

    try {
      const response = await academy_client.get(param);
      setData(response?.data || []);
    } catch (err) {
      console.log("get data", err);
      setErrors(err.response?.data?.message || err.message || "حدث خطأ ما");
    } finally {
      setIsLoading(false);
    }
  }, [param]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refresh = () => {
    fetchData();
  };

  return { data, isLoading, errors, refresh };
}

export function sendData(url) {
  let [data, setData] = useState();
  let [isLoading, setIsloading] = useState(true);
  let [errors, setError] = useState();
  const postData = async (postData) => {
    setIsloading(true);
    setError(null);
    try {
      const response = await academy_client.post(url, postData);
      setData(response.data);
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    } finally {
      setIsloading(false);
    }
  };

  return { data, isLoading, errors, postData };
}

export function putData(url) {
  let [data, setData] = useState();
  let [isLoading, setIsloading] = useState(true);
  let [errors, setError] = useState();

  const postData = async (postData) => {
    setIsloading(true);
    setError(null);
    try {
      const response = await academy_client.put(url, postData);
      setData(response.data);
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    } finally {
      setIsloading(false);
    }
  };

  return { data, isLoading, errors, postData };
}

export function deleteData(url) {
  let [data, setData] = useState();
  let [isLoading, setIsloading] = useState(true);
  let [errors, setError] = useState();

  const deleteDataa = async () => {
    setIsloading(true);
    setError(null);
    try {
      const response = await academy_client.delete(url);
      setData(response.data);
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    } finally {
      setIsloading(false);
    }
  };

  return { data, isLoading, errors, deleteDataa };
}
