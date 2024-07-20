/* eslint-disable react/prop-types */
// import React from 'react'

const PersonalDetailPreview = ({ resumeValue }) => {
  return (
    <>
      <div>
        <h2 className=" font-bold text-xl text-center">
          {resumeValue?.firstName} {resumeValue?.lastName}
        </h2>
        <div className=" flex justify-between">
          <h6 className=" text-sm font-bold">
            {resumeValue?.phone}
          </h6>
          <h6 className=" text-sm font-bold">
            {resumeValue?.email}
          </h6>
        </div>
        <h2 className=" text-center text-sm font-medium">
          {resumeValue?.jobTitle}
        </h2>
        <hr className=" border-[1.5px] border-black my-3" />
      </div>
    </>
  )
}

export default PersonalDetailPreview