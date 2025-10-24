'use client'
import { MenuIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

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

  // Function to determine if the link is active
  const isActive = (link: string) => {
    // This style is for desktop
    const desktopStyle = pathname === link
      ? 'rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-[#767E94]'
      : 'text-slate-500'
    
    // This style is for mobile menu
    const mobileStyle = pathname === link
      ? 'bg-gray-100 font-bold text-[#1e90ff]'
      : 'text-gray-700'

    return { desktop: desktopStyle, mobile: mobileStyle }
  }

  return (
    <nav className="fixed top-0 left-0 w-full h-[80px] z-[1000] bg-white border-b border-gray-200 shadow-sm flex items-center" style={{ padding: '0 24px' }}>
      {/* Removed 'justify-between' since we don't have far-right elements anymore, 
          but kept 'flex' and 'relative' for mobile centering */}
      <div className="mx-auto w-full max-w-[1280px] flex items-center relative"> 

        {/* 1. Hamburger/Cross Icon (Mobile Only - Far Left) */}
        <button 
            onClick={handleShowNav} 
            aria-label="Toggle Menu" 
            className="md:hidden z-20 order-1 mr-4" // Added mr-4 for spacing
        >
          {showNav ? (
            <XIcon color="#202020" strokeWidth={3} size={25} />
          ) : (
            <MenuIcon color="#202020" strokeWidth={3} size={25} />
          )}
        </button>

        {/* 2. Logo - Centered on Mobile, Left-aligned on Desktop */}
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

        {/* 3. Desktop Navigation Links (Hidden on Mobile) */}
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

        {/* 4. Search icon and CTA button section HAS BEEN REMOVED */}
        
      </div>

      {/* 5. Mobile Menu Content (Dropdown) - Show when showNav is true */}
      <div className={`md:hidden absolute top-[80px] left-0 w-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${showNav ? 'translate-y-0' : '-translate-y-[100vh]'}`}>
        <div className="flex flex-col p-4 space-y-2">
          {navLinks.map(({ title, link }, index) => (
            <Link
              key={index}
              href={link}
              onClick={handleShowNav} // Close menu on click
              className={`text-lg p-3 transition-colors duration-100 ease-linear hover:bg-gray-100 rounded-lg ${isActive(link).mobile}`}
              aria-label={`Go to ${title} page`}>
              {title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar