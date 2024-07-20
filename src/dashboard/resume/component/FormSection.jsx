/* eslint-disable no-unused-vars */
import { useState } from 'react';
import PersonalSection from "./section/PersonalSection";
import SummarySection from "./section/SummarySection";
import { Button } from "../../../components/ui/button";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import ExperienceForm from './section/ExperienceForm';
import SkillSection from './section/SkillSection';
import ProjectSection from './section/ProjectSection';
import EducationSection from './section/EducationSection';
import { Link, Navigate, useParams } from 'react-router-dom';

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const param = useParams()

  const handleFormNext = () => {
    setActiveFormIndex((prevIndex) => prevIndex + 1);
  }

  const handleFormPrev = () => {
    setActiveFormIndex((prevIndex) => prevIndex - 1);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        {activeFormIndex > 1 && (
          <Button className='text-slate-950 font-bold text-base' onClick={handleFormPrev}>
            <ArrowLeft />
          </Button>
        )}
        <Button
          onClick={handleFormNext}
          className='text-slate-950 font-bold text-xl uppercase'
          variant="ghost"
          disabled={!enableNext}
        >
          Next <ArrowRight className="font-bold" />
        </Button>
        <div>
          <Link to={"/dashboard"}>
            <Button><Home /></Button>
          </Link>
        </div>
      </div>

      {/* Personal Section  */}
      {activeFormIndex === 1 && <PersonalSection enableNext={setEnableNext} />}
      {/* Summary Section */}
      {activeFormIndex === 2 && <SummarySection enableNext={setEnableNext} />}
      {/* Skills Section  */}
      {activeFormIndex === 3 && <SkillSection enableNext={setEnableNext} />}
      {/* Experience  Section  */}
      {activeFormIndex === 4 && <ExperienceForm enableNext={setEnableNext} />}
      {/* Project Section */}
      {activeFormIndex === 5 && <ProjectSection enableNext={setEnableNext} />}
      {/* Education Section  */}
      {activeFormIndex === 6 && <EducationSection enableNext={setEnableNext} />}
      {/* const { resumeValue, setResumeValue } = useContext(ResumeContext); */}
      {activeFormIndex === 7 && <Navigate to={`/my-resume/${param.resumeId}/view`} />}
    </div>
  );
}

export default FormSection;
