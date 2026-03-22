import React from 'react';

const Navbar = () => {
    return (
       <nav className="fixed top-0 w-full bg-white shadow">
  <div className="flex justify-between items-center p-4">
    <h1>LMS</h1>
    <ul className="flex gap-4">
      <li>Home</li>
      <li>Courses</li>
      <li>About</li>
      <li>Contact</li>
    </ul>
  </div>
</nav>
    );
};

export default Navbar;