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



/**
 * Compare two arrays or objects and return only the changed values
 *
 * @param {object|array} newData - The updated data (object or array).
 * @param {object|array} oldData - The original data (object or array).
 * @returns {object} - Object containing only changed key-value pairs.
 */
export function getChangedValues(newData, oldData) {
  if (!newData || !oldData) {
    console.warn("Invalid inputs provided to getChangedValues");
    return {};
  }

  // Convert arrays to objects if needed
  if (Array.isArray(newData) && Array.isArray(oldData)) {
    newData = arrayToObject(newData);
    oldData = arrayToObject(oldData);
  }

  const changes = {};

  Object.keys(newData).forEach((key) => {
    if (newData[key] !== oldData[key]) {
      changes[key] = newData[key];
    }
  });

  return changes;
}

/**
 * Convert an array to an object with indices as keys
 *
 * @param {array} arr - The array to convert.
 * @returns {object} - The converted object.
 */
function arrayToObject(arr) {
  return arr.reduce((obj, value, index) => {
    obj[index] = value;
    return obj;
  }, {});
}


/**
 * Populate a FormData object with key-value pairs from an object
 *
 * @param {FormData} formData - The FormData instance to populate.
 * @param {object} data - The data object to use for populating the FormData.
 */
export function populateFormData(formData, data) {
  if (!(formData instanceof FormData)) {
    throw new Error("Expected formData to be an instance of FormData.");
  }

  if (typeof data !== "object" || data === null) {
    throw new Error("Expected data to be a non-null object.");
  }

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value ?? "");
  });
}
