import { useState } from "react";
import "../../public/signup.png";
import { useAuth } from "../contexts/auth.context";
import { Eye, EyeOff } from "lucide-react";

export const SignUp = () => {
  const [userType, setUserType] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const {
    studentRegister,
    hrRegister,
    studentRegisterInfo,
    hrRegisterInfo,
    updateStudentRegisterInfo,
    updateHrRegisterInfo,
  } = useAuth();

  const changeUserType = (type: string) => {
    setUserType(type);
  }

  const handleStudentRegisterInfoChange = (event: any) => {
    updateStudentRegisterInfo({
      ...studentRegisterInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleHrRegisterInfoChange = (event: any) => {
    updateHrRegisterInfo({
      ...hrRegisterInfo,
      [event.target.name]: event.target.value,
    });
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className="signup min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className=" w-full max-w-[1200px] grid md:grid-cols-2 bg-white rounded-xl shadow-lg overflow-auto">
        <div className="p-6 md:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              PeakPrep
            </h1>
          </div>

          <div className="signupi h-110 overflow-y-auto mx-auto">
            <form
              onSubmit={userType === "student" ? studentRegister : hrRegister}
              className="space-y-6 px-4 pb-3"
            >
              <div>
                <label
                  htmlFor="userType"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  I am a
                </label>
                <select
                  id="userType"
                  name="userType"
                  value={userType}
                  onChange={(e) => changeUserType(e.target.value)}
                  className="input-field text-base"
                >
                  <option value="student">Student</option>
                  <option value="hr">HR</option>
                </select>
              </div>

              {userType === "student" && (
                <>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-base font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={studentRegisterInfo.name}
                      onChange={handleStudentRegisterInfoChange}
                      className="input-field text-base"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="regdno"
                      className="block text-base font-medium text-gray-700 mb-1"
                    >
                      Registration Number
                    </label>
                    <input
                      id="regdno"
                      name="username"
                      type="text"
                      value={studentRegisterInfo.username}
                      onChange={handleStudentRegisterInfoChange}
                      className="input-field text-base"
                      placeholder="Enter your registration number"
                      required
                    />
                  </div>
                    <div>
                    <label
                      htmlFor="branch"
                      className="block text-base font-medium text-gray-700 mb-1"
                    >
                      Branch
                    </label>
                    <select
                      id="branch"
                      name="branch"
                      value={studentRegisterInfo.branch}
                      onChange={handleStudentRegisterInfoChange}
                      className="input-field text-base"
                      required
                    >
                      <option value="" disabled>Select your branch</option>
                      <option value="CSE">Computer Science Engineering (CSE)</option>
                      <option value="CSIT">Computer Science and Information Technology (CSIT)</option>
                      <option value="ECE">Electronics and Communication Engineering (ECE)</option>
                      <option value="ME">Mechanical Engineering (ME)</option>
                      <option value="CE">Civil Engineering (CE)</option>
                      <option value="EE">Electrical Engineering (EE)</option>
                    </select>
                    </div>
                  <div>
                    <label
                      htmlFor="section"
                      className="block text-base font-medium text-gray-700 mb-1"
                    >
                      Section
                    </label>
                    <input
                      id="section"
                      name="section"
                      type="text"
                      value={studentRegisterInfo.section}
                      onChange={handleStudentRegisterInfoChange}
                      className="input-field text-base"
                      placeholder="Enter your section"
                      required
                    />
                  </div>
                </>
              )}

              {userType === "hr" && (
                <>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-base font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={hrRegisterInfo.name}
                      onChange={handleHrRegisterInfoChange}
                      className="input-field text-base"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-base font-medium text-gray-700 mb-1"
                    >
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={hrRegisterInfo.company}
                      onChange={handleHrRegisterInfoChange}
                      className="input-field text-base"
                      placeholder="Enter your company"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="collegeId"
                      className="block text-base font-medium text-gray-700 mb-1"
                    >
                      College ID
                    </label>
                    <input
                      id="collegeId"
                      name="collegeId"
                      type="text"
                      value={hrRegisterInfo.collegeId}
                      onChange={handleHrRegisterInfoChange}
                      className="input-field text-base"
                      placeholder="Enter your college ID"
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userType === "student" ? studentRegisterInfo.email : hrRegisterInfo.email}
                  onChange={userType === "student" ? handleStudentRegisterInfoChange : handleHrRegisterInfoChange}
                  className="input-field text-base"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={userType === "student" ? studentRegisterInfo.password : hrRegisterInfo.password}
                    onChange={userType === "student" ? handleStudentRegisterInfoChange : handleHrRegisterInfoChange}
                    className="input-field text-base"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-primary text-base py-2 px-4">
                Sign up
              </button>
            </form>
          </div>
          <div className="mt-5 text-center">
            <p className="text-lg text-gray-700">
              Already have an account?{" "}
              <a href="/login" className="text-primary font-medium">
                Log in
              </a>
            </p>
          </div>
        </div>
        <div className="image bg-gray-200 p-6 flex items-center justify-center">
          <img
            src="../../public/signup.png"
            alt="Graduate illustration"
            className="w-full max-w-[450px]"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
