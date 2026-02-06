import React, { useState } from 'react'

const NavBAr = () => {
  const [open, setOpen] = useState(false)

  const links = [
      { name: 'About Us', href: '#about' },
    { name: 'How it Works', href: '#how' },
    { name: 'Contact', href: '#contact' },
  ]
  return (
    <header className="w-full bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-blue-500 flex items-center justify-center text-white font-bold">HC</div>
              <span className="text-xl font-semibold">HealthCore</span>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex items-center space-x-6">
              {links.map((l) => (
                <li key={l.name}>
                  <a href={l.href} className="text-gray-700 hover:text-blue-700">
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <a href="#login" className="text-gray-600 hover:text-gray-900">Login</a>
              <a href="#signup" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Sign Up</a>
            </div>
          </div>

          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {open ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-gray-100">
          <div className="px-4 pt-4 pb-4 space-y-3">
            {links.map((l) => (
              <a key={l.name} href={l.href} className="block text-gray-700 py-2">{l.name}</a>
            ))}
            <a href="#login" className="block text-gray-700 py-2">Login</a>
            <a href="#signup" className="block px-4 py-2 bg-blue-600 text-white rounded-md text-center">Sign Up</a>
          </div>
        </div>
      )}
    </header>
  )
}

export default NavBAr
