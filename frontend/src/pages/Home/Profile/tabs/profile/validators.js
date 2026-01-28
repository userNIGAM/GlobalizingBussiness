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

    case "address":
      if (value && value.length < 5)
        error = "Address must be at least 5 characters";
      else if (value && value.length > 100)
        error = "Address must be less than 100 characters";
      break;

    case "dob":
      if (value) {
        const dobDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        if (age < 18) error = "You must be at least 18 years old";
        if (dobDate > today) error = "Date of birth cannot be in the future";
      }
      break;

    case "idType":
      if (value && !["passport", "driver_license", "national_id"].includes(value))
        error = "Invalid ID type";
      break;

    case "idNumber":
      if (value && value.length < 5)
        error = "ID number must be at least 5 characters";
      else if (value && value.length > 30)
        error = "ID number must be less than 30 characters";
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
