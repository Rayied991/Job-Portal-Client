import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import useJobs from "../../Hooks/useJobs";
import HotJobCard from "../Home/HotJobCard";

const AllJob = () => {
  const [sort, setSort] = useState(false);
  const [search, setSearch] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const { jobs, loading } = useJobs(sort, search, minSalary, maxSalary);

  //   console.log(sort);
  if (loading) {
    return <h2>Job is Loading</h2>;
  }
  return (
    <div>
      <h1 className="py-5 text-3xl font-bold text-center">All Jobs</h1>
      <div className="w-11/12 mx-auto bg-base-200 py-5 p-3 flex items-center gap-5">
        <button
          onClick={() => setSort(!sort)}
          className={`btn btn-neutral ${sort && "btn-success"}`}
        >
          {sort == true ? "Sorted by Salary" : "Sort by Salary"}
        </button>
        <BiSearch></BiSearch>
        <input
          onKeyUp={(e) => setSearch(e.target.value)}
          type="text"
          className="input w-full max-w-2xl"
          placeholder="Search by Job Location"
        />
        <div className="space-y-3">
          <input
            onKeyUp={(e) => setMinSalary(e.target.value)}
            type="text"
            className="input w-full max-w-xs"
            placeholder=" Min Salary"
          />
          <input
            onKeyUp={(e) => setMaxSalary(e.target.value)}
            type="text"
            className="input w-full max-w-xs"
            placeholder=" Max Salary"
          />
        </div>
      </div>
      <div className="grid py-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 w-11/12 mx-auto">
        {jobs.map((job) => (
          <HotJobCard key={job._id} job={job}></HotJobCard>
        ))}
      </div>
    </div>
  );
};

export default AllJob;
