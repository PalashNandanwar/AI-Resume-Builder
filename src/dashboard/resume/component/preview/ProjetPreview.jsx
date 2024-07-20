/* eslint-disable react/prop-types */
// import React from 'react'

const ProjectPreview = ({ resumeValue }) => {
    return (
        <>
            {resumeValue?.projects?.length > 0 && <h1 className="text-2xl font-bold">Projects :-</h1>}
            {resumeValue?.projects?.map((project, idx) => {
                return (
                    <div key={idx}>
                        <h1 className="text-xl font-semibold">{project?.projectName}</h1>
                        <a href={project.projectLink}>
                            <span className="text-[18px] font-semibold">Link :- </span> {project.projectLink}
                        </a>
                        {/* <ul className="list-disc ml-5">
                            {project.projectDesc?.map((desc, descIdx) => (
                                <li key={descIdx}>
                                    {desc.desc}
                                </li>
                            ))}
                        </ul> */}
                        <div dangerouslySetInnerHTML={{ __html: project?.projectDesc }} />
                    </div>
                );
            })}
            <hr className="border-[1.5px] border-black my-3" />
        </>
    );
}

export default ProjectPreview;
