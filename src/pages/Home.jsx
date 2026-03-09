import { useEffect, useState } from "react";
import { fetchJobs } from "../services/jobAPI";
import { Search, MapPin, Building2 } from "lucide-react";

export default function Home() {

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadJobs = async () => {
      const data = await fetchJobs();
      setJobs(data);
    };
    loadJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.job_title?.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="bg-white min-h-screen">

      {/* HERO */}

      <section className="py-28 text-center px-6 relative">

        <h1 className="text-6xl font-extrabold mb-6 leading-tight">

          Find Your  
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent ml-3">
            Dream Job
          </span>

        </h1>

        <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
          Discover internships and jobs from top companies across India
        </p>


        {/* SEARCH BAR */}

        <div className="flex justify-center">

          <div className="flex items-center gap-3 bg-white border shadow-xl rounded-2xl px-4 py-3 w-[420px] hover:shadow-2xl transition">

            <Search size={20} className="text-gray-400"/>

            <input
              type="text"
              placeholder="Search jobs or internships..."
              className="outline-none flex-1"
              onChange={(e)=>setSearch(e.target.value)}
            />

            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
              Search
            </button>

          </div>

        </div>

      </section>



      {/* FEATURED JOBS */}

      <section className="max-w-7xl mx-auto px-6 pb-28">

        <h2 className="text-3xl font-bold text-center mb-14">
          Latest Opportunities
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {filteredJobs.slice(0,9).map((job) => (

            <div
              key={job.job_id}
              className="group border rounded-2xl p-6 bg-white shadow-md hover:shadow-2xl transition transform hover:-translate-y-2"
            >

              <div className="flex items-center gap-3 mb-4">

                <div className="bg-indigo-100 p-3 rounded-lg">
                  <Building2 className="text-indigo-600" size={20}/>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-semibold">{job.employer_name}</p>
                </div>

              </div>

              <h3 className="text-xl font-semibold mb-3 group-hover:text-indigo-600 transition">
                {job.job_title}
              </h3>

              <div className="flex items-center text-gray-500 text-sm mb-5">
                <MapPin size={16} className="mr-2"/>
                {job.job_city || "India"}
              </div>

              <span className="inline-block text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full mb-4">
                {job.job_employment_type}
              </span>

              <a
                href={job.job_apply_link}
                target="_blank"
                className="block text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg hover:scale-105 transition"
              >
                Apply Now
              </a>

            </div>

          ))}

        </div>

      </section>



      {/* CTA */}

      <section className="text-center pb-28">

        <h2 className="text-4xl font-bold mb-4">
          Ready to start your career?
        </h2>

        <p className="text-gray-500 mb-8">
          Explore thousands of internships and jobs today.
        </p>

        <a
          href="/jobs"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-3 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Browse All Jobs
        </a>

      </section>

    </div>
  );
}