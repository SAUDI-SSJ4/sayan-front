import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateAbout,
  postAcademySettings,
  postSlider,
} from "../../apis/client/academy";
import { useToast } from "../useToast";
import { useNavigate } from "react-router-dom";

const { success, error } = useToast();

export const useSetSilider = (sliderId, academyId) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      postSlider(sliderId, data);
    },
    onSuccess: () => {
      queryClient.refetchQueries(["Slider"]);
      // queryClient.invalidateQueries(["academySettings", academyId]);
      // queryClient.refetchQueries(["academySettings", academyId]);
      success("تم تحديث البيانات");
      navigate("/academy/settings/slider");
    },
    onError: (error) => {
      console.log("print Error from useSetSilider");
      console.log(error);
      error("حدث خطأ ما");
    },
  });
};

export const useSetAbout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateAbout(data),
    onSuccess: () => {
      queryClient.refetchQueries(["About"]);
      success("Data updated successfully");
      navigate("/academy/settings/about");
    },
    onError: (error) => {
      error("An error occurred");
    },
  });
};

export const useSetAcademySettings = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => postAcademySettings(data),
    onSuccess: () => {
      queryClient.refetchQueries(["AcademySettings"]);
      success("تم تحديث البيانات بنجاح");
    },
    onError: (error) => {
      console.log(error);
      error("حدث خطأ ما");
    },
  });
};
