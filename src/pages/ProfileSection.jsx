import { useState,useEffect } from 'react'
import { getCompanyProfileFromDB, addCompanyProfileToDB } from '../firebase'

function ProfileDetails({userData}) {
  return (
    <div className="w-full flex flex-col gap-5 mt-5 items-center">
      <p>Tell more about yourself</p>
      <button className='primary-btn'>Update your profile</button>
    </div>
  )
}

function CompanySignUp({onClose, employerID}) {
  const [nameCompany, setNameCompany] = useState("")
  const [typeCompany, setTypeCompany] = useState("")
  const [address, setAddress] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [websiteURL, setWebsiteURL] = useState("")
  const [imageProfile, setImageProfile] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // You can add validation here if needed

    // Call the function to add company profile to the database
    addCompanyProfileToDB(
      employerID, // Replace with actual user ID
      nameCompany,
      typeCompany,
      address,
      contactNumber,
      websiteURL,
      imageProfile
    ).then(() => {
      alert("Company profile created successfully!")
      onClose()
    }).catch((error) => {
      console.error("Error creating company profile: ", error)
      alert("Failed to create company profile.")
    })
  }
  return (
    <div className="w-full h-screen fixed top-0 left-0 right-0 overflow-auto bg-white">
      <button
        className='exit-btn'
        onClick={onClose}
      >X</button>
      <div className="w-1/2 pt-10 pb-10 mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Update business profile</h1>
        <div className="flex flex-col gap-2.5 w-full">
          <span>Business name:</span>
          <input 
            required
            onChange={(e) => setNameCompany(e.target.value)}
            className="input-field"
            type="text" 
            placeholder="Business name (Eg: Nhà hàng Hải Phương, Tạp hóa Thúy Quỳnh,...)"/>
          <span>Type of business</span>
          <input 
            required
            onChange={(e) => setTypeCompany(e.target.value)}
            className="input-field"
            type="text" 
            placeholder="Type of company.."/>
          <span>Address:</span>
          <input 
            required
            onChange={(e) => setAddress(e.target.value)}
            className="input-field"
            type="text" 
            placeholder="Your address"/>
          <span>Contact number:</span>
          <input 
            required
            onChange={(e) => setContactNumber(e.target.value)}
            className="input-field"
            type="phone" 
            placeholder="Phone number"/>
          <span>Your website:</span>
          <input 
            onChange={(e) => setWebsiteURL(e.target.value)}
            className="input-field"
            type="url" 
            placeholder="Your website url"/>
          <span>Image profile:</span>
          <input 
            onChange={(e) => setImageProfile(e.target.files[0])}
            className="input-field cursor-pointer"
            type="file" 
            placeholder="Your logo"/>
        </div>
        <div className='text-center'>
          <button className='primary-btn mt-10 px-6' onClick={handleSubmit}>Submit</button>
        </div>
      </div>

    </div>
  )
}

function CompanyDetails({companyData, employerID}) {
  const [showCompanySignUp, setShowCompanySignUp] = useState(false)


  return (
    <div className="w-full flex flex-col gap-5 mt-5 mb-5">
      {companyData ? (
        <div className="flex flex-col gap-2.5 w-full">
          <div className='flex gap-2.5'>
            <span className="w-1/3 font-bold text-lg">Business Name:</span>
            <p>{companyData.nameCompany}</p>
          </div>
          <div className='flex gap-2.5'>
            <span className="w-1/3 font-bold text-lg">Type of Business:</span>
            <p>{companyData.typeCompany}</p>
          </div>
          <div className='flex gap-2.5'>
            <span className="w-1/3 font-bold text-lg">Address:</span>
            <p>{companyData.address}</p>
          </div>
          <div className='flex gap-2.5'>
            <span className="w-1/3 font-bold text-lg">Contact Number:</span>
            <p>{companyData.contactNumber}</p>
          </div>
          <div className='flex gap-2.5'>
            <span className="w-1/3 font-bold text-lg">Website:</span>
            {companyData.websiteURL ? 
              <a href={companyData.websiteURL} className="text-blue-500 hover:underline">{companyData.websiteURL}</a>
            : <p>Empty</p>}
          </div>
          <div className='flex gap-2.5'>
            <span className="w-1/3 font-bold text-lg">Image Profile:</span>
            {companyData.imageProfile ? <img src={companyData.imageProfile} alt="Company Profile" className="w-32 h-32 object-cover"/> : <p>Empty</p>}
          </div>
          
          <div className='text-center mt-5'>
            <button 
              className='primary-btn' 
              onClick={() => setShowCompanySignUp(true)}
            >Update business profile</button>
          </div>

        </div>
      ) : (
        <div className='flex flex-col gap-2.5 items-center'>
          <p>You have not created a business profile yet.</p>
          <button 
            className='primary-btn mt-2.5'
            onClick={() => setShowCompanySignUp(true)}>Create business profile</button>
        </div>
      )}


      {showCompanySignUp && 
        <CompanySignUp 
          onClose={() => {
            setShowCompanySignUp(false)
          }}
          employerID={employerID}
        />
      } 
    </div>
  )
}

export function ProfileSection({onClose, userData, companyData, userID}) {
  const [clickedIndex, setClickedIndex] = useState(0)
  const [pageIndex, setPageIndex] = useState(0)
  return (
    <div className="w-full h-screen fixed top-0 bg-white overflow-auto">
      <button className="exit-btn" onClick={onClose}>X</button>
      <div className="w-1/2 pt-10 pb-10 mx-auto flex flex-col items-center gap-5">
        <img src={userData.photoProfile} alt="" className="w-20 h-20 rounded-full bg-black"/>
        <h1 className="text-4xl font-bold">{userData.name}</h1>
        <p>{userData.role}</p>
        <div className='w-full border-b-2 pb-5'>
          <div className="flex gap-5">
            <button 
              className={clickedIndex === 0 ? "primary-btn" : "p-2.5 bg-white text-base text-black rounded-full cursor-pointer hover:bg-gray-100"}
              onClick={() => setClickedIndex(0)}
            >My profile</button>
            <button 
              className={clickedIndex === 1 ? "primary-btn" : "p-2.5 bg-white text-base text-black rounded-full cursor-pointer hover:bg-gray-100"}
              onClick={() => setClickedIndex(1)}
            >My business</button>
          </div>
        </div>

        {clickedIndex === 0 && 
          <ProfileDetails userData={userData}/>
        }
        {clickedIndex === 1 && 
          <CompanyDetails companyData={companyData} employerID={userID}/>
        }
      </div>

           
    </div>
  )
}