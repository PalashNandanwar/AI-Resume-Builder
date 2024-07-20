/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Textarea } from "../../../../components/ui/textarea";
import { ResumeContext } from "../../../../context/ResumeContext";
import GlobalApi from "../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { BrainIcon } from "lucide-react";
import { AIchatSession } from "../../../../../service/AIModal";
import { toast } from "sonner";

const PROMPT = "job title: {jobTitle}. Depending on the job title, give me a summary for my resume about 4 - 5 lines in JSON format with fields experience level and summary with Experience level for Fresher, Mid-Level, Experienced";

const SummarySection = ({ enableNext }) => {
    const { resumeValue, setResumeValue } = useContext(ResumeContext);
    const [summary, setSummary] = useState(resumeValue?.summary || '');
    const [aiGeneratedList, setAiGeneratedList] = useState([]);
    const param = useParams();

    useEffect(() => {
        setResumeValue((prevValue) => ({
            ...prevValue,
            summary: summary
        }));
    }, [summary]);

    const handleAIGeneratedText = async () => {
        const prompt = PROMPT.replace('{jobTitle}', resumeValue.jobTitle);
        console.log("Prompt sent to AI:", prompt);
        try {
            const res = await AIchatSession.sendMessage(prompt);
            const responseText = await res.response.text();

            // Log the full response text to identify any issues
            console.log("Full response text from AI:", responseText);

            // Attempt to find the start of the JSON object in the response
            const jsonStringStartIndex = responseText.indexOf('{');
            const jsonStringEndIndex = responseText.lastIndexOf('}') + 1;

            if (jsonStringStartIndex === -1 || jsonStringEndIndex === -1) {
                throw new Error("JSON object not found in the response");
            }

            const jsonString = responseText.substring(jsonStringStartIndex, jsonStringEndIndex);
            const aiResponse = JSON.parse(jsonString);
            console.log("Parsed AI Response:", aiResponse);
            setAiGeneratedList([aiResponse]);  // Wrap in array to match map usage
        } catch (error) {
            console.error('Error generating AI text:', error);
        }
    };

    const onSave = (e) => {
        e.preventDefault();
        const data = {
            data: {
                summary: summary
            }
        };
        GlobalApi.updateResumeData(param.resumeId, data)
            .then((res) => {
                console.log('Response:', res);
                enableNext(true);
                toast.success("Details Updated");
            })
            .catch((err) => {
                console.error('Error:', err);
                enableNext(false);
                toast.error("Server Error, Please check the code");
            });
    };

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
            <h2 className="text-3xl uppercase font-extrabold">Summary</h2>
            <p className="text-xl">
                Tell us about <span className="text-[22px] font-bold">Yourself</span>
            </p>

            <div className="flex justify-between items-end">
                <label className="text-xl font-bold">Add Summary</label>
                <Button type="button" onClick={handleAIGeneratedText} className="border-primary text-sm">
                    <BrainIcon className="mr-2" /> Generate using AI
                </Button>
            </div>
            <Textarea
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="mt-7"
                placeholder="Type your message here."
            />
            <div className="flex mt-4 justify-end">
                <Button onClick={onSave} className="text-black text-[15px]" type="submit">
                    Save
                </Button>
            </div>
            <p>
                Please check the console for the AI Generated script
            </p>

            {/* {aiGeneratedList.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold">Suggested Summaries:</h2>
                    {aiGeneratedList.map((item, idx) => (
                        <div key={idx}>
                            <h3>Level: {item.experienceLevel}</h3>
                            <p>{item.summary}</p>
                        </div>
                    ))}
                </div>
            )} */}
        </div>
    );
};

export default SummarySection;
