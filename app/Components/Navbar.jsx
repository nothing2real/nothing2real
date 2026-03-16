"use client"
import React from 'react';
import StaggeredMenu from './StaggeredMenu';
// 1. Imports must be at the very top

const Navbar = () => {
  // 2. Define your data/logic outside the return statement
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'studio', ariaLabel: 'Learn about us', link: '/studio' },
    { label: 'Process', ariaLabel: 'View our services', link: '/process' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
  ];

  const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
  ];

  return (
    // 3. Keep the JSX clean
    <nav className="fixed top-0 left-0 w-full z-[9]">
      <div style={{ height: '90vh', pointerEvents: 'none' }}> 
        {/* pointerEvents: 'none' ensures the container doesn't block card scrolls, 
            the menu button itself will usually have its own pointer-events: auto */}
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering={true}
          menuButtonColor="#252525"
          openMenuButtonColor="#252525"
          changeMenuColorOnOpen={true}
          colors={['#FFA500', '#252525']}
          logoUrl="/path-to-your-logo.svg"
          accentColor="#5227FF"
          onMenuOpen={() => console.log('Menu opened')}
          onMenuClose={() => console.log('Menu closed')}
        />
      </div>
    </nav>
  );
};

export default Navbar;