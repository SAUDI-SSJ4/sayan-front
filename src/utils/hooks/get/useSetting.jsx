import { useQuery } from "@tanstack/react-query";
import { getAbout, getSlider, getAcademySettings } from "../../apis/client/academy";

export const useSlider = () => {
    return useQuery({
        queryKey: ["Slider"],
        queryFn: () => getSlider(),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 2,
    });
}

export const useAbout = () => {
    return useQuery({
        queryKey: ["About"],
        queryFn: () => getAbout(),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 2,
    });
}


export const useAcademySettings = () => {
    return useQuery({
        queryKey: ["AcademySettings"],
        queryFn: () => getAcademySettings(),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 2,
    });
}