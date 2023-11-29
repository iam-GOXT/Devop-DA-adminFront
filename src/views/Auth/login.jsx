import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import AuthLayout from "../../Layouts/AuthLayout";
import { useMutation } from "react-query";
import { postRequest } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import {LoginValidator} from '../../utils/validators/auth'

//Components
import { Form, Button } from "react-bootstrap";
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import Spinner from "react-spinner-material";
import Swal from 'sweetalert2'


//styles
import styles from './styles/login.module.scss'
import 'sweetalert2/src/sweetalert2.scss'

const Login = ()=>{
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const {mutate, isLoading} = useMutation(postRequest, {
        onSuccess(response){
            console.log(response)
            localStorage.setItem('authToken',response.data.accessToken )
            navigate('/dashboard')
            
        },
        onError(error){
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text:error.response?.data?.message,
                showCancelButton:true,
                showConfirmButton:false
              })
        }
    })
  

    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validationSchema:LoginValidator(),
        onSubmit:(values)=>{
            console.log(values)
            mutate({
                url:'da/admin/login',
                data:values
            })
        }
    })


    return(
        <AuthLayout>
           <div className={styles.formBox}>
            <h2 className={`${styles.header} mb-10`}>Login</h2>
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
                        <div className="ml-2"><b>Remember me</b></div>
                        <div className="pull-right float-right d-flex flex-1 justify-content-end">
                            <Link to={"#"} style={{textDecoration:'none'}}><b>Forgot Password?</b></Link>
                        </div>
                    </div>

                    <Button type="submit" size="lg" className={`${styles.btn} mt-3`} >
                        {isLoading?<Spinner className="mx-auto" color="white" radius={28} stroke={2} />:'Login'}
                    </Button>
                    <div className="text-center text-sm mt-3">
                       <b> Don't have an account? <Link to={"/register"} style={{textDecoration:'none'}}>Register</Link></b>
                    </div>
                </Form>
                        
            </div>
        </AuthLayout>
    )
}

export default Login