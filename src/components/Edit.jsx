import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Create.css'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { FaUser } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoEyeOff, IoEye ,IoPhonePortraitOutline ,IoCalendarNumber} from "react-icons/io5";
import { MdPhotoCamera } from "react-icons/md";
import { ToastContainer, toast, Flip } from 'react-toastify';
import { setUser } from '../Redux/UserEdit';
import { updateUser } from '../Redux/UsersReducer';

function Edit() {
    const user = useSelector(state => state.userEdit.user)
    const [ShowPassword, setShowPassword] = useState(false)
    const fileRef = useRef(null)
    const dispatch = useDispatch()
    console.log(user);
    const Schema=yup.object().shape({
    name: yup.string().required('Name is required').matches(/^[A-Za-z\s]+$/, 'Invalid name'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required').min(8,'Password must be at least 8 characters'),
    image: yup.mixed().required('Image is required'),
    phone: yup.string().required('Phone is required').matches(/^01[0-2]\d{8}$/, 'Phone number is not valid'),
    age: yup.number().required('Age is required').moreThan(0,'Age must be greater than 0').max(100,'Invalid Age')
    })

    const { values, errors, touched, handleBlur, handleChange, handleSubmit,setFieldValue,resetForm} = useFormik({
        initialValues: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.image,
        phone: user.phone,
        age: user.age
    },
    validationSchema: Schema,
        onSubmit: (values) => {
            dispatch(updateUser(values))
            dispatch(setUser(values))
            console.log(values);
        resetForm()
        if (fileRef.current) {
        fileRef.current.value = ''
    }
    toast.success('User updated successfully', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition:Flip
    });
    }
    })
    useEffect(()=>{
    setFieldValue('name',user.name)
    setFieldValue('email',user.email)
    setFieldValue('password',user.password)
    setFieldValue('image',user.image)
    setFieldValue('phone',user.phone)
    setFieldValue('age',user.age)
    }, [user, setFieldValue])
    
    function handleImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        setFieldValue('image', reader.result);
    };
    }
    function handleFormSubmit(e) {
    handleSubmit(values)
    e.preventDefault()
    }
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-12 d-flex flex-column vh-100 justify-content-center align-items-center">

                    <Link reloadDocument className='  align-self-start ' to='/'>Home</Link>
                    <h1>Edit User</h1>

                    <form onSubmit={handleFormSubmit} className='col-6 d-flex flex-column rounded p-2 row-gap-2'>
            <label htmlFor='name'>Name</label>

            <div className='col-12'>
            <input
            name='name'
            id='name'
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            type='text'
            className='form-control'
            placeholder='Enter Name'
            />
            <FaUser/>
            </div>
            {errors.name && touched.name && <p className='text-danger m-0'>{errors.name}</p> }
            <label htmlFor='email'>Email</label>
            
            <div className='col-12'>
            <input
            name='email'
            id='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type='email'
            className='form-control'
            placeholder='Enter Email'
            />
            <MdOutlineAlternateEmail/>
            </div>
            {errors.email && touched.email && <p className='text-danger m-0'>{errors.email}</p> }

            <label htmlFor='password'>Password</label>
            
            <div className='col-12'>
            <input
            name='password'
            id='password'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type={ShowPassword ? 'text' : 'password'}
            className='form-control'
            placeholder='Enter Password'
            />
            {ShowPassword ? <IoEye onClick={()=>setShowPassword(!ShowPassword)}/> : <IoEyeOff onClick={()=>setShowPassword(!ShowPassword)}/>}
            </div>
            {errors.password && touched.password && <p className='text-danger m-0'>{errors.password}</p> }

            <label htmlFor='image'>Image</label>
            
            <div className='col-12'>
                <input
                ref={fileRef}
                name='image'
                id='image'
                onChange={handleImage}
                onBlur={handleBlur}
                type='file'
                className='form-control'
                accept='image/*'
            />
            <MdPhotoCamera/>
            </div>
            {errors.image && touched.image && <p className='text-danger m-0'>{errors.image}</p> }
           
            <label htmlFor='phone'>Phone</label>
            <div className='col-12'>
            <input
            name='phone'
            id='phone'
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            type='tel'
            className='form-control'
            placeholder='Enter phone'
            />
            <IoPhonePortraitOutline/>
            </div>
            {errors.phone && touched.phone && <p className='text-danger m-0'>{errors.phone}</p> }

            <label htmlFor='age'>Age</label>
            <div className='col-12'>
                <input
                name='age'
                id='age'
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
                type='number'
                className='form-control'
                placeholder='Enter Age'
                />
                <IoCalendarNumber/>
            </div>
            {errors.age && touched.age && <p className='text-danger m-0'>{errors.age}</p> }

            <button type='submit' className='btn btn-primary col-5 align-self-center'>Update User</button>
            </form>
            <ToastContainer />
                </div>
            </div>
    </div>
)
}

export default Edit