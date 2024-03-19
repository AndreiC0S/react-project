import React, { useState } from "react";
import AddAdmin from "../Components/adminComp/AddAdmin";
import DeleteAdmin from "../Components/adminComp/DeleteAdmin";
import AdminList from "../Components/adminComp/AdminList";

export default function Admins() {
  

  return (
    <>
      
        <div className="">
          <div className="flex absolute right-[500px]">
          <AdminList />
          </div>
           <AddAdmin /> 
        </div>
      
    </>
  );
}
