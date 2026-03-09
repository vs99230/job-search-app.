import { useEffect, useState } from "react";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Load jobs from API or localStorage safely
  useEffect(() => {
    const cachedJobs = localStorage.getItem("jobs");

    if (cachedJobs && cachedJobs !== "undefined") {
      setJobs(JSON.parse(cachedJobs));
      setLoading(false);
      return;
    }

    fetch(
      "https://jsearch.p.rapidapi.com/search?query=developer&location=india&page=1",
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "904704eb3cmshc2e551138892107p1bd773jsn4d5afcfc6132",
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.data);
        localStorage.setItem("jobs", JSON.stringify(data.data));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch jobs:", err);
        setJobs([]);
        setLoading(false);
      });
  }, []);

  // Save job to localStorage
  const saveJob = (job) => {
    const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
    const exists = saved.find((j) => j.job_id === job.job_id);
    if (exists) return alert("Job already saved!");

    saved.push(job);
    localStorage.setItem("savedJobs", JSON.stringify(saved));
    alert("Job saved!");
  };

  const filteredJobs = jobs.filter((job) =>
    job.job_title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading jobs...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
        Explore Jobs & Internships
      </h1>

      {/* Search */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 border rounded-xl px-4 py-3 shadow focus:ring-2 focus:ring-purple-400 outline-none transition"
        />
      </div>

      {/* Job Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredJobs.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No jobs found.
          </p>
        ) : (
          filteredJobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 transition transform hover:-translate-y-2 hover:shadow-xl"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {job.job_title}
              </h2>
              <p className="text-gray-600">{job.employer_name}</p>
              <p className="text-gray-500 mb-4">{job.job_city || "India"}</p>

              <div className="flex gap-2 mb-4 flex-wrap">
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  {job.job_employment_type || "Full Time"}
                </span>
                <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                  Remote
                </span>
              </div>

              <a
                href={job.job_apply_link}
                target="_blank"
                className="inline-block bg-gradient-to-r from-purple-500 to-pink-400 text-white px-5 py-2 rounded-lg hover:scale-105 transition"
              >
                Apply Now
              </a>

              <button
                onClick={() => saveJob(job)}
                className="mt-2 text-red-500 font-bold hover:text-red-700 transition"
              >
                ❤️ Save
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Jobs;