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
    projectName: '',
    projectLink: '',
    projectDesc: ""
}

const ProjectSection = ({ enableNext }) => {
    const { resumeValue, setResumeValue } = useContext(ResumeContext);
    const [projectList, setProjectList] = useState([initialFieldState]);
    const param = useParams()

    const handleChangeTitle = (idx, e) => {
        const newEntries = [...projectList];
        const { name, value } = e.target;
        newEntries[idx][name] = value;
        setProjectList(newEntries);
    }

    const AddMoreInfo = () => {
        setProjectList([...projectList, { ...initialFieldState }]);
    }

    const RemoveInfo = () => {
        setProjectList(projectList => projectList.slice(0, -1));
    }

    const handleChangeRichText = (value, idx) => {
        const newEntries = [...projectList];
        newEntries[idx].projectDesc = value;
        setProjectList(newEntries);
    }

    useEffect(() => {
        setResumeValue({
            ...resumeValue,
            projects: projectList
        });
    }, [projectList]);

    const onSave = async () => {
        const data = {
            data: {
                projects: projectList
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

    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
                <h2 className="text-3xl uppercase font-extrabold"> Project Experience </h2>
                <p className="text-xl">
                    Let the world know about <span className="text-[22px] font-bold">Projects</span>
                </p>
                <div>
                    {
                        projectList.map((item, idx) => (
                            <div key={idx}>
                                <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                                    <div>
                                        <label className="font-semibold text-xl">Project Title :- </label>
                                        <Input
                                            required
                                            type="text"
                                            name="projectName"
                                            value={item.projectName}
                                            onChange={(e) => handleChangeTitle(idx, e)}
                                            placeholder="Ex. Name of Project"
                                        />
                                    </div>
                                    <div>
                                        <label className="font-semibold text-xl">Link :- </label>
                                        <Input
                                            required
                                            type="text"
                                            name="projectLink"
                                            value={item.projectLink}
                                            onChange={(e) => handleChangeTitle(idx, e)}
                                            placeholder="Where you have deployed or it's Github Link"
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <RichTextEditor
                                            value={item.projectDesc}
                                            onRichTextEditorChange={(value) => handleChangeRichText(value, idx)}
                                            label="Project Summary"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="flex justify-between items-end">
                    <div className="flex gap-8">
                        <Button onClick={AddMoreInfo} variant="outline" className="text-primary">
                            + Add More Projects
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
    )
}

export default ProjectSection;
