export default function AuthPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-4xl flex bg-gradient-to-r from-gray-800 to-gray-700 shadow-xl rounded-lg overflow-hidden">
        {/* Left Side - Sign Up */}
        <div className="w-1/2 p-8 text-white">
          <h2 className="text-2xl font-semibold mb-4">Create Account</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm">Name</label>
              <input type="text" className="w-full p-2 mt-1 bg-gray-800 border border-gray-600 rounded" />
            </div>
            <div>
              <label className="block text-sm">E-mail address</label>
              <input type="email" className="w-full p-2 mt-1 bg-gray-800 border border-gray-600 rounded" />
            </div>
            <div>
              <label className="block text-sm">Password</label>
              <input type="password" className="w-full p-2 mt-1 bg-gray-800 border border-gray-600 rounded" />
            </div>
          </div>
          <button className="w-full mt-6 py-2 bg-blue-600 rounded hover:bg-blue-500 transition">Sign Up</button>
        </div>

        {/* Right Side - Sign In */}
        <div className="w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 p-8 text-white rounded-r-lg">
          <h2 className="text-xl font-semibold">Welcome Back!</h2>
          <p className="text-sm text-gray-300 mt-2 text-center">To keep connected with us please login with your personal info</p>
          <button className="mt-4 px-6 py-2 border border-white rounded hover:bg-white hover:text-gray-800 transition">Sign In</button>
        </div>
      </div>
    </div>
  );
}