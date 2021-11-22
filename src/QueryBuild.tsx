import React, { useState } from 'react';
import FilterBox from './FilterBox';
import {GroupFilter } from './queryBuilder';

interface Props {
    gf: GroupFilter;
}

interface GFilterElement {
    filter: GroupFilter;
    key: number;
  }

let keys = 0;
function QueryBuild(props: Props) {
    let filts :GFilterElement[] = [];
    for(let i = 0;i < props.gf.children.length;i++){
        filts.push({filter: props.gf.children[i] as GroupFilter, key:keys++})
    }
    
    let [gfs, setGfs] = useState(filts);
    let [query, setQuery] = useState('Query');
    let [and, setAnd] = useState(true);
    let [not, setNot] = useState(false)

    let toggleAnd = ()=>{
        props.gf.ruleGroup.conjunction = and?'OR':'AND';
        setAnd(!and)
    }
    let toggleNot = ()=>{
        props.gf.ruleGroup.not = !not;
        setNot(!not)
    }
    let handleDelete = (key:number)=>{
        if(gfs.length === 1)
            return;
        props.gf.children.splice(key,1);
        setGfs(gfs.filter((_,i) => i !== key));
      }
    return (
        <div className="flex-col bg-gray-900 text-white p-5 m-6 rounded">
            <div className="flex justify-center bg-indigo-600 w-full p-2 mb-4">
                <p>{query}</p>
            </div>
            <div className="flex justify-center">
                <button className="p-2 bg-indigo-600 rounded" onClick = {()=>{
                    setQuery(props.gf.getQueryString())
                }}>Build</button>
            </div>
            <div className="flex justify-start">
                <span><button className={not?"bg-indigo-600 p-1 mr-4":"p-1 mr-4"} onClick={toggleNot}>NOT</button></span>
                <span><button className={and?"bg-indigo-600 p-1":"p-1"} onClick = {toggleAnd}> AND </button></span>
                <span><button className={and?"p-1":"bg-indigo-600 p-1"} onClick = {toggleAnd}> OR </button></span>
            </div>
            <div className="flex justify-center ">
                <div className="flex-col justify-center">
                    {
                        gfs.map((val, key) => 
                            <div key = {val.key} className="flex">
                            <FilterBox gf = {val.filter}></FilterBox>
                            {gfs.length!==1 && <button className = "bg-gray-800 mt-2 h-10 p-2" onClick={() => handleDelete(key)}>
                            <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                width="12" height="12"
                                viewBox="0 0 24 24">
                                <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z">
                                </path>
                                </svg>
                            </button>
                            }
                            </div>)
                    }  

                </div>
            </div>
            <div className="flex justify-start">
                <button className="p-2 bg-indigo-600 rounded" onClick = {()=>{
                    let filt = props.gf.addGroupFilter() as GroupFilter;
                    setGfs([...gfs, {filter: filt, key: keys++}])
                }}>+ Add Group Filter</button>
            </div>
            
        </div>
    );
}

export default QueryBuild;





