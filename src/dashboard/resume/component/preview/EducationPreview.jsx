/* eslint-disable react/prop-types */
// import React from 'react'

const EducationPreview = ({ resumeValue }) => {
    return (
        <>
            <h1 className="text-2xl font-bold" > Education :- </h1>
            {
                resumeValue?.education?.map((edu, idx) => {
                    return (
                        <>
                            <div key={idx}>
                                <h1 className="text-[21px] font-bold">{edu?.degree} in {edu?.major}</h1>
                                <p>
                                    {edu?.schoolName} * {edu?.address} * {edu?.endD} * {edu?.percentage}
                                </p>
                            </div>
                        </>
                    )
                })
            }
        </>
    )
}

export default EducationPreview