/* eslint-disable react/prop-types */
// import React from 'react'

const SummarySectionPreview = ({ resumeValue }) => {
    return (
        <div>
            <span className="text-2xl font-bold"> Summary :- </span>
            <p className=" text-[12px] font-normal">
                {resumeValue?.summary}
            </p>
            <hr className=" border-[1.5px] border-black my-3" />
        </div>
    )
}

export default SummarySectionPreview