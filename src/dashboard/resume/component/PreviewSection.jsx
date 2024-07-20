/* eslint-disable no-unused-vars */
// import React from 'react'

import { useContext } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import { ResumeContext } from "../../../context/ResumeContext";
import SummarySectionPreview from "./preview/SummarySectionPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import SkillsPreview from "./preview/SkillsPreview";
import ProjectPreview from "./preview/ProjetPreview";
import EducationPreview from "./preview/EducationPreview";

const PreviewSection = () => {
    const { resumeValue, setResumeValue } = useContext(ResumeContext);

    return (
        <div className=" shadow-lg h-full px-10 py-5 border-t-[20px]"
            style={{
                borderColor: resumeValue?.themeColor
            }}>
            {/* Personal Details */}
            <PersonalDetailPreview resumeValue={resumeValue} />

            {/* Summary */}
            <SummarySectionPreview resumeValue={resumeValue} />

            {/* Skills */}
            <SkillsPreview resumeValue={resumeValue} />

            {/* Professional Experience */}
            <ExperiencePreview resumeValue={resumeValue} />

            {/* Projects  */}
            <ProjectPreview resumeValue={resumeValue} />

            {/* Education */}
            <EducationPreview resumeValue={resumeValue} />
        </div>
    );
};

export default PreviewSection;
