import * as yup from 'yup'

export const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email")
        .required('Email Address is Required'),

    password: yup.string().min(8, 'Password is too short - should be 8 minimum.').required("password is required")
    // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')

})

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


export const registerValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email")
        .required('Email Address is Required'),

    password: yup.string().min(8, 'Password is too short - should be 8 chars minimum.').required(),
    name: yup.string().min(3, 'name is to short').required(),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').min(6, "phone is to short").required(),
    isAgreed: yup.boolean().isTrue("should agree on term and conditions").required()


})


export const resetPasswordValidationSchema = yup.object().shape({
    password: yup.string().min(8, 'Password is too short 8').required(),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match').required()
})