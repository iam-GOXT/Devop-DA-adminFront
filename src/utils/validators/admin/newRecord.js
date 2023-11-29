import * as Yup from 'yup'

export const NewRecordValidator = ()=>{
    return Yup.object({
        schoolName:Yup
            .string()
            .required('School name is required'),
        department:Yup
            .string()
            .required('Department is required'),
        contact:Yup
            .string()
            .required('Contact is required'),
        faculty:Yup
            .string()
            .required('Faculty is required'),
        country:Yup
            .string()
            .required('Country is required'),
        email:Yup
            .string()
            .required('Email is required')
            .email('Email is not a valid email'),
        website:Yup
            .string()
            .required('Website URL is required')
            .url('Invalid URL supplied'),
        courseOverview:Yup
            .string()
            .required('Coourse overview is required')
            .min(5, 'Minimum of 5 characters required'),
        funding:Yup
            .string()
            .required('Funding information is required')
            .min(5, 'Minimum of 5 characters required'),
        aboutSchool:Yup
            .string()
            .required('Schoool information is required')
            .min(5, 'Minimum of 5 characters required'),
        requirement:Yup
            .string()
            .required('School requirement is required')
            .min(5, 'Minimum of 5 characters required'),
        services:Yup
            .string()
            .required('Services information is required')
            .min(5, 'Minimum of 5 characters required'),
        fee:Yup
            .string()
            .required('School fee is required'),
        degree:Yup
            .string()
            .required('Degree is required')
           
    })
}