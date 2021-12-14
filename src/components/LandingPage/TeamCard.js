import React from "react";

const TeamCard = (props) => {
  const name = props.name;
  const imgUrl = props.imgUrl;

  return (
    <div class="pt-4 bg-white w-full md:w-56 justify-center items-center shadow px-6 py-4 flex flex-col rounded-lg">
      <img src={imgUrl} class="rounded-full h-40 w-40 object-cover" />
      <h4 class="mt-8 border-b-2">{name}</h4>
    </div>
  );
};

export default TeamCard;
