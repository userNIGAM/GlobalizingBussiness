export const validateField = (field, value) => {
  let error = "";

  switch (field) {
    case "name":
      if (!value?.trim()) error = "Full name is required";
      else if (value.length < 2) error = "Name must be at least 2 characters";
      break;

    case "email":
      if (!value?.trim()) error = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        error = "Invalid email format";
      break;

    case "phone":
      // eslint-disable-next-line no-useless-escape
      if (value && !/^[\d\s\-\+\(\)]{10,}$/.test(value))
        error = "Invalid phone number";
      break;

    case "bio":
      if (value && value.length > 500)
        error = "Bio must be less than 500 characters";
      break;

    default:
      break;
  }

  return error;
};
