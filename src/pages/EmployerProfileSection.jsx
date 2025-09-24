import { useState,useEffect } from 'react'
import { getCompanyProfileFromDB, addCompanyProfileToDB,updateUserInDB } from '../firebase'

// Update employer details component
function UpdateEmployerDetails({userData, onClose, userID, onSubmit}) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [userName, setUserName] = useState(userData.name)

  const [gender, setGender] = useState("")
  const handleRadioChange = (e) => {
    setGender(e.target.value)
  }

  const handleSubmit = async () => {
    updateUserInDB(userID, userName, phoneNumber, gender).then(() => {
      alert("Cập nhật profile thành công!")
      onSubmit()
      onClose()
    }).catch((error) => {
      console.error("Error updating profile: ", error)
      alert("Failed to update profile.")
    })
  }

  

  return (
    <div className="w-full h-screen fixed top-0 left-0 right-0 overflow-auto bg-white">
      <button
        className='exit-btn'
        onClick={onClose}
      >X</button>
      <div className="w-1/2 pt-10 pb-10 mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Cập nhật profile</h1>
        <div className="flex flex-col gap-2.5 w-full">
          <span>Họ và tên:</span>
          <input
            className="input-field bg-gray-100"
            type="text" 
            placeholder="Tên đầy đủ"
            onChange={(e) => setUserName(e.target.value)}  
          />
          <span>Giới tính:</span>
          <div className='flex gap-2.5'>
            <label>
              <input 
                type="radio" 
                value="Male" 
                onChange={handleRadioChange}
                checked={gender === "Male"}
                className='mr-1'
              /> Nam
            </label>
            <label>
              <input 
                type="radio" 
                value="Female" 
                onChange={handleRadioChange}
                checked={gender === "Female"}
                className='mr-1'
              /> Nữ
            </label>
          </div>
            
          
          <span>Số điện thoại:</span>
          <input 
            type="tel" 
            className='input-field'
            placeholder='Số điện thoại của bạn'
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

        </div>
        <div className='text-center'>
          <button 
            className='primary-btn mt-10'
            onClick={handleSubmit}
          >Cập nhật</button>  
        </div>
      </div>
    </div>
  )
}
// Show employer details component
function EmployerDetails({userData, userID, onSubmit}) {
  const [editMode, setEditMode] = useState(false)
  return (
    <div className="w-full flex flex-col gap-5 mt-5 items-center">

      {editMode && 
        <UpdateEmployerDetails 
        userData={userData}
        userID={userID}
        onClose={() => setEditMode(false)}
        onSubmit={onSubmit}
        />
      }

      <div className='flex flex-col gap-2.5 w-full'>
        <div className='flex gap-2.5'>
          <span className="w-1/3 font-bold text-lg">Họ và tên:</span>
          <p>{userData.name}</p>
        </div>
        <div className='flex gap-2.5'>
          <span className="w-1/3 font-bold text-lg">Giới tính:</span>
          <p>{userData.gender || "Unknown"}</p>
        </div>
        <div className='flex gap-2.5'>
          <span className="w-1/3 font-bold text-lg">Số điện thoại:</span>
          <p>{userData.phoneNumber || "Unknown"}</p>
        </div>
        <div className='flex gap-2.5'>
          <span className="w-1/3 font-bold text-lg">Email:</span>
          <p>{userData.email || "Unknown"}</p>
        </div>
      </div>

      <button className='primary-btn' onClick={() => setEditMode(true)}>Thay đổi thông tin</button>
    </div>
  )
}

// Update company details component
function CompanySignUp({onClose, employerID, onSubmit}) {
  const [nameCompany, setNameCompany] = useState("")
  const [typeCompany, setTypeCompany] = useState("")
  const [address, setAddress] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [websiteURL, setWebsiteURL] = useState("")
  const [imageProfile, setImageProfile] = useState(null)

  const handleDroplistChange = (e) => {
    setTypeCompany(e.target.value)
  }

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
      alert("Hồ sơ cơ sở kinh doanh đã tạo xong!")
      onSubmit()
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
        <h1 className="text-4xl font-bold text-center mb-10">Thông tin cơ sở kinh doanh</h1>
        <div className="flex flex-col gap-2.5 w-full">
          <span>Tên cơ sở kinh doanh:</span>
          <input 
            required
            onChange={(e) => setNameCompany(e.target.value)}
            className="input-field"
            type="text" 
            placeholder="VD: Nhà hàng Hải Phương, Tạp hóa Thúy Quỳnh,..."/>
          <span>Kiểu kinh doanh</span>
          <select id="my-select" className='input-field cursor-pointer' onChange={handleDroplistChange} value={typeCompany}>
            <option value="">--Chọn kiểu kinh doanh--</option>
            <option value="Restaurant">Nhà hàng, quán ăn</option>
            <option value="Grocery">Tạp hóa</option>
            <option value="Clothing">Quần áo</option>
            <option value="Technology">Công nghệ, điện tử</option>
            <option value="Healthcare">Sức khỏe</option>
            <option value="Education">Giáo dục</option>
            <option value="Finance">Tài chính</option>
            <option value="Entertainment">Giải trí</option>
            <option value="Other">Khác</option>
          </select>
          <span>Địa chỉ:</span>
          <input 
            required
            onChange={(e) => setAddress(e.target.value)}
            className="input-field"
            type="text" 
            placeholder="Địa chỉ cơ sơ kinh doanh"/>
          <span>Liên lạc:</span>
          <input 
            required
            onChange={(e) => setContactNumber(e.target.value)}
            className="input-field"
            type="phone" 
            placeholder="Số điện thoại"/>
          <span>Website:</span>
          <input 
            onChange={(e) => setWebsiteURL(e.target.value)}
            className="input-field"
            type="url" 
            placeholder="Địa chỉ"/>
          <span>Ảnh hồ sơ:</span>
          <label htmlFor="fileUpload" className="input-field cursor-pointer">Tải ảnh lên</label>
          {imageProfile && 
            <div className='relative'>
              <button className='absolute right-2.5 top-2.5 text-gray-500 cursor-pointer w-6 h-6 rounded-full hover:bg-gray-100/20' onClick={() => setImageProfile(null)}>X</button>
              <img src={imageProfile} className=''/>
            </div>
          }
          <input 
            onChange={(e) => setImageProfile(URL.createObjectURL(e.target.files[0]))}
            className="hidden"
            type="file" 
            id='fileUpload'
            placeholder="Your logo"/>
        </div>
        <div className='text-center'>
          <button className='primary-btn mt-10 px-6' onClick={handleSubmit}>Submit</button>
        </div>
      </div>

    </div>
  )
}
// Company details component
function CompanyDetails({companyData, employerID, onSubmit}) {
  const [showCompanySignUp, setShowCompanySignUp] = useState(false)

  return (
    <div className="w-full flex flex-col gap-5 mt-5 mb-5">
      {companyData ? (
        <div className="flex flex-col gap-2.5 w-full">
          <div className='w-full flex justify-center items-center mb-5'>
            <img src={companyData.imageProfile || ""} alt="" className='w-20 h-20 rounded-full'/>
          </div>
          <div className='flex gap-2.5'>
            <span className="w-1/2 font-bold text-lg">Tên cơ sở kinh doanh:</span>
            <p>{companyData.nameCompany}</p>
          </div>
          <div className='flex gap-2.5'>
            <span className="w-1/2 font-bold text-lg">Kiểu kinh doanh:</span>
            <p>{companyData.typeCompany}</p>
          </div>
          <div className='flex gap-2.5'>
            <span className="w-1/2 font-bold text-lg">Địa chỉ:</span>
            <p>{companyData.address}</p>
          </div>
          <div className='flex gap-2.5'>
            <span className="w-1/2 font-bold text-lg">Số điện thoại:</span>
            <p>{companyData.contactNumber}</p>
          </div>
          <div className='flex gap-2.5'>
            <span className="w-1/2 font-bold text-lg">Website:</span>
            {companyData.websiteURL ? 
              <a href={companyData.websiteURL} className="text-blue-500 hover:underline">{companyData.websiteURL}</a>
            : <p>Empty</p>}
          </div>
          
          <div className='text-center mt-5'>
            <button 
              className='primary-btn' 
              onClick={() => setShowCompanySignUp(true)}
            >Thay đổi thông tin</button>
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
          onSubmit={onSubmit}
        />
      } 
    </div>
  )
}

// Main component
export function EmployerProfileSection({onClose, userData, companyData, userID, getData}) {
  const [clickedIndex, setClickedIndex] = useState(0)
  
  return (
    <div className="w-full h-screen fixed top-0 bg-white overflow-auto">
      <button className="exit-btn" onClick={onClose}>X</button>
      <div className="w-1/2 pt-10 pb-10 mx-auto flex flex-col items-center gap-5">
        <img src={userData.photoProfile} alt="" className="w-20 h-20 rounded-full bg-black"/>
        <h1 className="text-4xl font-bold">{userData.name}</h1>
        <p>{userData.role === "Employer" ? "Nhà tuyển dụng" : (userData.role === "Candidate" ? "Ứng viên" : "Unknown")}</p>
        <div className='w-full border-b-2 pb-5'>
          <div className="flex gap-5">
            <button 
              className={clickedIndex === 0 ? "primary-btn" : "p-2.5 bg-white text-base text-black rounded-full cursor-pointer hover:bg-gray-100"}
              onClick={() => setClickedIndex(0)}
            >Profile của tôi</button>
            <button 
              className={clickedIndex === 1 ? "primary-btn" : "p-2.5 bg-white text-base text-black rounded-full cursor-pointer hover:bg-gray-100"}
              onClick={() => setClickedIndex(1)}
            >Cơ sở kinh doanh</button>
          </div>
        </div>

        {clickedIndex === 0 && 
          <EmployerDetails userData={userData} userID={userID} onSubmit={getData}/>
        }
        {clickedIndex === 1 && 
          <CompanyDetails companyData={companyData} employerID={userID} onSubmit={getData}/>
        }
      </div>

           
    </div>
  )
}