/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const ResumeContext = createContext(null)

export const ResumeProvider = ({ children }) => {
    const [resumeValue, setResumeValue] = useState({
        projects: [],
        experience: []
    });

    return (
        <ResumeContext.Provider value={{ resumeValue, setResumeValue }}>
            {children}
        </ResumeContext.Provider>
    );
};