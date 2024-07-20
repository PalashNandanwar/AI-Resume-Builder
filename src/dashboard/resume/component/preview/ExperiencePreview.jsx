/* eslint-disable react/prop-types */
// import React from 'react';


const ExperiencePreview = ({ resumeValue }) => {
    return (
        <div>
            <h1 className="text-2xl uppercase font-bold">Experience:</h1>
            {resumeValue?.experience?.map((experience, idx) => (
                <div className="my-3" key={idx}>
                    <h3 className="text-[20px] font-bold">
                        {experience?.title}, {experience?.companyName}
                    </h3>
                    <div className="text-[17px] font-medium flex justify-between uppercase">
                        <h4>{experience?.startDate}</h4>
                        <h4>{experience?.endDate}</h4>
                    </div>
                    <h4>
                        <span className="font-bold">
                            {experience?.currentlyWorking ? '(Currently Working)' : null}
                        </span>
                        {experience?.city}, {experience?.state}
                    </h4>
                    
                    <div dangerouslySetInnerHTML={{ __html: experience?.workSummary }} />
                </div>
            ))}
            <hr className="border-[1.5px] border-black my-3" />
        </div>
    );
};

export default ExperiencePreview;
