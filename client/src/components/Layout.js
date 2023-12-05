import React from 'react';
import imageKM from '../assets/KM-color-black-background.png.jpg';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-500 text-white py-4 text-center">
        <img src={imageKM} alt="Imagen de nutrición" className="mx-auto w-40 mb-4 " sizes='' />
      </header>
      <main className="flex-grow container mx-auto py-8 px-4">
        {children}
      </main>
      <footer className="bg-gray-200 text-gray-600 py-4 text-center">
        <p>&copy; 2023</p>
      </footer>
    </div>
  );
};

export default Layout;
