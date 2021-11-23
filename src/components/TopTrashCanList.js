import React from "react";

const TopTrashCanList = ({ topTrashCans }) => {
  return (
    <div className="row">
      <div className="col">
        <div className="card">
          <div className="card-body">
            <h5 class="card-title">Top Trash Can of the Week</h5>

            <h1 className="font-caveat">{topTrashCans.statusText}</h1>
            <ul>
              {topTrashCans.map((tc) => (
                <li key={tc.id}>{tc.Trash_sorter_location}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopTrashCanList;
