import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return navigate("/auth");
    setUser(currentUser);

    const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(saved);

    const applied = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    setAppliedJobs(applied);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("savedJobs");
    localStorage.removeItem("appliedJobs");
    navigate("/auth");
  };

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const saveProfile = () => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setIsEditing(false);
    alert("Profile updated!");
  };

  const removeSavedJob = (jobId) => {
    const updated = savedJobs.filter((j) => j.job_id !== jobId);
    setSavedJobs(updated);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
  };

  const removeAppliedJob = (jobId) => {
    const updated = appliedJobs.filter((j) => j.job_id !== jobId);
    setAppliedJobs(updated);
    localStorage.setItem("appliedJobs", JSON.stringify(updated));
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">

      {/* Logout Button */}
      <div className="flex justify-end mb-4">
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
          Logout
        </button>
      </div>

      {/* Profile Section */}
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-6 hover:shadow-xl transition relative">
        <div className="flex-shrink-0">
          <img
            src={user.avatar || "https://i.pravatar.cc/150"}
            alt="Avatar"
            className="w-32 h-32 rounded-full object-cover border-2 border-purple-500"
          />
          {isEditing && (
            <input
              type="text"
              placeholder="Avatar URL"
              value={user.avatar || ""}
              onChange={handleChange}
              name="avatar"
              className="mt-2 w-full border p-2 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
            />
          )}
        </div>

        <div className="flex-1 space-y-2">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full border p-2 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
              />
              <input
                type="text"
                name="college"
                value={user.college}
                onChange={handleChange}
                className="w-full border p-2 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
              />
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full border p-2 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
              />
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
              />
              <input
                type="text"
                name="experience"
                value={user.experience}
                onChange={handleChange}
                className="w-full border p-2 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
              />
              <select
                name="gender"
                value={user.gender}
                onChange={handleChange}
                className="w-full border p-2 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
              >
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <button
                onClick={saveProfile}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg mt-2 hover:scale-105 transition"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-600">College / Company: {user.college}</p>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Phone: {user.phone}</p>
              <p className="text-gray-600">Experience: {user.experience}</p>
              <p className="text-gray-600">Gender: {user.gender}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="absolute top-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-lg hover:scale-105 transition"
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>

      {/* Saved Jobs */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-purple-600">❤️ Saved Jobs / Internships</h2>
        {savedJobs.length === 0 ? (
          <p className="text-gray-500">No saved jobs yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map((job, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow-md relative hover:shadow-xl transition transform hover:-translate-y-2">
                <h3 className="text-xl font-semibold mb-1">{job.job_title}</h3>
                <p className="text-gray-600">{job.employer_name}</p>
                <p className="text-gray-500 mb-2">{job.job_city || "India"}</p>
                <div className="flex gap-2 flex-wrap mb-2">
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">{job.job_employment_type || "Full Time"}</span>
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">Remote</span>
                </div>
                <a href={job.job_apply_link} target="_blank" className="inline-block bg-gradient-to-r from-purple-500 to-pink-400 text-white px-4 py-2 rounded-lg hover:scale-105 transition">
                  Apply Now
                </a>
                <button onClick={() => removeSavedJob(job.job_id)} className="absolute top-3 right-3 text-red-500 hover:text-red-700 font-bold">
                  ✖
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Applied Jobs */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">📝 Applied Jobs History</h2>
        {appliedJobs.length === 0 ? (
          <p className="text-gray-500">No applications yet.</p>
        ) : (
          <div className="space-y-4">
            {appliedJobs.map((job, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center hover:shadow-lg transition transform hover:-translate-y-1">
                <div>
                  <h3 className="text-lg font-semibold">{job.job_title}</h3>
                  <p className="text-gray-600">{job.employer_name}</p>
                  <p className="text-gray-500">{job.job_city || "India"}</p>
                </div>
                <div className="flex gap-2">
                  <a href={job.job_apply_link} target="_blank" className="bg-green-500 text-white px-3 py-1 rounded-lg hover:scale-105 transition">
                    View
                  </a>
                  <button onClick={() => removeAppliedJob(job.job_id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:scale-105 transition">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Dashboard;