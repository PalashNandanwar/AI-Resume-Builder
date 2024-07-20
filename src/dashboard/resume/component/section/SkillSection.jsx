/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { ResumeContext } from "../../../../context/ResumeContext";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import GlobalApi from "../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const SkillSection = ({ enableNext }) => {
    const param = useParams();
    const { resumeValue, setResumeValue } = useContext(ResumeContext);
    const [formData, setFormData] = useState(resumeValue || {});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        setResumeValue((prevResumeValue) => ({
            ...prevResumeValue,
            [name]: value,
        }));

        enableNext(true);
    };

    useEffect(() => {
        console.log('formData:', formData);
        console.log('param.resumeId:', param.resumeId);
    }, [formData, param.resumeId]);

    const onSave = (e) => {
        e.preventDefault();
        const data = {
            language: formData.language,
            framework: formData.framework,
            db: formData.db
        };

        console.log('Data being sent:', { data });

        GlobalApi.updateResumeData(param.resumeId, { data })
            .then((res) => {
                console.log('API Response:', res);
                if (res.status === 200 || res.status === 201) {
                    console.log('Data saved successfully');
                    enableNext(true);
                    toast.success("Details Updated");
                } else {
                    console.error('Failed to save data', res);
                    enableNext(false);
                    toast.error("Server Error, Please check the code");
                }
            })
            .catch((err) => {
                console.error('API Error:', err);
                enableNext(false);
            });
    };

    return (
        <>
            <div>
                <h1 className="text-2xl uppercase font-bold"> Add your skills:- </h1>
                <p>Show how much skills you have gained ...</p>
                <h2 className="text-xl uppercase font-bold"> Languages :- </h2>
                <form onSubmit={onSave} className="grid gap-3 border p-3 my-5 rounded-lg">
                    <div className="flex flex-col gap-3 mt-4">
                        <label className="font-semibold text-xl"> Input Languages :- </label>
                        <Input
                            onChange={handleInputChange}
                            value={formData.language || ""}
                            required
                            type="text"
                            name="language"
                            placeholder="Ex. Java, C++, Python"
                        />
                    </div>
                    <div className="flex flex-col gap-3 mt-4">
                        <label className="font-semibold text-xl"> Input Framework :- </label>
                        <Input
                            onChange={handleInputChange}
                            value={formData.framework || ""}
                            required
                            type="text"
                            name="framework"
                            placeholder="Ex. React, Next.js"
                        />
                    </div>
                    <div className="flex flex-col gap-3 mt-4">
                        <label className="font-semibold text-xl"> Input Databases :- </label>
                        <Input
                            onChange={handleInputChange}
                            value={formData.db || ""}
                            required
                            type="text"
                            name="db"
                            placeholder="Ex. SQL, MySQL, MongoDB"
                        />
                    </div>

                    <div className="mt-3 flex justify-end">
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SkillSection;
