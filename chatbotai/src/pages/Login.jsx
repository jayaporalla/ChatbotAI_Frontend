import { useState } from "react";

const Login = () => {

  const [email, setEmail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 rounded shadow-md w-full md:w-[500px]" onSubmit={submitHandler}>
        <h2 className="text-3xl mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-xl" htmlFor="email">Email:</label>
          <input 
          type="email" 
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full rounded outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email..."  
          required/>
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
};

export default Login;