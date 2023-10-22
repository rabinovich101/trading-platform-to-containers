import * as yup from "yup";


export const userSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    country_residency: yup.string().required(),
    country_living: yup.string().required(),
    password: yup.string().min(6),
    phone: yup.string().required()
});

