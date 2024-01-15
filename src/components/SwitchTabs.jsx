// SwitchTabs.jsx
import React, { useState } from "react";

const SwitchTabs = ({ data, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    onTabChange(data[index]);
  };

  return (
    <section className="switch-tabs">
      <div className="tab-items cursor-pointer rounded-full bg-white px-1 py-2 text-black">
        {data.map((tab, index) => (
          <span
            key={index}
            className={` 
              cursor-pointer rounded-full px-5 py-1
              ${
                index === activeTab
                  ? "bg-gradient-to-r from-yellow-200 to-yellow-500 text-[#64647f]"
                  : "bg-white text-black"
              }
            `}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </span>
        ))}
      </div>
    </section>
  );
};

export default SwitchTabs;
