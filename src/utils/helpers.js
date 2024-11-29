export const isEmpty = (array) => {
  return !array || array.length === 0;
};

export const isNotEmpty = (array) => {
  return array && array.length > 0;
};

export const isObject = (obj) => {
  return obj !== null && typeof obj === "object";
};

export const isArray = (array) => {
  return Array.isArray(array);
};

export const handleLevels = (level) => {
  switch (level) {
    case "advanced":
      return "مستوى متقدم";
    case "intermediate":
      return "مستوى متوسط";
    case "beginner":
    default:
      return "مستوى مبتدئ";
  }
};

export const handleRateStare = (rate) => {
  switch (rate) {
    case 1:
      return "⭐";
    case 2:
      return "⭐⭐";
    case 3:
      return "⭐⭐⭐";
    case 4:
      return "⭐⭐⭐⭐";
    case 5:
      return "⭐⭐⭐⭐⭐";
    default:
      return "⭐";
  }
};

export const formatLongText = (text, maxLength = 100) => {
  return text ?  text.slice(0, maxLength) + " ..." : "لا يوجد محتوى";
};


export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const isValidURL=(data)=> {
  const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
  return urlRegex.test(data);
}
