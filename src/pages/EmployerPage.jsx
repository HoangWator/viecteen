import { useState,useEffect } from 'react'
import { addCompanyProfileToDB } from '../firebase'

function AddJobPost({onClose}) {
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    description: '',
    location: '',
    employmentType: '',
    payType: '',
    salary: '',
    requirements: '',
    tags: '',
    status: true, // true for 'Open', false for 'Closed'
  });

  // Handle changes for all form inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // You can add logic here to send the data to an API
  };

  return (
    <div className="w-full h-screen fixed top-0 left-0 right-0 min-h-screen p-4 sm:p-6 lg:p-8 bg-white overflow-auto">
      <button className='exit-btn' onClick={onClose}>X</button>
      <div className="w-full mx-auto bg-white p-6 sm:p-10 rounded-3xl border-none">
        {/* Header Section */}
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight">Create a New Job Post</h1>
          <p className="text-gray-500 mt-2 text-base font-light">Fill out the details below to post a new job opening.</p>
        </header>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Job Title and Company Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-semibold text-gray-700">Job Title</label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                className="input-field mt-1"
                placeholder="e.g., Senior Software Engineer"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-gray-700">Company / User</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className='input-field mt-1'
                placeholder="e.g., Acme Inc."
              />
            </div>
          </div>

          {/* Job Description Section */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Job Description</label>
            <textarea
              id="description"
              name="description"
              rows="6"
              value={formData.description}
              onChange={handleChange}
              required
              className='input-field mt-1'
              placeholder="Provide a detailed description of the job responsibilities, company culture, and what the ideal candidate looks like."
            ></textarea>
          </div>

          {/* Location, Employment Type, Pay Type, and Salary Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className='input-field mt-1'
                placeholder="e.g., San Francisco, CA or Remote"
              />
            </div>
            <div>
              <label htmlFor="employmentType" className="block text-sm font-semibold text-gray-700">Employment Type</label>
              <select
                id="employmentType"
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                required
                className='input-field mt-1'

              >
                <option value="">Select a type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div>
              <label htmlFor="payType" className="block text-sm font-semibold text-gray-700">Pay Type</label>
              <select
                id="payType"
                name="payType"
                value={formData.payType}
                onChange={handleChange}
                required
                className='input-field mt-1'
              >
                <option value="">Select pay type</option>
                <option value="hourly">Hourly</option>
                <option value="salary">Salary</option>
                <option value="commission">Commission</option>
              </select>
            </div>
            <div>
              <label htmlFor="salary" className="block text-sm font-semibold text-gray-700">Salary</label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="$50,000 - $70,000"
                className='input-field mt-1'
              />
            </div>
          </div>

          {/* Requirements and Tags Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="requirements" className="block text-sm font-semibold text-gray-700">Requirements</label>
              <textarea
                id="requirements"
                name="requirements"
                rows="4"
                value={formData.requirements}
                onChange={handleChange}
                className='input-field mt-1'
                placeholder="List key skills, qualifications, and experience required for the role."
              ></textarea>
            </div>
            <div>
              <label htmlFor="tags" className="block text-sm font-semibold text-gray-700">Tags</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g., Remote, UI/UX, Design"
                className='input-field mt-1'
              />
              <p className="mt-2 text-xs text-gray-500">Separate tags with commas.</p>
            </div>
          </div>

          {/* Job Status Section */}
          <div className="flex items-center justify-between bg-blue-50 p-4 rounded-xl shadow-inner">
            <span className="text-base font-bold text-blue-900">Job Status</span>
            <div className="flex items-center space-x-4">
              <span className={`font-bold transition-colors duration-300 ${formData.status ? 'text-green-600' : 'text-red-600'}`}>
                {formData.status ? 'Open' : 'Closed'}
              </span>
              <label htmlFor="statusToggle" className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="statusToggle"
                  name="status"
                  checked={formData.status}
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
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export function EmployerPage({employerID}) {
  const [showJobPostForm, setShowJobPostForm] = useState(false)
  return (
    <div className="p-10">
      <button 
        className='primary-btn'
        onClick={() => setShowJobPostForm(true)}
      >Add Job Post</button>
      {showJobPostForm && <AddJobPost onClose={() => setShowJobPostForm(false)}/>}
    </div>
  )
}