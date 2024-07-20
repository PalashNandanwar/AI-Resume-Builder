/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from "react";
import { ResumeContext } from "../../../../context/ResumeContext";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { toast } from "sonner";

const PersonalSection = ({ enableNext }) => {
    const param = useParams();
    const { resumeValue, setResumeValue } = useContext(ResumeContext);
    const [formData, setFormData] = useState(resumeValue || {});

    useEffect(() => {
        console.log("Params:", param);
    }, [param]);

    const handleInputChange = (e) => {
        enableNext(false);

        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setResumeValue((prevResumeValue) => ({
            ...prevResumeValue,
            [name]: value,
        }));
    };

    const onSave = async (e) => {
        e.preventDefault();
        try {
            const data = {
                ...formData,
            };

            const response = await GlobalApi.updateResumeData(param.resumeId, { data });
            console.log('Response:', response);
            enableNext(true);
            toast.success("Details updated successfully");
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.data) {
                toast.error(`Error: ${error.response.data.message}`);
            } else {
                toast.error("An unknown error occurred.");
            }
            enableNext(false);
        }
    };

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
            <h2 className="text-3xl uppercase font-extrabold">Personal Section</h2>
            <p className="text-xl">
                Let's fill your <span className="text-[22px] font-bold">Personal Section</span>
            </p>

            <form onSubmit={onSave}>
                <div className="grid grid-cols-2 mt-5 gap-3">
                    <div>
                        <label className="font-semibold text-xl">First Name :- </label>
                        <Input name="firstName" value={formData.firstName || ""} placeholder="Ex. John " required onChange={handleInputChange} />
                    </div>

                    <div>
                        <label className="font-semibold text-xl">Last Name :- </label>
                        <Input name="lastName" value={formData.lastName || ""} placeholder="Ex. Doe " required onChange={handleInputChange} />
                    </div>

                    <div className="col-span-2">
                        <label className="font-semibold text-xl">Job Title :- </label>
                        <Input name="jobTitle" value={formData.jobTitle || ""} placeholder="Ex. Front-End Developer " required onChange={handleInputChange} />
                    </div>

                    <div>
                        <label className="font-semibold text-xl">Contact No. :- </label>
                        <Input name="phone" value={formData.phone || ""} placeholder="Ex. 0000011111 " required onChange={handleInputChange} />
                    </div>

                    <div>
                        <label className="font-semibold text-xl">Email :- </label>
                        <Input name="email" value={formData.email || ""} placeholder="Ex. abc@gmail.com " required onChange={handleInputChange} />
                    </div>
                </div>

                <div className="mt-3 flex justify-end">
                    <Button type="submit">
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PersonalSection;
