import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { postChapter, postLesson, postLessonExam, postLessonTools, postUploadLessonVideo } from "../utils/apis/client/academy";
import Swal from "sweetalert2";
import { changeNavigate } from "../../redux/CourseSidebarSlice";
import { ConstructionOutlined } from "@mui/icons-material";
import { storage } from "../utils/storage";
import { fetchCurrentCourseSummaryThunk } from "../../redux/CourseSlice";




export const useChapterMutation = (currentCourseId) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (params) => postChapter(params),
        onSuccess: ({ chapter }) => {
            if (storage.exists("chapky89wsgnae"))
                storage.update("chapky89wsgnae", chapter.id);
            else
                storage.save("chapky89wsgnae", chapter.id);

            dispatch(fetchCurrentCourseSummaryThunk(currentCourseId));
            dispatch(changeNavigate("lesson"));
            Swal.fire({
                title: "نجاح!",
                text: "تمت إضافة الفصل بنجاح",
                icon: "success",
                confirmButtonText: "موافق",
            });
        },
        onError: (error) => {
            console.log(error)
            Swal.fire({
                title: "فشل",
                text: "حدث خطأ أثناء محاولة إضافة الفصل. يرجى المحاولة مرة أخرى.",
                icon: "error",
                confirmButtonText: "موافق",
            });
        },
    });
    return mutation;
}





export const useLessonMutation = (currentCourseId) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (params) => postLesson(params),
        onSuccess: ({ data }) => {
            if (storage.exists("leuhqzrsyh5e"))
                storage.update("leuhqzrsyh5e", data.id);
            else
                storage.save("leuhqzrsyh5e", data.id);

            dispatch(fetchCurrentCourseSummaryThunk(currentCourseId));
            dispatch(changeNavigate("video"));
            Swal.fire({
                title: "نجاح!",
                text: "تمت إضافة الدرس بنجاح",
                icon: "success",
                confirmButtonText: "موافق",
            });
        },
        onError: (error) => {
            console.log(error)
            Swal.fire({
                title: "فشل",
                text: "حدث خطأ أثناء محاولة إضافة الدرس. يرجى المحاولة مرة أخرى.",
                icon: "error",
                confirmButtonText: "موافق",
            });
        },
    });
    return mutation;
}

//{getlatestLesson && getlatestLesson.title}

//postUploadLessonVideo(lessonId, formData)



export const useVideoMutation = (currentCourseId, lessonId) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (params) => postUploadLessonVideo(lessonId, params),
        onSuccess: (res) => {
            console.log(res)
            dispatch(fetchCurrentCourseSummaryThunk(currentCourseId));
            dispatch(changeNavigate("lesson"));
            Swal.fire({
                title: "نجاح!",
                text: "تمت إضافة الفيديو بنجاح",
                icon: "success",
                confirmButtonText: "موافق",
            });
        },
        onError: (error) => {
            console.log(error)
            Swal.fire({
                title: "فشل",
                text: "حدث خطأ أثناء محاولة إضافة الفيديو. يرجى المحاولة مرة أخرى.",
                icon: "error",
                confirmButtonText: "موافق",
            });
        },
    });
    return mutation;
}



export const useExamMutation = (currentCourseId, lessonId) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (params) => await postLessonExam(lessonId, params),
        onSuccess: (res) => {
            dispatch(fetchCurrentCourseSummaryThunk(currentCourseId));
            dispatch(changeNavigate("lesson"));
            Swal.fire({
                title: "نجاح!",
                text: "تمت إضافة الامتحان بنجاح",
                icon: "success",
                confirmButtonText: "موافق",
            });
        },
        onError: (error) => {
            console.log(error)
            Swal.fire({
                title: "فشل",
                text: "حدث خطأ أثناء محاولة إضافة الامتحان. يرجى المحاولة مرة أخرى.",
                icon: "error",
                confirmButtonText: "موافق",
            });
        },
    });
    return mutation;
}



export const useCardMutation = (currentCourseId, lessonId) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (params) => postLessonTools(lessonId, params),
        onSuccess: (res) => {
            console.log(res)
            dispatch(fetchCurrentCourseSummaryThunk(currentCourseId));
            // dispatch(changeNavigate("lesson"));
            Swal.fire({
                title: "نجاح!",
                text: "تمت إضاف بنجاح",
                icon: "success",
                confirmButtonText: "موافق",
            });
        },
        onError: (error) => {
            console.log(error)
            Swal.fire({
                title: "فشل",
                text: "حدث خطأ أثناء محاولة إضافة . يرجى المحاولة مرة أخرى.",
                icon: "error",
                confirmButtonText: "موافق",
            });
        },
    });
    return mutation;
}
