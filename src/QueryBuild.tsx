import React, { useState } from 'react';
import FilterBox from './FilterBox';
import {GroupFilter } from './queryBuilder';

interface Props {
    gf: GroupFilter;
}

function QueryBuild(props: Props) {

    
    let [gfs, setGfs] = useState(props.gf.children.slice());

    return (
        <div className="w">
            {gfs.map((val, key) => 
                <FilterBox key = {key} gf = {val as GroupFilter}></FilterBox>
            )}

            <button onClick = {()=>{
                let filt = props.gf.addGroupFilter();
                setGfs([...gfs, filt])
                // console.log(props.gf)
            }}>Add Group Filter</button>

            <button onClick = {()=>{
                // console.log(props.gf)
                console.log(props.gf.getQueryString())
            }}>Build</button>
        </div>
    );
}

export default QueryBuild;





