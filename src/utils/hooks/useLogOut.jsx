import Swal from "sweetalert2";
import Cookies from "js-cookie";

export const useLogOut = async () => {
  try {
    const result = await Swal.fire({
      title: "تسجيل الخروج",
      text: "هل تريد تسجيل الخروج نهائيا؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "لا",
    });

    if (result.isConfirmed) {
      const loginType = Cookies.get("login_type");

      if (loginType === "academy") {
        Cookies.remove("academy_token");
        Cookies.remove("is_login");
        Cookies.remove("login_type");
      }
      {
        Cookies.remove("student_token");
        Cookies.remove("is_login");
        Cookies.remove("login_type");
      }
      await Swal.fire({
        title: "🎉 تمت تسجيل الخروج بنجاح",
        icon: "success",
      });
    }
    location.replace("/login");
    result;
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
