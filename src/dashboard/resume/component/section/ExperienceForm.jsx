/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { ResumeContext } from "../../../../context/ResumeContext";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import RichTextEditor from "../RichTextEditor";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { toast } from "sonner";

const initialFieldState = {
    title: '',
    companyName: '',
    city: "",
    state: "",
    startDate: "",
    endDate: "",
    workSummary: ""
};

const ExperienceForm = ({ enableNext }) => {
    const { resumeValue, setResumeValue } = useContext(ResumeContext);
    const [experienceList, setExperienceList] = useState([initialFieldState]);
    const param = useParams();

    // Update experience list from context if available
    // useEffect(() => {
    //     if (resumeValue?.experience) {
    //         setExperienceList(resumeValue.experience);
    //     }
    // }, [resumeValue]);

    const handleChange = (idx, e) => {
        const newEntries = [...experienceList];
        const { name, value } = e.target;
        newEntries[idx][name] = value;
        setExperienceList(newEntries);
    };

    const AddMoreInfo = () => {
        setExperienceList([...experienceList, { ...initialFieldState }]);
    };

    const RemoveInfo = () => {
        setExperienceList(prev => prev.slice(0, -1));
    };

    const handleChangeRichText = (value, idx) => {
        const newEntries = [...experienceList];
        newEntries[idx].workSummary = value;
        setExperienceList(newEntries);
    };

    const onSave = async () => {
        const data = {
            data: {
                experience: experienceList
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

    // Update resume context when experienceList changes
    useEffect(() => {
        setResumeValue(prev => ({
            ...prev,
            experience: experienceList
        }));
    }, [experienceList, setResumeValue]);

    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
                <h2 className="text-3xl uppercase font-extrabold"> Professional Experience </h2>
                <p className="text-xl">
                    Let the world know about <span className="text-[22px] font-bold">Experience</span>
                </p>
                <div>
                    {experienceList.map((item, idx) => (
                        <div key={idx}>
                            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                                <div>
                                    <label className="font-semibold text-xl">Job Title :- </label>
                                    <Input
                                        required
                                        type="text"
                                        name="title"
                                        value={item.title}
                                        onChange={(e) => handleChange(idx, e)}
                                        placeholder="Ex. Intern, Software Engineer"
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold text-xl">Name of Company :- </label>
                                    <Input
                                        required
                                        type="text"
                                        name="companyName"
                                        value={item.companyName}
                                        onChange={(e) => handleChange(idx, e)}
                                        placeholder="Ex. what's your company name"
                                    />
                                </div>

                                <div>
                                    <label className="font-semibold text-xl">City :- </label>
                                    <Input
                                        required
                                        type="text"
                                        name="city"
                                        value={item.city}
                                        onChange={(e) => handleChange(idx, e)}
                                        placeholder="Ex. Nagpur"
                                    />
                                </div>

                                <div>
                                    <label className="font-semibold text-xl">State :- </label>
                                    <Input
                                        required
                                        type="text"
                                        name="state"
                                        value={item.state}
                                        onChange={(e) => handleChange(idx, e)}
                                        placeholder="Ex. Maharashtra"
                                    />
                                </div>

                                <div>
                                    <label className="font-semibold text-xl">Starting Date :- </label>
                                    <Input
                                        required
                                        type="date"
                                        name="startDate"
                                        value={item.startDate}
                                        onChange={(e) => handleChange(idx, e)}
                                        placeholder="Ex. Starting Date of your job"
                                    />
                                </div>

                                <div>
                                    <label className="font-semibold text-xl">Ending Date :- </label>
                                    <Input
                                        required
                                        type="date"
                                        name="endDate"
                                        value={item.endDate}
                                        onChange={(e) => handleChange(idx, e)}
                                        placeholder="Ex. Ending Date of your job"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <RichTextEditor
                                        value={item.workSummary}
                                        onRichTextEditorChange={(value) => handleChangeRichText(value, idx)}
                                        label="Work Summary"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-end">
                    <div className="flex gap-8">
                        <Button onClick={AddMoreInfo} variant="outline" className="text-primary">
                            + Add More Experience
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
        </div>
    );
};

export default ExperienceForm;
