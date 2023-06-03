import HashLoader from "react-spinners/HashLoader";
import { useState, CSSProperties } from "react";
import React from 'react';
import { useSelector } from "react-redux";


const Loader = () => {

    
  return (
  
      <div className="absolute w-full h-full bottom-0 z-50 top-0 left-0 flex flex-col place-content-center place-items-center bg-white">
        <div className="w-full h-full flex place-content-center place-items-center">
          <img src="/gif/circle-loader.gif" className="w-1/6" alt="loading" />
          <h3 className="p-5 text-primary font-semibold tracking-widest text-2xl">LOADING</h3>
          <p className="text-center text-md">This may take few seconds...</p>
        </div>
        </div>

  );
};

export default Loader;
