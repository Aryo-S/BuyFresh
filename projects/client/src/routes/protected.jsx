import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function Protected({ children, adminPage, userPage, guestPage, superadminPage, loginOnly }) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const user = useSelector((state) => state.users)
    const isLogin = localStorage.getItem("accessToken")
    useEffect(() => {
        if (user.role !== "" && guestPage) return setTimeout(() => {
            setLoading(false)
        }, 1500), navigate('/')

        if (user && user.role == "" && loginOnly && !isLogin) return setTimeout(() => {
            setLoading(false)
        }, 1500), navigate('/')

        if (user && user.role == "customer" && (adminPage || superadminPage)) return setTimeout(() => {
            setLoading(false)
        }, 1500), navigate('/')

        if (user && user.role == "admin" && (userPage || superadminPage)) return setTimeout(() => {
            setLoading(false)
        }, 1500), navigate('/admin-dashboard')

        if (user && user.role == "superadmin" && (userPage)) return setTimeout(() => {
            setLoading(false)
        }, 1500), navigate('/admin-dashboard')



        setTimeout(() => {
            setLoading(false)
        }, 3000)

    }, [children, user]);

    return (
        <>
            {
                loading ?
                    <div className="h-screen bg-gradient-to-r from-yellow-300 to-green-700 grid place-content-center">

                        <div className="">
                            <div className="grid place-content-center">
                                <img src={"./buyfresh_logo.png"} alt="app_logo" className="h-[250px] w-[250px] md:h-[350px] md:w-[350px]" />
                            </div>
                            <div className="grid place-content-center">
                                <span className="loading loading-dots w-[50px] text-green-800"></span>
                            </div>
                        </div>

                    </div>
                    :
                    children
            }
        </>
    )
}