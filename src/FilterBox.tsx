import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import { FilterBuilder, GroupFilter } from './queryBuilder';

interface Props {
  gf: GroupFilter;
}

function FilterBox(props: Props) {
  let [filters, setFilters] = useState(props.gf.children.slice());

  let handleClick = ()=>{
    let filt = props.gf.addFilter();
    setFilters([...filters, filt]);
    // console.log(props.gf.children, filters)
  }
  return (
    <div className="w-1/2 self-center">
      {
        filters.map((val, key) => 
          <Filter key = {key} filter = {val as FilterBuilder}></Filter>
        )
      }
      <button onClick = {handleClick}>Add Filter</button>
    </div>
  );
}

export default FilterBox;