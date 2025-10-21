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
    return pathname === link
      ? 'rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-[#767E94]'
      : 'text-slate-500'
  }

  return (
    <nav className="fixed top-0 left-0 w-full h-[80px] z-[1000] bg-white border-b border-gray-200 shadow-sm flex items-center" style={{ padding: '0 24px' }}>
      <div className="mx-auto w-full max-w-[1280px] flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* logo */}
          <Link href="/" className="inline-flex items-center gap-2 cursor-pointer">
            <Image src="/images/kdrama_chinguyaa.png" alt="Kdrama Chinguyaa Logo" width={40} height={40} />
        <span className="text-xl font-bold tracking-wide">Kdrama Chinguyaa</span>
          </Link>
          {/* nav links with gap */}
          <div className="flex items-center gap-4 ml-8">
            {navLinks.map(({ title, link }, index) => (
              <Link
                key={index}
                href={link}
                className={`uppercase font-semibold text-[16px] px-3 py-2 transition-colors duration-100 ease-linear hover:text-[#1e90ff] ${isActive(link)}`}
                aria-label={`Go to ${title} page`}>
                {title}
              </Link>
            ))}
          </div>
          {/* hamburger menu or cross icon */}
          <button onClick={handleShowNav} aria-label="Toggle Menu" className="md:hidden">
            {showNav ? (
              <XIcon color="#202020" strokeWidth={3} size={25} />
            ) : (
              <MenuIcon color="#202020" strokeWidth={3} size={25} />
            )}
          </button>
        </div>
        {/* Search icon and CTA button */}
        <div className="flex items-center gap-6">
          {/* Search icon */}
          <button aria-label="Search" className="p-2 hover:bg-gray-100 rounded-full">
            <svg width="20" height="20" fill="none" stroke="#1e90ff" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          <a
            href="mailto:alpha.instaverse@gmail.com"
            type="button"
            className="rounded-lg border bg-[#1e90ff] px-4 py-2 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-blue-600 focus:z-10 focus:outline-hidden focus:ring-4 focus:ring-gray-100 sm:px-5 sm:py-2.5">
            Write for us
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar
