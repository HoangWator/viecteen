import { useState,useEffect } from 'react'
import { addJobPostToDB,getCompanyProfileFromDB,getUserFromDB,getJobPostFromDB,deleteJobPostInDB } from '../firebase'
import { Loader } from './Loader'



function AddJobPost({onClose, employerID, fetchJobPosts}) {
  const [userData, setUserData] = useState(null)
  const [businessData, setBusinessData] = useState(null)
  const [showDropDown, setShowDropdown] = useState(false)
  
  // Individual state hooks for each field
  const [jobTitle, setJobTitle] = useState('')
  const [typePostOwner, setTypePostOwner] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [employmentType, setEmploymentType] = useState('')
  const [payType, setPayType] = useState('')
  const [salary, setSalary] = useState('')
  const [requirements, setRequirements] = useState('')
  const [age, setAge] = useState('')
  const [tags, setTags] = useState('')
  const [status, setStatus] = useState(true)

  // Handle changes for all form inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    switch(name) {
      case 'jobTitle': setJobTitle(value); break;
      case 'typePostOwner': setTypePostOwner(value); break;
      case 'description': setDescription(value); break;
      case 'location': setLocation(value); break;
      case 'employmentType': setEmploymentType(value); break;
      case 'payType': setPayType(value); break;
      case 'salary': setSalary(value); break;
      case 'requirements': setRequirements(value); break;
      case 'age': setAge(value); break;
      case 'tags': setTags(value); break;
      case 'status': setStatus(checked); break;
    }
    setShowDropdown(false)
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    setShowLoader(true)
    e.preventDefault();
    const formData = {
      jobTitle,
      typePostOwner,
      description,
      location,
      employmentType,
      payType,
      salary,
      requirements,
      age,
      tags,
      status,
      ownerID: employerID || ''
    };
    console.log('Form data submitted:', formData);
    await addJobPostToDB(formData, employerID);
    await fetchJobPosts();
    setShowLoader(false)
    onClose();
    // You can add logic here to send the data to an API
  };

  useEffect(() => {
    if (employerID) {
      getUserFromDB(employerID).then((data) => {
        setUserData(data)
      })
      getCompanyProfileFromDB(employerID).then((data) => {
        setBusinessData(data)
      })
    }
  }, [])

  return (
    <div className="w-full h-screen fixed top-0 left-0 right-0 min-h-screen p-4 sm:p-6 lg:p-8 bg-white overflow-auto">
      <button className='exit-btn' onClick={onClose}>X</button>
      <div className="w-full mx-auto bg-white p-6 sm:p-10 rounded-3xl border-none">
        {/* Header Section */}
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight">Tạo tin tuyển dụng</h1>
          <p className="text-gray-500 mt-2 text-base font-light">Điền đầy đủ thông tin để tạo tin tuyển dụng.</p>
        </header>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Job Title and Company Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-semibold text-gray-700">Tên công việc</label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={jobTitle}
                onChange={handleChange}
                required
                className="input-field mt-1"
                placeholder="VD: Thu ngân, bồi bàn,..."
              />
            </div>
            <div className='relative'>
              <label htmlFor="company" className="block text-sm font-semibold text-gray-700">Người đăng bài</label>
              <input
                type="text"
                id="company"
                name="typePostOwner"
                value={typePostOwner === "user" ? userData.name : typePostOwner === "business" ? businessData.nameCompany : ''}
                onChange={handleChange}
                required
                className='input-field mt-1'
                placeholder="VD: Nguyễn Văn A, Quán phở 666,..."
                onClick={() => setShowDropdown(true)}
              />
              {
                showDropDown && 
                  <div className='w-full shadow-xl p-2 rounded-lg mt-2 absolute bg-white'>
                    <div className='overflow-hidden'>
                      <button 
                        className='float-right w-6 h-6 rounded-full cursor-pointer hover:bg-gray-100'
                        onClick={() => setShowDropdown(false)}
                      >X</button>
                    </div>
                    {userData && 
                      <div 
                        className="flex items-center space-x-3 rounded-lg p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setShowDropdown(false)
                          setTypePostOwner("user")
                        }}
                      >
                        <img src={userData.photoProfile} alt="User Profile" className="w-8 h-8 rounded-full" />
                        <span className="text-sm font-medium text-gray-700">{userData.name}</span>
                      </div>
                    }
                    {businessData && 
                      <div 
                        className="flex items-center space-x-3 rounded-lg p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setShowDropdown(false)
                          setTypePostOwner("business")
                        }}
                      >
                        <img src={businessData.imageProfile || ""} alt="" className='w-8 h-8 rounded-full'/>
                        <span className="text-sm font-medium text-gray-700">{businessData.nameCompany}</span>
                      </div>
                    }
                  </div>
              }
            </div>
          </div>

          {/* Job Description Section */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Mô tả công việc</label>
            <textarea
              id="description"
              name="description"
              rows="6"
              value={description}
              onChange={handleChange}
              required
              className='input-field mt-1'
              placeholder="Mô tả về công việc như môi trường làm việc, đãi ngộ,..."
            ></textarea>
          </div>

          {/* Location, Employment Type, Pay Type, and Salary Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700">Vị trí</label>
              <input
                type="text"
                id="location"
                name="location"
                value={location}
                onChange={handleChange}
                required
                className='input-field mt-1'
                placeholder="Ví dụ: Tp HCM, Đà Nẵng,..."
              />
            </div>
            <div>
              <label htmlFor="employmentType" className="block text-sm font-semibold text-gray-700">Kiểu công việc</label>
              <select
                id="employmentType"
                name="employmentType"
                value={employmentType}
                onChange={handleChange}
                required
                className='input-field mt-1'
              >
                <option value="">Chọn kiểu công việc</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Hợp đồng</option>
                <option value="internship">Thực tập</option>
              </select>
            </div>
            <div>
              <label htmlFor="payType" className="block text-sm font-semibold text-gray-700">Kiểu trả lương</label>
              <select
                id="payType"
                name="payType"
                value={payType}
                onChange={handleChange}
                required
                className='input-field mt-1'
              >
                <option value="">Chọn kiểu trả lương</option>
                <option value="hourly">Theo giờ</option>
                <option value="salary">Theo tháng</option>
                <option value="commission">Theo kết quả công việc</option>
              </select>
            </div>
            <div>
              <label htmlFor="salary" className="block text-sm font-semibold text-gray-700">Lương</label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={salary}
                onChange={handleChange}
                placeholder="100.000 vnd"
                className='input-field mt-1'
              />
            </div>
          </div>

          {/* Requirements and Tags Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="requirements" className="block text-sm font-semibold text-gray-700">Yêu cầu công việc</label>
              <textarea
                id="requirements"
                name="requirements"
                rows="4"
                value={requirements}
                onChange={handleChange}
                className='input-field mt-1'
                placeholder="Kinh nghiệm, bằng cấp, kĩ năng cần thiết,..."
              ></textarea>
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-semibold text-gray-700">Yêu cầu độ tuổi</label>
              <textarea
                id="age"
                name="age"
                rows="4"
                value={age}
                onChange={handleChange}
                className='input-field mt-1'
                placeholder="Độ tuổi tối thiểu"
              ></textarea>
            </div>

          </div>
          <div>
            <label htmlFor="tags" className="block text-sm font-semibold text-gray-700">Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={tags}
              onChange={handleChange}
              placeholder="VD: "
              className='input-field mt-1'
            />
            <p className="mt-2 text-xs text-gray-500">Phân việt tags với dấu phẩy.</p>
          </div>

          {/* Job Status Section */}
          <div className="flex items-center justify-between bg-blue-50 p-4 rounded-xl shadow-inner">
            <span className="text-base font-bold text-blue-900">Trạng thái tin tuyển dụng</span>
            <div className="flex items-center space-x-4">
              <span className={`font-bold transition-colors duration-300 ${status ? 'text-green-600' : 'text-red-600'}`}>
                {status ? 'Mở' : 'Đóng'}
              </span>
              <label htmlFor="statusToggle" className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="statusToggle"
                  name="status"
                  checked={status}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-[26px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* Form Submission Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className='primary-btn'
            >
              Đăng tin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export function EmployerPage({employerID}) {
  const [showJobPostForm, setShowJobPostForm] = useState(false)
  const [jobPosts, setJobPosts] = useState([])

  const fetchJobPosts = async () => {
    if (employerID) {
      const userData = await getUserFromDB(employerID)
      const jobPostIDs = userData.jobPosts || []
      const jobs = await Promise.all(jobPostIDs.map((jobID) => getJobPostFromDB(jobID)))
      setJobPosts(jobs)
    }
  }
  const deleteJobPost = async (postID, employerID) => {
    await deleteJobPostInDB(postID, employerID)
    await fetchJobPosts()
  }

  useEffect(() => {
    fetchJobPosts()
  }, [])

  return (
    <div className="p-10">
      <button 
        className='primary-btn'
        onClick={() => setShowJobPostForm(true)}
      >Tạo tin tuyển dụng</button>
      {showJobPostForm && 
        <AddJobPost 
          onClose={() => setShowJobPostForm(false)}
          employerID={employerID}
          fetchJobPosts={fetchJobPosts}
        />
      }

      <h1 className='mt-5 text-3xl'>Tin tuyển dụng của tôi</h1>
      {jobPosts.length === 0 && <p className='mt-2 text-gray-500'>Bạn chưa đăng bài đăng nào.</p>}

      {jobPosts.length > 0 &&
        <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {jobPosts.map((job, index) => (
            <div key={index} className='border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300'>
              <h2 className='text-xl font-bold text-blue-900'>{job.jobTitle}</h2>
              <p className='mt-2 text-gray-700'>{job.description}</p>
              <p className='mt-2 text-sm text-gray-500'><span className='font-semibold'>Độ tuổi tối thiểu:</span> {job.age}</p>
              <p className='mt-2 text-sm text-gray-500'><span className='font-semibold'>Vị trí:</span> {job.location}</p>
              <p className='mt-1 text-sm text-gray-500'><span className='font-semibold'>Kiểu việc làm:</span> {job.employmentType}</p>
              <p className='mt-1 text-sm text-gray-500'><span className='font-semibold'>Trả lương theo:</span> {job.payType}</p>
              <p className='mt-1 text-sm text-gray-500'><span className='font-semibold'>Lương:</span> {job.salary}</p>
              <p className='mt-1 text-sm text-gray-500'><span className='font-semibold'>Trạng thái:</span> {job.status ? 'Open' : 'Closed'}</p>
              <p className='mt-1 text-sm text-gray-500'><span className='font-semibold'>Tags:</span> {job.tags}</p>
              <button className='primary-btn bg-red-500 mt-2.5' onClick={async () => deleteJobPost(job.id, employerID)}>Xóa tin</button>
            </div>
          ))}
        </div>
      }
    </div>
  )
}