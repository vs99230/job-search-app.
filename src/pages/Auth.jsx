import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();

  // Default: Sign Up first
  const [isLogin, setIsLogin] = useState(false);

  const [form, setForm] = useState({
    name: "",
    college: "",
    phone: "",
    experience: "",
    gender: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    // Already signed in
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) navigate("/dashboard");
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.email === form.email && user.password === form.password) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } else {
      localStorage.setItem("user", JSON.stringify(form));
      localStorage.setItem("currentUser", JSON.stringify(form));
      alert("Account created successfully!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-lg border border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          {isLogin ? "Login" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <>
              <input name="name" placeholder="Full Name" onChange={handleChange} className="border p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none shadow-sm" />
              <input name="college" placeholder="College / Company" onChange={handleChange} className="border p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none shadow-sm" />
              <input name="phone" placeholder="Phone Number" onChange={handleChange} className="border p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none shadow-sm" />
              <input name="experience" placeholder="Experience" onChange={handleChange} className="border p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none shadow-sm" />
              <select name="gender" onChange={handleChange} className="border p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none shadow-sm">
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </>
          )}

          <input name="email" placeholder="Email" onChange={handleChange} className="border p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none shadow-sm" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none shadow-sm" />

          <button type="submit" className={`py-3 rounded-xl font-semibold text-white shadow-lg transition-transform hover:scale-105 ${isLogin ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gradient-to-r from-purple-600 to-pink-400"}`}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button className="text-purple-500 font-semibold ml-2 hover:underline" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;