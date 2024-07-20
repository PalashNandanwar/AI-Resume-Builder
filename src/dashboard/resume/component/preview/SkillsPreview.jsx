/* eslint-disable react/prop-types */
// import React from 'react';

const SkillsPreview = ({ resumeValue }) => {
    return (
        <div>
            <h1 className="text-2xl font-bold">Skills</h1>
            <ul>
                <li className="flex flex-row gap-1">
                    <span className="font-bold text-[17px]">Language:</span>
                    <p>{resumeValue?.language}</p>
                </li>

                <li className="flex flex-row gap-1">
                    <span className="font-bold text-[17px]">Framework:</span>
                    <p>{resumeValue?.framework}</p>
                </li>

                <li className="flex flex-row gap-1">
                    <span className="font-bold text-[17px]">Databases:</span>
                    <p>{resumeValue?.db}</p>
                </li>
            </ul>

            <hr className="border-[1.5px] border-black my-3" />
        </div>
    );
}

export default SkillsPreview;
