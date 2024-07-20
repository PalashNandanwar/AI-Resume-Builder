/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { ResumeContext } from "../../../../context/ResumeContext";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { toast } from "sonner";

const initialFieldState = {
    schoolName: "",
    degree: "",
    endD: "",
    major: "",
    address: "",
    percentage: ""
};

const EducationSection = ({ enableNext }) => {
    const { resumeValue, setResumeValue } = useContext(ResumeContext);
    const param = useParams();
    const [educationList, setEducationList] = useState([initialFieldState]);

    const handleChange = (e, idx) => {
        const { name, value } = e.target;
        const newEntries = [...educationList];
        newEntries[idx][name] = value;
        setEducationList(newEntries);
    };

    const AddMoreInfo = () => {
        setEducationList([...educationList, { ...initialFieldState }]);
    };

    const RemoveInfo = () => {
        if (educationList.length > 1) {
            setEducationList(educationList.slice(0, -1));
        }
    };

    const onSave = async () => {
        const data = {
            data: {
                education: educationList
            }
        };

        console.log("Payload to be sent:", data);

        try {
            const response = await GlobalApi.updateResumeData(param.resumeId, data);
            console.log("Response:", response);
            toast.success("Details Updated");
        } catch (error) {
            console.error("Error updating resume:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
            }
            toast.error("Server Error, Please check the code");
        }
    };

    useEffect(() => {
        setResumeValue({
            ...resumeValue,
            education: educationList
        });
    }, [educationList]);

    return (
        <>
            <div>
                <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
                    <h2 className="text-3xl uppercase font-extrabold">Education Details</h2>
                    <p className="text-xl">
                        Show how much you are <span className="text-[22px] font-bold">Educated</span>
                    </p>
                </div>

                <div>
                    {educationList.map((item, idx) => (
                        <div key={idx}>
                            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                                <div className="col-span-2">
                                    <label className="font-semibold text-xl">School / College Name:</label>
                                    <Input
                                        required
                                        type="text"
                                        name="schoolName"
                                        value={item.schoolName}
                                        onChange={(e) => handleChange(e, idx)}
                                        placeholder="Ex. Intern, Software Engineer"
                                    />
                                </div>

                                <div>
                                    <label className="font-semibold text-xl">Degree:</label>
                                    <Input
                                        required
                                        type="text"
                                        name="degree"
                                        value={item.degree}
                                        onChange={(e) => handleChange(e, idx)}
                                        placeholder="Ex. 12 Board, BTech"
                                    />
                                </div>

                                <div>
                                    <label className="font-semibold text-xl">End Date:</label>
                                    <Input
                                        required
                                        type="date"
                                        name="endD"
                                        value={item.endD}
                                        onChange={(e) => handleChange(e, idx)}
                                        placeholder="Ex. Date when your School / College ended"
                                    />
                                </div>

                                <div>
                                    <label className="font-semibold text-xl">Major:</label>
                                    <Input
                                        required
                                        type="text"
                                        name="major"
                                        value={item.major}
                                        onChange={(e) => handleChange(e, idx)}
                                        placeholder="Computer Science Engineering"
                                    />
                                </div>

                                <div>
                                    <label className="font-semibold text-xl">School / College Address:</label>
                                    <Input
                                        required
                                        type="text"
                                        name="address"
                                        value={item.address}
                                        onChange={(e) => handleChange(e, idx)}
                                        placeholder="Ex. Nagpur, Maharashtra"
                                    />
                                </div>

                                <div>
                                    <label className="font-semibold text-xl">Percentage / CGPA:</label>
                                    <Input
                                        required
                                        type="text"
                                        name="percentage"
                                        value={item.percentage}
                                        onChange={(e) => handleChange(e, idx)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-end">
                    <div className="flex gap-8">
                        <Button onClick={AddMoreInfo} variant="outline" className="text-primary">
                            + Add More Education
                        </Button>

                        <Button onClick={RemoveInfo} variant="secondary" className="text-black">
                            Remove
                        </Button>
                    </div>
                    <Button onClick={onSave}>
                        Save
                    </Button>
                </div>
            </div>
        </>
    );
};

export default EducationSection;
4