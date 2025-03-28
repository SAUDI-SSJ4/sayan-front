export const STUDENT_BAG_NAVIGATOR_ONE = [
  "student/StudentRate",
  "student/Comments",
  "student/Subscription",
  "student/Purchases",
  "student/Cart",
];

export const STUDENT_BAG_NAVIGATOR_TWO = [
  "student/JoiningForms",
  "student/FinancialTransactions",
  "student/AffiliateMarketing",
  "student/Sales",
];

export const NAVBAR_LINK = ["/", "/LaunchYourAcademy", "/Ai", "/EmployeeTrainning"];

export const getMenuTitle = (path) => {
  switch (path) {
    case "/":
      return "الرئيسية";
    case "/LaunchYourAcademy":
      return "اطلق اكادميتك";
    case "/Ai":
      return "الذكاء الاصطناعي";
    case "/EmployeeTrainning":
      return "تدريب وتطوير الموظفين";
    default:
      return "";
  }
};

export const months = [
  "يناير",
  "فبراير",
  "مارس",
  "إبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];
