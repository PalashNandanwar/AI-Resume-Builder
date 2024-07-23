/* eslint-disable no-unused-vars */
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useUser } from '@clerk/clerk-react';
import imageSrc from '../../public/simgle.png'; // Rename variable to avoid conflicts
import { ArrowRight, UserCircle2 } from 'lucide-react';
import Header from '../components/custom/Header';
import CSSRulePlugin from 'gsap/CSSRulePlugin';
import { TimelineLite, Power2 } from 'gsap';
import Footer from '../components/custom/Footer';


const Home = () => {
    const [resumeList, setResumeList] = useState([])
    const { user, isLoaded, isSignedIn } = useUser();
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const imageReveal = CSSRulePlugin.getRule(".image-container:after");
    const tl = new TimelineLite();

    useEffect(() => {
        tl.to(containerRef.current, 1, {
            css: {
                visibility: "visible"
            }
        }).to(imageReveal, 1.4, { width: "0%", ease: Power2.easeInOut });
    }, [tl, imageReveal]);

    return (
        <>
            <Header />
            <div className="p-7">
                <div className="flex flex-col justify-center p-10">
                    <h1 className="text-5xl font-extrabold uppercase ">
                        Revolutionize Your Resume Creation.
                    </h1>
                    <p className="uppercase font-semibold text-xl  py-4 px-7 text-slate-400">
                        Experience the future of resume building with our AI-driven platform. Our advanced technology handles every step of the process—writing, editing, formatting, and optimizing—ensuring you have a polished and professional resume that stands out to employers.
                    </p>
                    {isSignedIn ? (
                        <Link to={'/dashboard'}>
                            <Button className='text-slate-950 font-bold text-base' variant='outline'>Dashboard</Button>
                        </Link>
                    ) : (
                        <Link to={'/auth/Sign_In'}>
                            <Button className='text-slate-950 font-bold text-base'>Get Started</Button>
                        </Link>
                    )}
                </div>

                <div className="relative flex flex-col items-center p-7">
                    <div ref={containerRef} className="image-container relative overflow-hidden w-full max-w-[90%] h-auto flex justify-center items-center bg-cyan-400 pt-10 rounded-lg">
                        <img
                            ref={imageRef}
                            className="w-full max-w-[80%] h-auto"
                            src={imageSrc}
                            alt="Displayed"
                        />
                    </div>
                    <div className="absolute w-[300px] p-5 bottom-20 left-24 m-4 bg-yellow-100 rounded-xl">
                        <Button className="mb-2 gap-5">
                            AI Keyword Targeting <ArrowRight />
                        </Button>
                        <p className='text-slate-400'>
                            Resume Builder checks and perfectly tailors your resume with keywords for the job you want.
                        </p>
                    </div>
                </div>

                <div className='p-28 '>
                    <p className=' font-bold text-4xl'>
                        Resume Builder is an awesome AI-based resume builder that includes templates to help you design a resume that is sure to check the boxes when it comes to applicant tracking systems. This is a great jumping off point to kickstart a new resume.
                    </p>

                    <div className='flex justify-center items-center gap-5 pt-20'>
                        <span className='text-9xl'>
                            <UserCircle2 size={'60px'} />
                        </span>
                        <div className='flex flex-col border-r-2 p-2'>
                            <span>Ashley Stahl</span>
                            <span>Career Contributor</span>
                        </div>
                        <span className='text-6xl font-bold text-[#33629A] p-2 rounded'>
                            Forbes
                        </span>
                    </div>
                </div>



            </div>

            <Footer />
        </>
    );
};

export default Home;
