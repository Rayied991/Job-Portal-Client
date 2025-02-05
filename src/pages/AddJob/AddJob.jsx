import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
const AddJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleAddJob = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // console.log(formData.entries());
    const initialData = Object.fromEntries(formData.entries());
    // console.log(initialData);
    const { min, max, currency, ...newJob } = initialData;
    // console.log(newJob);
    newJob.salaryRange = { min: parseInt(min), max: parseInt(max), currency };
    newJob.requirements = newJob.requirements.split("\n");
    newJob.responsibilities = newJob.responsibilities.split("\n");
    console.log(newJob);
    fetch("https://career-portal-one.vercel.app/jobs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newJob),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Job has been Posted Successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          navigate("/MyPostedJobs");
        }
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Post a New Job
        </h2>

        <form onSubmit={handleAddJob} className="space-y-4">
          {/* Job Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 font-medium">
                Job Title
              </span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter Job Title"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Job Location */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 font-medium">
                Job Location
              </span>
            </label>
            <input
              type="text"
              name="location"
              placeholder="Enter Job Location"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Job Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 font-medium">
                Job Type
              </span>
            </label>
            <select
              defaultValue={"Select a Job Type"}
              className="select select-bordered w-full"
              required
            >
              <option disabled>Job Type</option>
              <option>Full-time</option>
              <option>Intern</option>
              <option>Part-time</option>
            </select>
          </div>
          {/* Job Category */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 font-medium">
                Job Category
              </span>
            </label>
            <select
              defaultValue={"Select a Category"}
              name="category"
              className="select select-bordered w-full"
              required
            >
              <option disabled>Category</option>
              <option>Engineering</option>
              <option>Marketing</option>
              <option>Finance</option>
              <option>Teaching</option>
            </select>
          </div>
          {/* salary range  */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
            {/* min  */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-medium">
                  Salary Range
                </span>
              </label>
              <input
                type="number"
                name="min"
                placeholder="Min"
                className="input input=bordered w-full"
                required
              />
            </div>
            {/* max */}
            <div className="form-control">
              <input
                type="number"
                name="max"
                placeholder="Max "
                className="input input=bordered w-full"
                required
              />
            </div>
            {/* salary  */}
            <div className="form-control">
              <select
                defaultValue={"Select a Currency"}
                name="currency"
                className="select select-bordered w-full"
                required
              >
                <option disabled>Currency</option>
                <option>BDT</option>
                <option>USD</option>
                <option>INR</option>
              </select>
            </div>
          </div>
          {/* description */}

          {/* Job Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 font-medium">
                Job Description
              </span>
            </label>

            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Job Description"
              name="description"
              required
            ></textarea>
          </div>
          {/* company name  */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 font-medium">
                Company Name
              </span>
            </label>
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* Job Requirements */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 font-medium">
                Job Requirements
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Job Requirements"
              name="requirements"
              required
            ></textarea>
          </div>
          {/* Job Responsibilities */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 font-medium">
                Job Responsibilities
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Job Responsibilities "
              name="responsibilities"
              required
            ></textarea>
          </div>
          {/* Hr name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 font-medium">
                Name of HR
              </span>
            </label>
            <input
              type="text"
              name="hr_name"
              placeholder="Hr name "
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* Hr email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 font-medium">
                Email of HR
              </span>
            </label>
            <input
              readOnly
              type="text"
              name="hr_email"
              defaultValue={user?.email}
              placeholder="Hr email "
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* Application deadline */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 font-medium">
                Application deadline
              </span>
            </label>
            <input
              type="date"
              name="deadline"
              placeholder="Application deadline "
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* Company logo URL*/}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 font-medium">
                Company logo URL
              </span>
            </label>
            <input
              type="url"
              name="company_logo"
              placeholder="Company logo URL "
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* Submit Button */}
          <div className="form-control mt-6">
            <button className="btn btn-primary w-full text-lg">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
