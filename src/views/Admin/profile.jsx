import React, {useContext, useState, useEffect} from 'react';
import { useQuery } from 'react-query';
import { getRequest } from '../../utils/axios';
import { Link } from 'react-router-dom';
import Spinner from 'react-spinner-material';
import { useParams, useSearchParams } from 'react-router-dom';
import Header from '../../components/header';
import axios from 'axios';
import config from '../../config'
import Swal from 'sweetalert2';
import { userContext } from '../../context/user';
import {IoIosNotificationsOutline} from 'react-icons/io'
import HomeLayout from '../../Layouts/HomeLayout';
import Avatar from 'react-avatar';
import Backdrop from '../../components/backdrop';
import { Form } from 'react-bootstrap';

import styles from './styles/dashboard.module.scss'
import Pstyles from './styles/profile.module.scss'

const Profile = () => {

    const [user, setUser] = useContext(userContext)
    const params = useParams()
    const profileId = params.id
   
    const [formValues, setFormValues] = useState({
        firstName:'',
        lastName:'',
        email:'',
        userName:''
    })

    const [isEditing, setIsEditing] = useState({
        firstName:false,
        lastName:false,
        email:false,
        userName:false
    })
 

    const handleEdit = async (field)=>{
        const isEditing_c = {...isEditing}
        isEditing_c[field] = true
        setIsEditing(isEditing_c)
        console.log({[field]:formValues[field]})
        
        try{
            const response = await axios.patch(`${config.apiUrl}/da/admin/`, {[field]:formValues[field]}, {headers:{
                authorization:`Bearer ${localStorage.getItem('authToken')}`
            }})
            console.log(response.data)
            Swal.fire({
                icon: 'success',
                title: 'Record Updated',
                text:'Your record has been updated successfully'
            })
        }catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text:'Failed to update record',
                showCancelButton:true,
                showConfirmButton:false
            })
            console.log(error.response?.data)
        }finally{
            const isEditing__c = {...isEditing}
            isEditing__c[field] = false
            setIsEditing(isEditing__c)
        }
        
    }
    const handleChange = (e)=>{
        const formValues_c = {...formValues}
        formValues_c[e.currentTarget.name] = e.currentTarget.value
        setFormValues(formValues_c)
        // console.log(formValues)
    }

    const {isLoading, data:profile} = useQuery(
        ["userProfile", profileId],
        ()=>getRequest({url:`da/admin/${profileId}`}),
        {
            onSuccess(response){
                console.log("Get user by id", response)
            },
            onError(error){
                console.log(error)
            },
            refetchOnWindowFocus:false
        }
    )
    
    const profileData  = profile?.data
    
    useEffect(()=>{
       
        setFormValues({
            firstName:profileData?.data.firstName,
            lastName:profileData?.data.lastName,
            email:profileData?.data.email,
            userName:profileData?.data.userName
        })
    },[profile])
    
    if(isLoading){
        return <Backdrop/>
    }
    
    return ( 
        <HomeLayout>
            <div className={styles.pageContainer}>
                

                <Header
                    title="Profile"
                    subTitle={`${user?.userName}`}
                />

                <div className={`${Pstyles.profileDisplay} d-flex`}>
                    <div>
                        <Avatar name={profileData?.data.userName} round={true} size={window.innerWidth > 768?'5rem':'4rem'}/>
                    </div>
                    <div className={`${Pstyles.username}`}>
                        {profileData?.data.firstName} {profileData?.data.lastName}
                    </div>
                </div>

                
                <div className="formBox mt-5">
                        <div className='mb-2'>
                            <label>first Name</label>
                            <div className={`${Pstyles.inputContainer} d-flex`}>
                                <Form.Control 
                                    onChange= {(e)=>handleChange(e)}
                                    name="firstName" 
                                    readOnly={user?._id !== profileId} 
                                    value={formValues.firstName}
                                    className={`${Pstyles.input}`} 
                                />
                                 {
                                    user?._id == profileId &&
                                    <button  
                                        className={`${Pstyles.editBtn}`}
                                        onClick={()=>handleEdit('firstName')}
                                    >
                                        {isEditing.firstName? <Spinner className="mx-auto" radius={20} stroke={2} />:'Edit'}
                                    </button>
                                 }
                            </div>
                        </div>

                        <div className='mb-2'>
                            <label>Last Name</label>
                            <div className={`${Pstyles.inputContainer} d-flex`}>
                                <Form.Control 
                                    onChange= {(e)=>handleChange(e)}
                                    name="lastName" 
                                    value={formValues.lastName}
                                    readOnly={user?._id !== profileId} 
                                    className={`${Pstyles.input}`}
                                />
                                {
                                    user._id===profileId && 
                                    <button  
                                        className={`${Pstyles.editBtn}`}
                                        onClick={()=>handleEdit('lastName')}
                                    >
                                        {isEditing.lastName? <Spinner className="mx-auto" radius={20} stroke={2} />:'Edit'}
                                    </button>
                                }
                            </div>
                        </div>

                        <div className='mb-2'>
                            <label>Username</label>
                            <div className={`${Pstyles.inputContainer} d-flex`}>
                                <Form.Control 
                                    onChange= {(e)=>handleChange(e)}
                                    name="userName" 
                                    value={formValues.userName}
                                    readOnly={user?._id !== profileId}
                                    className={`${Pstyles.input}`} />
                                 {
                                    user._id == profileId &&
                                    <button  
                                        className={`${Pstyles.editBtn}`}
                                        onClick={()=>handleEdit('userName')}
                                    >
                                        {isEditing.userName? <Spinner className="mx-auto" radius={20} stroke={2} />:'Edit'}
                                    </button>
                                 }
                            </div>
                        </div>

                        <div className='mb-2'>
                            <label>Email Address</label>
                            <div className={`${Pstyles.inputContainer} d-flex`}>
                                <Form.Control 
                                    onChange= {(e)=>handleChange(e)}
                                    name="email" 
                                    value={formValues.email}
                                    readOnly={user?._id !== profileId}
                                    className={`${Pstyles.input}`} />
                                 {
                                    user._id === profileId && 
                                    <button  
                                        className={`${Pstyles.editBtn}`}
                                        onClick={()=>handleEdit('email')}
                                    >
                                        {isEditing.email? <Spinner className="mx-auto" radius={20} stroke={2} />:'Edit'}
                                    </button>
                                 }
                            </div>
                        </div>

                        <div className='mb-2'>
                            <label>Admin Access</label>
                            <div className={`${Pstyles.inputContainer} d-flex`}>
                                <Form.Control 
                                    className={`${Pstyles.input}`} 
                                     readOnly={true}
                                    value={profileData?.isMainAdmin?'Level 2 Access':'Level 1 Access'}
                                />
                                {/* <button disabled={true} className={`${Pstyles.editBtn}`}>Edit</button> */}
                            </div>
                        </div>
                </div>
            </div>
        </HomeLayout>
    );
}
 
export default Profile;