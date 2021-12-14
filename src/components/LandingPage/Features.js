import React from "react";

const Features = () => {
  return (
    <div className="flex flex-col mt-10">
      <h1 className="text-4xl font-black  text-center ">Features</h1>
      <div className="flex flex-row mt-10">
        <div className="flex flex-col justify-center items-center">
          <img src="ai_feature.png" className="w-3/4 h-auto" />
          <p className="text-lg mt-5"> AI-Based Waste Recognition </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img src="sort_feature.png" className="w-3/4 h-auto" />
          <p className="text-lg mt-5"> Automatic Sorting</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img src="cloud_feature.png" className="w-3/4 h-auto" />
          <p className="text-lg mt-5"> Cloud Hosted Data </p>
        </div>

        <div className="flex flex-col"></div>
      </div>
    </div>
  );
};

export default Features;
