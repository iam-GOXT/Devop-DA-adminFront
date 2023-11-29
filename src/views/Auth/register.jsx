import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import AuthLayout from "../../Layouts/AuthLayout";
import { useMutation } from "react-query";
import { postRequest } from "../../utils/axios";
import { useNavigate } from "react-router-dom";

import {RegisterValidator} from '../../utils/validators/auth'

//Components
import { Form, Button } from "react-bootstrap";
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import Spinner from "react-spinner-material";
import Swal from 'sweetalert2'

//styles
import styles from './styles/login.module.scss'

const Register = ()=>{

    const naviagate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)


    const {mutate, isLoading} = useMutation(postRequest, {
        onSuccess(data){
            Swal.fire({
                icon: 'success',
                title: 'Account Created',
                text:'Account has been created successfully, Proceed to login'
             })

             setTimeout(()=>{
                naviagate('/')
             },3000)

        },
        onError(error){
            console.log(error.response?.data)
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong',
                text:error.response?.data?.error,
                showCancelButton:true,
                showConfirmButton:false
            })
        }
    })

    const formik = useFormik({
        initialValues:{
            email:'',
            password:'',
            userName:'',
            firstName:'',
            lastName:''
        },
        validationSchema:RegisterValidator(),
        onSubmit:(values)=>{
            console.log(values)
            mutate({
                url:'da/admin/register',
                data:values
            })
        }
    })


    return(
        <AuthLayout>
           <div className={styles.formBox}>
            <h2 className={`${styles.header} mb-10`}>Register</h2>
                <Form name="loginForm" onSubmit={formik.handleSubmit} >
                    <Form.Group className={` mb-4`}>
                        <Form.Control
                            placeholder="Enter email"
                            style={formik.touched.email && formik.errors.email && {border:'1px solid red'}}
                            id="email"
                            type="email"
                            className={`${styles.input} shadow-none`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                         />
                         {formik.touched.email && formik.errors.email ? 
                        <p className="text-sm mt-1" style={{color:'red'}} ><b>{formik.errors.email}</b></p>: null}
                    </Form.Group>

                    <Form.Group className={` mb-4`}>
                        <Form.Control
                            placeholder="Enter userName"
                            style={formik.touched.userName && formik.errors.userName && {border:'1px solid red'}}
                            id="userName"
                            type="text"
                            className={`${styles.input} shadow-none`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.userName}
                         />
                         {formik.touched.userName && formik.errors.userName ? 
                        <p className="text-sm mt-1" style={{color:'red'}} ><b>{formik.errors.userName}</b></p>: null}
                    </Form.Group>

                    <Form.Group className={` mb-4`}>
                        <Form.Control
                            placeholder="First Name"
                            style={formik.touched.firstName && formik.errors.firstName && {border:'1px solid red'}}
                            id="firstName"
                            type="text"
                            className={`${styles.input} shadow-none`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                         />
                         {formik.touched.firstName && formik.errors.firstName ? 
                        <p className="text-sm mt-1" style={{color:'red'}} ><b>{formik.errors.firstName}</b></p>: null}
                    </Form.Group>

                    <Form.Group className={` mb-4`}>
                        <Form.Control
                            placeholder="Last Name"
                            style={formik.touched.lastName && formik.errors.lastName && {border:'1px solid red'}}
                            id="lastName"
                            type="text"
                            className={`${styles.input} shadow-none`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                         />
                         {formik.touched.lastName && formik.errors.lastName ? 
                        <p className="text-sm mt-1" style={{color:'red'}} ><b>{formik.errors.lastName}</b></p>: null}
                    </Form.Group>

                    <Form.Group className={`mb-3`}>
                        <div className={`${styles.inputWrapper} rounded`}>
                            <Form.Control
                                id="password"
                                style={formik.touched.password && formik.errors.password && {border:'1px solid red'}}
                                type={!showPassword?'password':'text'}
                                className={`${styles.input} shadow-none`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {!showPassword? 
                                <AiFillEye onClick={()=>setShowPassword(true)} color="grey" size={20} />:
                                <AiFillEyeInvisible onClick={()=>setShowPassword(false)} color="grey" size={20} />
                            }
                        </div>
                        {formik.touched.password && formik.errors.password ? 
                        <p className="text-sm mt-1" style={{color:'red'}} ><b>{formik.errors.password}</b></p>: null}
                    </Form.Group>
                    <div className="d-flex mb-5 text-sm text-bold">
                        <Form.Check/>
                        <div className="ml-2" >I hereby agree to the <b>terms and conditions</b></div>
                    </div>

                    <Button type="submit" size="lg" className={`${styles.btn} mt-3`} >
                        {isLoading?<Spinner className="mx-auto" stroke={2} radius={24} color="white" />:'Register'}
                    </Button>
                    <div className="text-center text-sm mt-3">
                       <b> Already have an account? <Link to={"/"} style={{textDecoration:'none'}}>Login</Link></b>
                    </div>
                </Form>
                        
            </div>
        </AuthLayout>
    )
}

export default Register