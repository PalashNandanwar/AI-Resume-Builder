/* eslint-disable react/no-unescaped-entities */
import { Download, Share2Icon } from "lucide-react";
import Header from "../../../components/custom/Header";
import { Button } from "../../../components/ui/button";
import PreviewSection from "../../../dashboard/resume/component/PreviewSection";
import { ResumeContext } from "../../../context/ResumeContext";
import { useEffect, useState } from "react";
import GlobalApi from "../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { RWebShare } from "react-web-share";

const ViewResume = () => {
    const param = useParams();
    const [resumeValue, setResumeValue] = useState();

    const GetResumeInfo = async () => {
        try {
            const res = await GlobalApi.GetResumeById(param.resumeId);
            console.log("Response Data:", res.data.data);
            setResumeValue(res.data.data);
        } catch (error) {
            console.error("Error fetching resume info:", error);
        }
    };

    const handleDownload = () => {
        window.print()
    }

    useEffect(() => {
        GetResumeInfo();
    }, [param.resumeId]);

    return (
        <>
            <ResumeContext.Provider value={{ resumeValue, setResumeValue }}>
                <div id="notPrintArea">
                    <Header />
                    <div className=" my-10 mx-10 md:mx-20 lg:mx-36">
                        <h2 className=" text-center text-2xl font-bold uppercase">Your Resume is Complete</h2>
                        <p className="text-center text-[20px] font-semibold uppercase">
                            Your resume is being completed with the help of AI, and now it's ready for
                        </p>
                        <div className="flex justify-between px-40 my-14">
                            <Button onClick={handleDownload} variant="ghost" className="flex gap-3 justify-center items-center">
                                Download <Download />
                            </Button>

                            <RWebShare
                                data={{
                                    text: "Hello, Everyone this is my new Resume ",
                                    url: import.meta.env.VITE_BASE_URL + "/my-resume/" + param.resumeId + "/view",
                                    title: resumeValue?.firstName + " " + resumeValue?.lastName + " Resume",
                                }}
                                onClick={() => console.log("shared successfully!")}
                            >
                                <Button variant="secondary" className="flex gap-3 justify-center items-center">
                                    Share <Share2Icon />
                                </Button>
                            </RWebShare>

                        </div>
                    </div>
                </div>
                <div id="printArea" className=" my-10 mx-10 md:mx-20 lg:mx-36">
                    <PreviewSection />
                </div>
            </ResumeContext.Provider>
        </>
    );
};

export default ViewResume;
