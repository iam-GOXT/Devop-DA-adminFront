import * as Yup from 'yup'

export const LoginValidator = ()=>{
    return Yup.object({
        email:Yup
            .string()
            .required('Email is required')
            .email('Invalid email address'),
        password:Yup
            .string()
            .required('Password is required')
       
    })
}


export const RegisterValidator = ()=>{
    return Yup.object({
        email:Yup
            .string()
            .required('Email is required')
            .email('Invalid email address'),
        password:Yup
            .string()
            .required('Password is required')
            .min(5,'Passsword should not be less than 5 characters'),
        userName:Yup
            .string()
            .required('Password is required')
            .min(3,'UserName should not be less than 3 characters'),
        firstName:Yup
            .string()
            .required('FirstName is required'),
        lastName:Yup
            .string()
            .required('LastName is required')
       
    })
}