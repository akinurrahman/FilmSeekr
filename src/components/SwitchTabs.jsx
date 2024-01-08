import React, { useState } from "react";

const SwitchTabs = ({ data, onTabChange }) => {
  const [activeTab, setActiveTab] = useState("Day");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <section className="switch-tabs">
      <div className="tab-items cursor-pointer rounded-full  bg-white  px-1 py-2 text-black">
        {data.map((tab, index) => (
          <span
            key={index}
            className={` ${
              activeTab === tab
                ? "rounded-full bg-gradient-to-r from-yellow-200 to-yellow-500 px-5 py-1 font-medium"
                : "px-5 py-1"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </span>
        ))}
      </div>
    </section>
  );
};

export default SwitchTabs;
