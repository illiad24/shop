import * as yup from "yup";

export const addProductSchema = yup.object({
  title: yup
    .string()
    .required("Назва товару є обовʼязковою")
    .min(3, "Назва повинна містити щонайменше 3 символи"),

  category: yup.string().required("Оберіть категорію товару"),

  description: yup
    .string()
    .required("Опис є обовʼязковим")
    .min(10, "Опис повинен містити щонайменше 10 символів"),

  portionWeightGrams: yup
    .number()
    .typeError("Вага порції повинна бути числом")
    .required("Вкажіть вагу порції")
    .min(10, "Вага порції повинна бути не менше 10 г"),

  price: yup
    .number()
    .typeError("Ціна повинна бути числом")
    .required("Вкажіть ціну")
    .min(1, "Ціна повинна бути більшою за 0"),

  stockPortions: yup
    .number()
    .typeError("Кількість порцій повинна бути числом")
    .required("Вкажіть кількість порцій")
    .min(1, "Кількість порцій повинна бути не менше 1"),
});
