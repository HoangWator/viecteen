import React from 'react';
import { useState } from 'react';
import { app, auth, providerGoogle } from '../firebase.js';
import { FacebookAuthProvider ,signInWithPopup } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import { addUserToDB,getUserFromDB } from '../firebase.js';

export function SelectRole({onClose,data,onUserData}) {
  const addUser = (role) => {
    addUserToDB(data.displayName, data.uid, role, data.photoURL, data.email)
    onUserData(data.uid)
    onClose()
  }
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 fixed top-0 left-0 right-0">
      <div 
        className="w-10 h-10 flex justify-center items-center rounded-full cursor-pointer hover:bg-gray-200 absolute left-2.5 top-2.5"
        onClick={() => onClose()}
      >X</div>
      <div className="w-1/2 p-5 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl">Tạo tài khoản</h1>
        <h2 className="text-xl">Bạn là:</h2>
        <div className="flex gap-4 mt-4">
          <button 
            className="w-1/2 p-10 border rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => addUser("Candidate")}
          >Ứng viên</button>
          <button 
            className="w-1/2 p-10 border rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => addUser("Employer")}
          >Nhà tuyển dụng</button>
        </div>
        
      </div>

    </div>
  );
}

export function SignUpPage({onClose, onUserData}) {
  

  const [showSelectRole, setShowSelectRole] = useState(false);
  const [userData, setUserData] = useState(null);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, providerGoogle)
      setUserData(result.user)

      const userDataDB = await getUserFromDB(result.user.uid)
      if (userDataDB) {
        // User already exists in DB
        onUserData(result.user.uid)
        onClose()
      }
      else {
        // New user, need to select role
        setShowSelectRole(true)
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-full h-screen fixed top-0 bg-gray-100 flex items-center justify-center overflow-auto">
      <button 
        onClick={() => onClose()}
        className='exit-btn'
      >X</button>
      <div>
        <h1 className='text-primary text-center text-4xl mb-10'>Đăng nhập</h1>
        <div className="flex flex-col gap-3.5 items-center">
          <form action="" className=''>
            <input 
              className="p-2.5 bg-gray-200 rounded-lg outline-none cursor-pointer block mb-2.5 hover:bg-gray-300" 
              type="email" 
              placeholder='Email'
            />
            <input 
              className="p-2.5 bg-gray-200 rounded-lg outline-none cursor-pointer block mb-2.5 hover:bg-gray-300" 
              type="password" 
              placeholder='Mật khẩu'
            />
            <div className='flex justify-center'>

              <button className='primary-btn float-right' type="submit">Đăng nhập</button>
            </div>
          </form>
          <p className='text-center mb-2.5'>Hoặc</p>
          <div className='flex flex-col justify-center items-center'>
            <button 
              className="primary-btn"
              onClick={signInWithGoogle}
            >Đăng nhập với Google</button>
            {/* <button 
              className="primary-btn mt-2.5"
              onClick={() => signInWithFacebook()}
            >Sign in with Facebook</button> */}
          </div>
        </div>
      </div>
      {showSelectRole && 
        <SelectRole 
          onClose={() => {
            setShowSelectRole(false)
            onClose()
          }}
          data={userData}
          onUserData={onUserData}
        />
      }
    </div>
  )
}

