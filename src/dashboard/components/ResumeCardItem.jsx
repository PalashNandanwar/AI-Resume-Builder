/* eslint-disable react/prop-types */
import { Delete, Edit2, MoreVertical, Notebook } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useColorMode, useColorModeValue, useStatStyles } from "@chakra-ui/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  // AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from "../../../service/GlobalApi";
import { toast } from "sonner";


const ResumeCardItem = ({ resume, refreshData }) => {

  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    resume.documentId;
  }, [resume.documentId]);

  const onDelete = () => {
    GlobalApi.DeleteResume(resume.documentId)
      .then((res) => {
        console.log(res.data)
        toast("Resume Deleted Successfully");
        refreshData();
        setOpenDialog(false)
      })
  }

  // Use Chakra UI's color mode hooks
  const { colorMode } = useColorMode();
  const bg = useColorModeValue("bg-secondary", "bg-gray-800");
  const textColor = useColorModeValue("text-black", "text-white");
  const bgFooter = useColorModeValue("bg-slate-200", "bg-gray-700");

  return (
    <>
      <div className={`h-[280px] flex flex-col items-center justify-between ${bg} hover:scale-105 transition-all hover:shadow-md shadow-primary rounded-lg border`}>
        <div className="w-full h-full flex justify-center items-center">
          <Notebook color={colorMode === "dark" ? "white" : "black"} />
        </div>
        <div className={`w-full h-[50px] ${bgFooter} flex justify-between items-center px-[15px] cursor-pointer`}>
          <span className={`font-semibold text-[17px] ${textColor}`}>{resume.title}</span>

          <DropdownMenu>
            <DropdownMenuTrigger><MoreVertical /></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className={`font-semibold text-[17px]`}>Edit Panel</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpenDialog(true)} className='flex gap-3 text-[17px] font-semibold'>
                Delete <Delete />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/dashboard/resume/' + resume.documentId + '/edit')} className='flex gap-3 text-[17px] font-semibold'>
                Edit <Edit2 />
              </DropdownMenuItem>
              {/* <DropdownMenuItem onClick={() => navigate("/my-resume/" + resume.documentId + "/download")} className='flex gap-3 text-[17px] font-semibold'>
                Download <Download />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/my-resume/" + resume.documentId + "/view")} className='flex gap-3 text-[17px] font-semibold'>
                View  <ViewIcon />
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={openDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpenDialog(false)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </div>
      </div>
    </>
  );
};

export default ResumeCardItem;
