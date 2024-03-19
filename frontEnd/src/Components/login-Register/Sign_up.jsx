import React, { useContext } from 'react';
import SignUp from './SignUp'; 

import { lrContext } from '../../context/lrContext'

export default function SignUpPop() {

  const useLrContext = () => useContext(lrContext)
  const { regState, handleToggleReg } = useLrContext();
  
    
  return (
    <>
    
    <button onClick={handleToggleReg} className="  px-4 py-2 text-xs font-bold text-black uppercase transition-all duration-150 bg-amber-300 
                rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none ease">
      Sign Up
    </button> 
    
    
    {regState && (
        <SignUp
        
        
        
        />
        )}
        
    
    
    
    </>
  )
}
