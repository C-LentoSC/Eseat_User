import React from "react";

const HomeTabContent = ({
  title,
  span,
  p,
}: {
  title: string;
  span: string;
  p: string;
}) => {
  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12">
      <div className="flex flex-col justify-center">
        <h1 className="mb-4 text-4xl font-bold tracking-wide text-myColor2 sm:text-5xl">
          {title}
          <br />
          <span className=" text-myColor5">{span}</span>
        </h1>
        <div className=" flex gap-5">
          <div className="border-[3px] rounded-full border-myColor1 w-32"></div>
          <div className="border-[3px] rounded-full border-myColor1 w-12"></div>
        </div>
      </div>
      <p className=" max-w-lg text-gray-600">{p}</p>
    </div>
  );
};

export default HomeTabContent;
