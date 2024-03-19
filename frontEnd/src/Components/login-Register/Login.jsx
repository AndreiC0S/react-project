import {React, useContext} from 'react';
import LoginPopup from './LoginPopup';
 import { lrContext } from '../../context/lrContext'


export default function Login({isUser}) {

  const useLrContext = () => useContext(lrContext)
  
  const { logState, handleToggleLog } = useLrContext();

    
  
    
  return (
    <>
    
    <button onClick={handleToggleLog} className="  mr-5 font-medium hover:text-amber-300">
      Login
    </button> 
    
    
    {logState && (
        <LoginPopup
        
        isUser = {isUser}
        
        />
        )}
        
    
    
    
    </>
  )
}
