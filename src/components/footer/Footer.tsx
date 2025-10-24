import { description } from '@/appData'
import Image from 'next/image'
import Link from 'next/link'
// 1. Import the mail icon from 'hi'
import { HiOutlineMail } from 'react-icons/hi'
// 2. Import the Instagram icon from 'ai' (Ant Design)
import { AiOutlineInstagram } from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className="bg-[#111] text-[#eee] py-10">
      <div className="mx-auto max-w-[1280px] px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        {/* Column 2: Quick Links */}
        <div>
          <h6 className="mb-4 text-lg font-semibold text-[#eee]">Quick Links</h6>
          <ul className="space-y-2">
            <li><Link href="/blogs" className="hover:text-[#1e90ff]">Blogs</Link></li>
          </ul>
        </div>
        {/* Column 3: Contact + Copyright */}
        <div>
          <h6 className="mb-4 text-lg font-semibold text-[#eee]">Contact & Copyright</h6>
          <ul className="space-y-2">
            <li>
              <a 
                href="mailto:alpha.instaverse@gmail.com" 
                className="hover:text-[#1e90ff] flex items-center gap-2"
              >
                <HiOutlineMail size={20} />
                alpha.instaverse@gmail.com
              </a>
            </li>
            {/* 3. Use the correct icon component */}
            <li>
              <a 
                href="https://www.instagram.com/kdrama_chinguyaa" 
                target="_blank" 
                className="hover:text-[#1e90ff] flex items-center gap-2"
              >
                <AiOutlineInstagram size={20} />
                kdrama_chinguyaa
              </a>
            </li>
          </ul>
          <p className="mt-6 text-sm text-[#eee]">Kdrama Chinguyaa ©2023-2025. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer