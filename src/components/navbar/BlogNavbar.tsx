'use client'
import { MenuIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { AiOutlineInstagram } from 'react-icons/ai'

const navLinks = [
  { title: 'Home', link: '/' },
  { title: 'Blogs', link: '/blogs' },
]

const Navbar = () => {
  const [showNav, setShowNav] = useState(false)
  const pathname = usePathname()

  const handleShowNav = () => {
    setShowNav(!showNav)
  }

  const isActive = (link: string) => {
    const desktopStyle = pathname === link
      ? 'rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-[#767E94]'
      : 'text-slate-500'
    
    const mobileStyle = pathname === link
      ? 'bg-gray-100 font-bold text-[#1e90ff]'
      : 'text-gray-700'

    return { desktop: desktopStyle, mobile: mobileStyle }
  }

  return (
    <>
      {/* 1. MAIN HEADER BAR (No change) */}
      <nav className="fixed top-0 left-0 w-full h-[80px] z-[1000] bg-white border-b border-gray-200 shadow-sm flex items-center" style={{ padding: '0 24px' }}>
        <div className="mx-auto w-full max-w-[1280px] flex items-center relative"> 
          <button 
              onClick={handleShowNav} 
              aria-label="Toggle Menu" 
              className="md:hidden z-20 order-1 mr-4"
          >
            {!showNav && (
              <MenuIcon color="#202020" strokeWidth={3} size={25} />
            )}
          </button>
          <div className="
              absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0 
              md:order-1 flex items-center gap-2 cursor-pointer 
              z-10 order-2
          ">
            <Link href="/" onClick={() => setShowNav(false)} className="inline-flex items-center gap-2">
              <Image src="/images/kdrama_chinguyaa.png" alt="Kdrama Chinguyaa Logo" width={40} height={40} />
              <span className="text-xl font-bold tracking-wide">Kdrama Chinguyaa</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-4 ml-8 md:order-1"> 
            {navLinks.map(({ title, link }, index) => (
              <Link
                key={index}
                href={link}
                className={`uppercase font-semibold text-[16px] px-3 py-2 transition-colors duration-100 ease-linear hover:text-[#1e90ff] ${isActive(link).desktop}`}
                aria-label={`Go to ${title} page`}>
                {title}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* 2. SLIDE-OUT PANEL */}
      <div className={`
          md:hidden fixed top-0 left-0 h-screen w-3/4 max-w-xs bg-white shadow-lg 
          transition-transform duration-300 ease-in-out 
          z-[1010] 
          ${showNav ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col
          
          /* --- 1. ADDED PADDING FOR SAFE AREA --- */
          pb-[env(safe-area-inset-bottom)]
      `}>
        {/* Panel Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-4 h-[80px] border-b border-gray-200" style={{ padding: '0 24px' }}>
          <button onClick={handleShowNav} aria-label="Close menu">
            <XIcon color="#202020" strokeWidth={3} size={25} />
          </button>
          
          <div className="flex items-center gap-2">
            <Image src="/images/kdrama_chinguyaa.png" alt="Kdrama Chinguyaa Logo" width={40} height={40} />
            <span className="text-xl font-bold tracking-wide">Kdrama Chinguyaa</span>
          </div>
        </div>

        {/* Panel Links */}
        {/* --- 2. ADDED OVERFLOW-Y-AUTO --- */}
        <div className="flex-grow flex flex-col p-4 space-y-2 overflow-y-auto">
          {navLinks.map(({ title, link }, index) => (
            <Link
              key={index}
              href={link}
              onClick={handleShowNav} 
              className={`text-lg p-3 transition-colors duration-100 ease-linear hover:bg-gray-100 rounded-lg ${isActive(link).mobile}`}
              aria-label={`Go to ${title} page`}>
              {title}
            </Link> 
          ))}
        </div>

        {/* Panel Footer */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200">
          <h6 className="mb-3 text-xs font-semibold text-gray-400 uppercase">Contact & Copyright</h6>
          <ul className="space-y-3">
            <li>
              <a 
                href="mailto:alpha.instaverse@gmail.com" 
                className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#1e90ff]"
              >
                <HiOutlineMail size={18} />
                <span>alpha.instaverse@gmail.com</span>
              </a>
            </li>
            <li>
              <a 
                href="https://www.instagram.com/kdrama_chinguyaa" 
                target="_blank" 
                className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#1e90ff]"
              >
                <AiOutlineInstagram size={18} />
                <span>kdrama_chinguyaa</span>
              </a>
            </li>
          </ul>
          <p className="mt-4 text-xs text-gray-500">
            Kdrama Chinguyaa © 2025. All rights reserved.
          </p>
        </div>
      </div>

      {/* 3. OVERLAY (No change) */}
      {showNav && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-[1005]"
          onClick={handleShowNav}
        ></div>
      )}
    </>
  )
}

export default Navbar