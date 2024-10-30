// src/services/production.jsx
import { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';


export function getData(param) {
  
    let [data, setData] = useState();
    let [isLoading, setIsloading] = useState(true);
    let [errors, setError] = useState();

    useEffect(() => {
        axiosInstance.get(param)
        .then(function (response) {
          setData(response?.data);
        })
        .catch(function (error) {
            setError(error)
        }).finally(()=>{
            setIsloading(false)
        });

    }, []);
  
    return {data,isLoading,errors};
  }

export function sendData (url,formData) {

  let [data, setData] = useState();
  let [isLoading, setIsloading] = useState(true);
  let [errors, setError] = useState();

  useEffect(() => {
    axiosInstance.post(url, formData)
      .then(function (response) {
        setData(response?.data);
      })
      .catch(function (error) {
          setError(error)
      }).finally(()=>{
          setIsloading(false)
      });

  }, []);

  return {data,isLoading,errors};
};
export function putData (url,formData) {

  let [data, setData] = useState();
  let [isLoading, setIsloading] = useState(true);
  let [errors, setError] = useState();

  useEffect(() => {
    axiosInstance.put(url, formData)
      .then(function (response) {
        setData(response?.data);
      })
      .catch(function (error) {
          setError(error)
      }).finally(()=>{
          setIsloading(false)
      });

  }, []);

  return {data,isLoading,errors};
};

export function deleteData(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setError] = useState(null);

  useEffect(() => {
    axiosInstance.delete(url)
      .then(response => {
        setData(response?.data);
        console.log('Success:', response?.data); // Log success
      })
      .catch(error => {
        setError(error);
        console.error('Error:', error); // Log error
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  return { data, isLoading, errors };
}