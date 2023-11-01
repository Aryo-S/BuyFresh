import Navbar from "../../components/navbarUser"
import Footer from "../../components/footer"
import Button from "../../components/button"
import axios from "axios";
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from "react-hot-toast";
import debounce from 'lodash/debounce';
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";

const UpdatePasswordPage = () => {
    const navigate = useNavigate()
    const apiInstance = api()   

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        onSubmit: async (values) => {
            try {
                const updatePassword = await api().patch('/users/update-password', null, {headers: {"oldpassword": formik.values.oldPassword, "newpassword": formik.values.newPassword, "confirmpassword": formik.values.confirmPassword }})
                toast.success('Password has been updated')
            } catch (error) {
                toast.error(error.response.data.message);
            }
            
        },
        validationSchema: yup.object().shape({
            oldPassword: yup.string().required().min(6, 'Must be 6 characters atleast'),
            newPassword: yup.string().required().min(6, 'Must be 6 characters atleast'),
            confirmPassword: yup.string().required().min(6, 'Must be 6 characters atleast').oneOf([yup.ref('newPassword')], `Password must match`)
        })
    });
    const handleForm = (event) => {
        const { target } = event;
        formik.setFieldValue(target.name, target.value);
    }
    const debouncedHandleSubmit = debounce(() => {
        // formik.handleSubmit();
        // setTimeout(() => {
        //     navigate('/profile')
        // }, 1500);
    }, 1000);

    return (
        <div>
            <Toaster />
            <Navbar />
            <div className="mt-[70px]">
                <div className="mx-5 mt-5 md:mx-36 lg:mx-64 flex text-4xl font-bold gap-2 py-5 pl-5 text-green-800">   
                    <div className="grid place-content-center"><AiFillEdit /></div>
                        Update Password 
                </div>
                <form onSubmit={(formik.handleSubmit)}>
                    <div className=" mx-5 md:p-10 md:mx-36 lg:mx-64 flex flex-col gap-3 border p-3 py-5 rounded-xl shadow-lg">
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-green-800">Old Password</div>
                        <input type="password" onChange={formik.handleChange} name="oldPassword" className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.oldPassword} />
                        <div className=" pl-3 text-red-600">{formik.errors.oldPassword}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-green-800">New Password</div>
                        <input type="password" onChange={formik.handleChange} name="newPassword" className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.newPassword} />
                        <div className="pl-3 text-red-600">{formik.errors.newPassword}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-green-800">Confirm Password</div>
                        <input type="password" onChange={formik.handleChange} name="confirmPassword" className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.confirmPassword} />
                        <div className="pl-3 text-red-600">{formik.errors.confirmPassword}</div>
                    </div>
                </div>
                <div className="grid place-content-center m-10">
                    <Button type="submit" text={"Submit Changes"} />
                </div>
            </form>
            </div>
            <Footer />
        </div>
    )
}   
export default UpdatePasswordPage