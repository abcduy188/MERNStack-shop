import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";

function Filters() {
  const state = useContext(GlobalState);
  const [sort, setSort] = state.productAPI.sort;

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Sort By: </span>
        <select  value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="sort=oldest">newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-slod">Best sales</option>
          <option value="sort=-price">Cao- thap</option>
          <option value="sort=price">Thap - cao</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
