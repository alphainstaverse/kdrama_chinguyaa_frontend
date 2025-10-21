import { description } from '@/appData'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-[#111] text-[#eee] py-10">
      <div className="mx-auto max-w-[1280px] px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        {/* Column 1: About / Site Info */}
        <div>
          <Link href="/" className="mb-6 flex items-center gap-4 text-[#eee]">
            <Image src="/images/kdrama_chinguyaa.png" alt="Kdrama Chinguyaa Logo" width={40} height={40} />
        <span className="text-2xl font-bold tracking-wide">Kdrama Chinguyaa</span>
          </Link>
          <p className="mt-2 text-[#eee] max-w-[320px]">{description}</p>
        </div>
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
            <li><a href="mailto:alpha.instaverse@gmail.com" className="hover:text-[#1e90ff]">alpha.instaverse@gmail.com</a></li>
            <li><a href="https://www.instagram.com/kdrama_chinguya" target="_blank" className="hover:text-[#1e90ff]">Instagram: kdrama_chinguyaa</a></li>
          </ul>
          <p className="mt-6 text-sm text-[#eee]">Kdrama Chinguyaa © 2025. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
