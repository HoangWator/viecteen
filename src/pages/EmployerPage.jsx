import { useState,useEffect } from 'react'
import { addCompanyProfileToDB } from '../firebase'

function AddJobPost() {
  return <button>Add Job Post</button>
}


export function EmployerPage({employerID}) {
  const [showCreateCompanyProfile, setShowCreateCompanyProfile] = useState(false)

  return (
    <div>
      <h1 className="text-xl"></h1>
      
    </div>
  )
}