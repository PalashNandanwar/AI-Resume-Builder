/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../component/FormSection";
import PreviewSection from "../../component/PreviewSection";
import dummy from "../../../../../data/dummy";
import { ResumeContext } from "../../../../context/ResumeContext";
import GlobalApi from "../../../../../service/GlobalApi";

const EditResume = () => {
    const params = useParams();
    const [resumeValue, setResumeValue] = useState(); // Initialize with null

    useEffect(() => {
        // console.log(params.resumeId)
        setResumeValue();
        getResume()
    }, []);

    const getResume = () => {
        GlobalApi.GetResumeById(params.resumeId)
            .then(res => {
                console.log(res.data.data);
                setResumeValue(res.data.data)
            })
    }

    return (
        <>
            <ResumeContext.Provider value={{ resumeValue, setResumeValue }}>
                <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
                    <FormSection />
                    <PreviewSection />
                </div>
            </ResumeContext.Provider>
        </>
    )
}

export default EditResume;
