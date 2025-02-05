import { useEffect, useState } from "react";
import HotJobCard from "./HotJobCard";

const HotJobs = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch("https://career-portal-one.vercel.app/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);
  return (
    <div>
      <h2
        className="text-4xl mt-10 text-center font-bold [text-shadow:_0_4px_8px_rgba(14_165_223_/_0.5)]
                            text-sky-400  md:text-2xl leading-snug 
                            font-manrope "
      >
        Hot Jobs
      </h2>
      <div className="grid py-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 w-11/12 mx-auto">
        {jobs.map((job) => (
          <HotJobCard key={job._id} job={job}></HotJobCard>
        ))}
      </div>
    </div>
  );
};

export default HotJobs;
