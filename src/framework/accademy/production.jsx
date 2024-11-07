// src/services/production.jsx
import { useEffect, useState } from "react";
import { academyAPI } from "../../utils/apis/client/academy";


export function getData(param) {
  let [data, setData] = useState();
  let [isLoading, setIsloading] = useState(true);
  let [errors, setError] = useState();
  useEffect(() => {
    academyAPI
      .get(param)
      .then(function (response) {
        setData(response?.data);
      })
      .catch(function (error) {
        setError(error);
      })
      .finally(() => {
        setIsloading(false);
      });
  }, []);

  return { data, isLoading, errors };
}

export function sendData(url) {
  let [data, setData] = useState();
  let [isLoading, setIsloading] = useState(true);
  let [errors, setError] = useState();
  const postData = async (postData) => {
    setIsloading(true);
    setError(null);
    try {
      const response = await academyAPI.post(url, postData);
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
      const response = await academyAPI.put(url, postData);
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
      const response = await academyAPI.delete(url);
      setData(response.data);
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    } finally {
      setIsloading(false);
    }
  };

  return { data, isLoading, errors, deleteDataa };
}
