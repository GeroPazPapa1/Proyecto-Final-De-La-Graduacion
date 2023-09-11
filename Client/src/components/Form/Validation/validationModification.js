const validation = (input) => {
  const errors = {};

  if (!/^.{1,20}$/.test(input.name) && input.name) {
    errors.name = "The name must contain a maximum of 20 characters";
  }

  if (!/^.{1,20}$/.test(input.lastName) && input.lastName) {
    errors.lastName = "The lastName must contain a maximum of 20 characters";
  }

  if (parseInt(input.age) > 115 && parseInt(input.age) < 18){
    errors.age = "Age must be over 18 and under 115";
  }

  if (!/^.{6,14}$/.test(input.tel) && input.tel) {
    errors.tel = "The number must have between 6 and 14 digits.";
  }

  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(input.email) && input.email) {
    errors.email = "Email is invalid";
  }

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(input.password) && input.password) {
    errors.password = "The password must contain at least 8 characters, a lowercase letter, an uppercase letter and a number";
  }

  if (!/^(https?:\/\/)?\S+\.(jpg|jpeg|png|gif)$/.test(input.image) && input.image) {
    errors.image = "La imagen debe ser de tipo jpg, jpeg, png o gif";
  }

  return errors;
};

export default validation;