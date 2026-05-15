import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import logo from '../assets/logo.png'; 

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1120] text-gray-300 pt-16 border-t border-dveinBlue/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* About */}
          <div className="space-y-6">
            <img src={logo} alt="DVein" className="h-14 w-auto bg-white rounded p-1" />
            <p className="text-sm leading-relaxed text-gray-400">
              Transforming ideas into digital reality. DVein Innovations is your partner for custom software, training, and career growth.
            </p>
            {/* Social Icons - Always Original Colors */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-[#1877F2] hover:scale-110 transition-transform hover:shadow-md border border-gray-100">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-[#1DA1F2] hover:scale-110 transition-transform hover:shadow-md border border-gray-100">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-[#E4405F] hover:scale-110 transition-transform hover:shadow-md border border-gray-100">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-[#0A66C2] hover:scale-110 transition-transform hover:shadow-md border border-gray-100">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Reach Us */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 border-b-2 border-dveinGreen inline-block pb-1 font-heading">Reach Us</h3>
            <ul className="space-y-6 text-sm">
              <li className="flex gap-4 items-start">
                <FaMapMarkerAlt className="text-dveinGreen mt-1 text-lg shrink-0" />
                <span className="leading-relaxed">
                  Alpha City IT Park, No.25, OMR, Navalur, Chennai – 600130
                </span>
              </li>
              <li className="flex gap-4 items-center hover:text-dveinGreen transition-colors">
                <FaPhoneAlt className="text-dveinGreen text-lg" />
                <span>+91 95001 81230</span>
              </li>
              <li className="flex gap-4 items-center hover:text-dveinGreen transition-colors">
                <FaEnvelope className="text-dveinGreen text-lg" />
                <span>info@dveininnovations.com</span>
              </li>
            </ul>
          </div>

          {/* Map - FIXED STABLE LINK */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 border-b-2 border-dveinGreen inline-block pb-1 font-heading">Locate Us</h3>
            {/* Apply the 'map-glow' class here for animation */}
            <div className="w-full h-48 rounded-xl overflow-hidden border-2 border-dveinGreen map-glow transition-all shadow-lg bg-gray-800">
               <iframe 
                title="DVein Location"
                className="w-full h-full"
                // This is the Public/Universal Embed Link
                src="https://maps.google.com/maps?q=Alpha%20City%20SSPDL%20Navalur&t=&z=15&ie=UTF8&iwloc=&output=embed"
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {currentYear} DVein Innovations. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;