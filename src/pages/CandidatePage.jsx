import {useState, useEffect} from 'react'

import { getAllJobsFromDB,getUserFromDB } from "../firebase"

export function CandidatePage({candidateID}) {
  const [jobs, setJobs] = useState([])
  useEffect(() => {
    async function getAllJobs() {
      const jobsFromDB = await getAllJobsFromDB()
      setJobs(jobsFromDB)
    }
    getAllJobs()
  }, [])

  function JobPostItem({jobData}) {
    const [postOwnerData, setPostOwnerData] = useState('')
    useEffect(() => {
      async function updatePostOwnerDetail() {
        if (jobData.ownerID && jobData.typePostOwner === 'user') {
          const postOwnerData = await getUserFromDB(jobData.ownerID)
          setPostOwnerData(postOwnerData)
        }
        else if (jobData.ownerID && jobData.typePostOwner === 'employer') {
    
        }
      }
      updatePostOwnerDetail()
    }, [])
    return (
      <div className='border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300'>
        <h2 className='text-xl font-bold text-blue-900'>{jobData.jobTitle}</h2>
        <div className='flex gap-2.5 items-center  mt-2.5'>
          <img className='w-5 h-5 rounded-full' src={postOwnerData.photoProfile} alt="" />
          <span>{postOwnerData.name}</span>
        </div>
        <p className='mt-2 text-gray-700'>{jobData.description}</p>
        <p className='mt-2 text-sm text-gray-500'><span className='font-semibold'>Location:</span> {jobData.location}</p>
        <p className='mt-1 text-sm text-gray-500'><span className='font-semibold'>Employment Type:</span> {jobData.employmentType}</p>
        <p className='mt-1 text-sm text-gray-500'><span className='font-semibold'>Pay Type:</span> {jobData.payType}</p>
        <p className='mt-1 text-sm text-gray-500'><span className='font-semibold'>Salary:</span> {jobData.salary}</p>
        <p className='mt-1 text-sm text-gray-500'><span className='font-semibold'>Status:</span> <span className={jobData.status ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{jobData.status ? 'Open' : 'Closed'}</span></p>
        <p className='mt-1 text-sm text-gray-500'><span className='font-semibold'>Tags:</span> {jobData.tags}</p>
      </div>
    )
  }

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>Available Jobs</h1>
      {jobs.length > 0 && 
        <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {jobs.map((job, index) => <JobPostItem jobData={job} key={index}/>)}
        </div>
      }
    </div>
  )
}