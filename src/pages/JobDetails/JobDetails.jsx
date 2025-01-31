import React from "react";
import { Link, useLoaderData } from "react-router-dom";
const JobDetails = () => {
  const {
    _id,
    title,
    company,
    requirements,
    description,
    deadline,
    company_logo,
  } = useLoaderData();

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm mt-12 mb-12 mx-auto shadow-amber-600">
        <figure className="px-10 pt-10">
          <img src={company_logo} alt="Company" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions">
            <Link to={`/jobApply/${_id}`}>
              <button className="btn btn-primary">Apply Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
