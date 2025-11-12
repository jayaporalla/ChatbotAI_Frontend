import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Home = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toogleSidebar = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar isOpen={isOpen} toogleSidebar={toogleSidebar}/>
      <div className="flex flex-1 flex-col">
        <button className="md:hidden p-4 bg-gray-800 text-2xl" onClick={toogleSidebar}>
          <GiHamburgerMenu />
        </button>

        <div className="flex-1 p-6 mb-20 md:mb-0">
          <Header />
        </div>
      </div>
    </div>
  );
};

export default Home;
