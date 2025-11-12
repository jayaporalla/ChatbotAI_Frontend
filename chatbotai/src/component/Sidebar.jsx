import { IoIosCloseCircle } from "react-icons/io";

const Sidebar = ({ isOpen, toogleSidebar }) => {
  return (
    <div className={`fixed inset-0 bg-gray-800 p-4 transition-transform transform md:relative md:translate-x-0 md:w-1/4 md:block 
    ${isOpen ? "translate-x-0" : "-translate-x-full" } ` }>
        <button className="md:hidden p-2 mb-4 bg-gray-700 rounded text-2xl" onClick={toogleSidebar}>
            <IoIosCloseCircle />
        </button>

      <div className="text-2xl font-semibold mb-6">Chatbot</div>

      <div className="absolute bottom-0 mb-6 w-full">
        <button className="bg-red-600 text-white text-xl px-3 py-2 rounded-md hover:bg-red-700">Logout</button>
      </div>
    </div>
  )
}

export default Sidebar
