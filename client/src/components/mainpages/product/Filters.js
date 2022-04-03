import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";

function Filters() {
  const state = useContext(GlobalState);
  const [sort, setSort] = state.productAPI.sort;

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Sắp xếp: </span>
        <select  value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="">Mới nhất</option>
          <option value="sort=oldest">Cũ nhất</option>
          <option value="sort=-slod">Bán chạy nhất</option>
          <option value="sort=-price">Giá: Cao - thấp</option>
          <option value="sort=price">Gia: Thấp - Cao</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
