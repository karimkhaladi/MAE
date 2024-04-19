import React from 'react'
import { Link } from 'react-router-dom';
import { BsTelephone } from 'react-icons/bs'
import { FaFacebook, FaGlobe, FaLinkedin, FaTwitter } from "react-icons/fa";
import footer from '../photos/imgfooter.png'
import { CiLocationOn } from 'react-icons/ci';
import { IoLogoInstagram } from 'react-icons/io';
function Footer() {
  return (
    <footer className='mt-10'>
        <div className="border-t-2">
            <div className='px-3 py-3 text-white bg-[#9EBF43] '>
                <div className='py-2  text-center md:text-left md:text-sm mx-auto md:flex flex-wrap md:flex-nowrap  items-center justify-between'>
                    <div className='flex-1 p-3 md:px-20'>
                        <Link to='/'>
                            <img src={footer} className='md:w-32 hidden md:block ' alt="" />
                        </Link>
                    </div>
                    <div className='flex-1 '>
                        <p className='py-1'>Particuliers</p>
                        <p className='py-1'>Professionnels/Entreprises</p>
                        <p className='py-1'>Associations</p>
                        <p className='py-1'>Tout sur nous </p>
                        <p className='py-1'>Contact</p>
                    </div>

                    <div className='flex-1'>
                        <p className='py-1'>Avenue Ouled Haffouz Bab El khadra 1075 Tunis</p>
                        <p className='py-1' >Tel : 70020300</p>
                        <p className='py-1'>Fax : 71 324 147</p>                       
                        <p className='py-1'>E-mail : mae.assurances@mae.tn</p>
                    </div>
                </div>
                </div>
                <div className='flex items-center px-4 flex-wrap md:flex-nowrap justify-between border-t-2 border-[#DDDDDD]'>
                    <p>&copy;2024 hotel</p>
                    <div className='flex items-center gap-4 py-2 md:py-0'>
                        <FaFacebook />
                        <IoLogoInstagram />
                        <FaTwitter />
                        <FaLinkedin />
                    </div>
            </div>

        </div>
    </footer>
  )
}

export default Footer