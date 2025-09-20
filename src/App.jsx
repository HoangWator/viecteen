import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { SignUpPage } from './pages/CreateAccount'
import { EmployerPage } from './pages/EmployerPage'
import { CandidatePage } from './pages/CandidatePage'
import { ProfileSection } from './pages/ProfileSection'

import { getAuth,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getUserFromDB,getCompanyProfileFromDB,signOutGoogle, checkAuthStatus } from './firebase'


function App() {
  const [showCreateAccount, setShowCreateAccount] = useState(false)
  const [userData, setUserData] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [userID, setUserID] = useState(null)
  const [companyData, setCompanyData] = useState(null)
  const [showProfileSection, setShowProfileSection] = useState(false)


  const handleUserData = (uid) => {
    getUserFromDB(uid).then((data) => {
      setUserData(data)
      setUserRole(data.role)
    })
    setUserID(uid)
  }

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user)
        setUserID(uid)
        console.log("User is signed in with UID:", uid)
        const userDataFromDB = await getUserFromDB(uid)
        setUserData(userDataFromDB)
        setUserRole(userDataFromDB.role)
        const companyProfile = await getCompanyProfileFromDB(uid)
        setCompanyData(companyProfile)
      } else {
        console.log("No user is signed in.")
      }
    });
  }, [])

  
  console.log("User Data in App:", userData)

  return (
    <div className="">
      <div className="nav w-full h-15 bg-white flex items-center justify-between px-10">
        <h1 className='text-3xl'>viecteen</h1>
        <div className="account-management flex items-center">
          {userData && 
            <button 
              className="cursor-pointer mr-2.5"
              onClick={async () => {
                setShowProfileSection(true)
                const userDataFromDB = await getUserFromDB(userID)
                setUserData(userDataFromDB)
                const companyProfile = await getCompanyProfileFromDB(userID)
                setCompanyData(companyProfile)
              }}
            >See my profile</button>
          }
          {userData && <img src={userData.photoProfile} className='w-8 h-8 rounded-full bg-black flex justify-center items-center'/>}
          {!userData && <button className="login-button cursor-pointer" onClick={() => setShowCreateAccount(true)}>Sign up</button>}
          {userData && <button className="logout-button cursor-pointer ml-2.5" onClick={() => {signOutGoogle(); setUserData(null); setUserRole(null)}}>Log out</button>}
        </div>
      </div>
      {showCreateAccount && 
        <SignUpPage 
          onClose={() => setShowCreateAccount(false)}
          onUserData={handleUserData}
        />
      }
      {
        userRole === "Employer" && <EmployerPage employerID={userID}/>
      }
      {
        userRole === "Candidate" && <CandidatePage />
      }
      {
        showProfileSection && 
          <ProfileSection 
            onClose={() => setShowProfileSection(false)} 
            userData={userData}
            companyData={companyData}
            userID={userID}
          />  
      }
    </div>
  )
}

export default App
