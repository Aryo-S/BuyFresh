import { FaInstagram } from "react-icons/fa6";
import { BsFacebook } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
    return (
        <div>

            <div className="h-[5px] bg-gradient-to-r from-yellow-300 to-green-600 "></div>
            <div className="grid place-items-center gap-5 text-green-900 py-10 ">
                <div>Follow Us:</div>
                <div className="flex gap-10 text-xl">
                    <div>
                        <a href="https://www.instagram.com/"><FaInstagram /></a>
                    </div>
                    <div>
                        <a href="https://www.facebook.com/"><BsFacebook /></a>
                    </div>
                    <div>
                        <a href="https://twitter.com/"><FaXTwitter /></a>
                    </div>
                </div>
                <div className="px-10 text-sm text-center">Copyright © 2023 BuyFresh. All rights reserved. Your fresh, online grocery shopping experience.</div>
            </div>
        </div >
    )
}

export default Footer