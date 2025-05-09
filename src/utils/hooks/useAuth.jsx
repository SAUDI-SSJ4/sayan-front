import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/AuthSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { getAuthProfile, getAuthAcademyProfile } from "../apis/client";
import Cookies from "js-cookie";
import { setAcademyUser } from "../../../redux/AcademyAuthSlics";
import { getStudentProfile } from "../apis/client/student";

export function useAuth() {
  const dispatch = useDispatch();
  const loginType = Cookies.get("login_type");

  const token = useMemo(() => {
    return loginType === "academy"
      ? Cookies.get("academy_token")
      : Cookies.get("student_token");
  }, [loginType]);

  const {
    data: userData,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () =>
      loginType === "academy" ? getAuthAcademyProfile() : getStudentProfile(),
    retry: 2,
    enabled: !!token,
    staleTime: 600000,
    cacheTime: 1000000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (isFetched && userData) {
      if (loginType === "student") {
        dispatch(updateUser(userData));
      } else if (loginType === "academy") {
        dispatch(setAcademyUser(userData));
      }
    } else {
      dispatch(updateUser(null));
    }
  }, [dispatch, isFetched, userData, loginType]);

  if (loginType === "academy" && userData) {
    const academyUser = userData.user;
    return { user: academyUser, isLoading };
  }

  return { user: userData, isLoading };
}
