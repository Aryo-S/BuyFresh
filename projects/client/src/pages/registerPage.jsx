import { useFormik } from 'formik';
import { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import * as yup from 'yup';
import Button from '../components/button';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';

export default function RegistrationPage() {
    const [getCoupon, setGetCoupon] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            phone_number: "",
            referral: ""
        },
        onSubmit: async (values) => {
            try {
                console.log(values);
                const response = await api().post(`/users/register`, {...values})
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate('/login')
                }, 3000)
            } catch (error) {
                toast.error(error.response.data.message);
            }
        },
        validationSchema: yup.object().shape({
            username: yup.string().required().min(3).max(10),
            email: yup.string().required().email(),
            password: yup.string().required().min(6),
            phone_number: yup.string().required()
                })
    });

    const handleForm = (event) => {
        const { target } = event;
        formik.setFieldValue(target.name, target.value);
    }

    const handleReferral = (e) => {
        e.preventDefault();
        // console.log('check referral');
        // setGetCoupon("true");
        // alert("Referral code succesfully applied")
        // console.log(getCoupon);
    }

    return (
        <div className=" h-[900px] md:h-[900px] bg-gradient-to-b from-green-700 to-yellow-300">
            <Toaster />
            <div className='grid place-content-center'>
                <img src="./buyfresh_logo.png" alt="app_logo" className="h-[200px]" />
            </div>
            <div className='grid place-content-center'>
                <form className='flex flex-col rounded-2xl gap-2 bg-green-700 p-5 w-[350px] md:w-[450px] lg:w-[400px]' onSubmit={formik.handleSubmit}>
                    <label className='text-white' htmlFor="" >Username</label>
                    <input type="text" id='username' name='username' onChange={formik.handleChange} value={formik.values.username} className='rounded-md p-2' />
                    <div className='text-red-500 font-bold'> {formik.errors.username} </div>
                    <label className='text-white' htmlFor="" >Email</label>
                    <input type="email" id='email' name='email' onChange={formik.handleChange} value={formik.values.email} className='rounded-md p-2' placeholder='' />
                    <div className='text-red-500 font-bold'> {formik.errors.email} </div>
                    <label className='text-white' htmlFor="" >Password</label>
                    <input type="password" id='password' name='password' onChange={formik.handleChange} value={formik.values.password} className='rounded-md p-2' />
                    <div className='text-red-500 font-bold'> {formik.errors.password} </div>
                    <label className='text-white' htmlFor="" >Phone Number</label>
                    <input type="text" id='text' name='phone_number' onChange={formik.handleChange} value={formik.values.phone_number} className='rounded-md p-2' />
                    <div className='text-red-500 font-bold'> {formik.errors.phone_number} </div>
                    <label className='text-white' htmlFor="" >Reff. Code</label>
                    <div className='flex justify-between gap-5 '>
                        <input type="text" id='referral' name='referral' onChange={formik.handleChange} value={formik.values.referral} className='rounded-md p-2 w-full' />
                        <Button text={'Confirm'} onClick={handleReferral} style={""} />
                    </div>
                    <div className='flex justify-center m-4'>
                        <Button text='Register' type='submit' style={"w-[300px]"} />
                    </div>
                </form>
            </div>
        </div>
    )
}