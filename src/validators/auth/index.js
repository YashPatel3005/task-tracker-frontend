import Joi from "joi";

const signupSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  password: Joi.string().min(5).max(20).required().label("PassWord"),
  lastName: Joi.string().required().label("Last Name"),
  firstName: Joi.string().required().label("First Name"),
});

const signInSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  password: Joi.string().min(5).max(20).required().label("PassWord"),
});

export { signupSchema, signInSchema };
