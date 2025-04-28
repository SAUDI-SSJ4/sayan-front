import { useQuery } from "@tanstack/react-query";
import {
  getCourse,
  getTrainer,
  getAbout,
  getSlider,
  getAcademySettings,
  getAllcategories,
  getCourseSummary,
} from "../utils/apis/client/academy.js";
import { useDispatch, useSelector } from "react-redux";
import { setTrainer } from "../../redux/TrainerSlice.js";
import { useMemo } from "react";
import { setCategories } from "../../redux/CategorySlice.js";

export const useSlider = (id) => {
  return useQuery({
    queryKey: ["Slider", id],
    queryFn: ({ queryKey }) => {
      const [_key, academyId] = queryKey;
      if (!academyId) return null;
      return getSlider(academyId);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  });
};

export const useAbout = () => {
  return useQuery({
    queryKey: ["About"],
    queryFn: () => getAbout(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  });
};

export const useSettings = (id) => {
  return useQuery({
    queryKey: ["AcademySettings", id],
    queryFn: ({ queryKey }) => {
      const [_key, academyId] = queryKey;
      return getAcademySettings(academyId);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  });
};

export const useCourses = () => {
  return useQuery({
    queryKey: ["Courses"],
    queryFn: getCourse(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  });
};

export const useTrainer = () => {
  const dispatch = useDispatch();

  // Select trainers from the Redux store
  const trainers = useSelector((state) => state.trainers.data);

  const { data, isError, isFetched } = useQuery({
    queryKey: ["Trainer"],
    queryFn: getTrainer,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
    enabled: !trainers || trainers.length === 0,
  });

  // Dispatch fetched trainers to the Redux store
  if (
    isFetched &&
    !isError &&
    data?.length > 0 &&
    (!trainers || trainers.length === 0)
  ) {
    dispatch(setTrainer(data));
  }

  // Memoize the trainers to prevent unnecessary re-renders
  const trainerList = useMemo(() => trainers || [], [trainers]);

  return {
    data: trainerList,
    isError,
    isLoading: !isFetched && trainers?.length === 0,
  };
};

export const useCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data);

  const {
    data: fetchedCategories,
    isError,
    isFetched,
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllcategories,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
    enabled: !categories || categories.length === 0,
  });

  useMemo(() => {
    if (
      isFetched &&
      !isError &&
      fetchedCategories?.length > 0 &&
      (!categories || categories.length === 0)
    ) {
      dispatch(setCategories(fetchedCategories));
    }
  }, [isFetched, isError, fetchedCategories, categories, dispatch]);

  const categoriesList = useMemo(() => categories || [], [categories]);

  return {
    data: categoriesList,
    isError,
    isLoading: isLoading && categories?.length === 0,
  };
};

export const useCourseSummary = (courseId) => {
  const {
    data: courseSummary,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["courseSummary"],
    queryFn: async () => await getCourseSummary(courseId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  });

  return {
    courseSummary,
    isError,
    isLoading,
  };
};
