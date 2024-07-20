import { Loader2, PlusSquare } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from "../../../service/GlobalApi";
import { useNavigate } from "react-router-dom";

const AddResume = () => {
    const [dialog, setDialog] = useState(false);
    const [inputTitle, setInputTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const navigate = useNavigate()

    const handleDialog = () => {
        setInputTitle(''); // Reset input field
        setDialog(true);
    };

    const handleCloseDialog = () => {
        setDialog(false);
    };

    const handleInputTitle = (e) => {
        setInputTitle(e.target.value);
    };

    const onCreate = async () => {
        setLoading(true);
        const uuid = uuidv4();
        console.log(inputTitle, uuid);
        const data = {
            data: {
                'title': inputTitle,
                'resume_id': uuid,
                'user_Email': user?.primaryEmailAddress?.emailAddress,
                'user_Name': user?.fullName
            }
        };
        try {
            const res = await GlobalApi.CreateNewResume(data);
            console.log(res.data.data.documentId);
            setLoading(false);
            handleCloseDialog();
            navigate('/dashboard/resume/' + res.data.data.documentId + '/edit')
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div>
            <div className=" h-[280px] px-20 py-28 border items-center flex justify-center bg-secondary rounded-lg hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dotted" onClick={handleDialog}>
                <PlusSquare />
            </div>

            <Dialog open={dialog} onOpenChange={setDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create new Resume</DialogTitle>
                        <DialogDescription className='flex flex-col gap-5'>
                            <p className="text-lg capitalize">Add Title to your Resume</p>
                            <Input onChange={handleInputTitle} value={inputTitle} placeholder='Enter Your Resume Title' />
                        </DialogDescription>
                        <div className="flex justify-end gap-5 py-3">
                            <Button className='uppercase' variant="ghost" onClick={handleCloseDialog}>cancel</Button>
                            <Button disabled={!inputTitle || loading} onClick={onCreate} className='uppercase'>
                                {loading ? <Loader2 className="animate-spin" /> : "create"}
                            </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddResume;
