// src/components/Home.jsx
import React from 'react';
import Navbar from './Navbar';

const Home = ({ user }) => {
  return (
    <div className='bg-bgblue min-h-screen flex flex-col items-center justify-center text-textwhite'>
      <Navbar />
      <div className='max-w-2xl mx-auto flex flex-col items-center justify-center space-y-8'>
        <h1 className='text-5xl font-bold'>Linker</h1>
        <p className='text-xl text-center'>Sign in to create a Linker.</p>
      </div>
    </div>
  );
};

export default Home;