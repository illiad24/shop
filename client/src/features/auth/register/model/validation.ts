import * as yup from "yup";

const schema = yup.object({
  name: yup
    .string()
    .required("Ім’я обов’язкове")
    .min(2, "Ім’я має містити мінімум 2 символи"),

  email: yup
    .string()
    .required("Email обов’язковий")
    .email("Некоректний формат email"),

  password: yup
    .string()
    .required("Пароль обов’язковий")
    .min(6, "Пароль має бути мінімум 6 символів"),
});

export default schema;
