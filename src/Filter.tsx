import React, { useState } from 'react';
import './App.css';
import { FilterBuilder } from './queryBuilder';

interface Props {
    filter: FilterBuilder;
}

function Filter(props :Props) {
    let [selectedField, setSelectedField] = useState('default');
    let classn = "w-1/4 p-2 m-5 bg-gray-500";
    let classo = "p-2";
    // console.log(props.filter)
    return (
        <div className="flex justify-center m-5 text-white rounded bg-gray-600 shadow-lg">
            <select className={classn} name = 'Field' onChange = {(val) => {
                props.filter.rule.field = val.target.value;
                setSelectedField(val.target.value);}
            }>
            <option className = {classo} hidden>Select Field</option>
            {
                props.filter.fields.map((val, key) => 
                <option className = {classo} key={key}>{val}</option> )
            }
            </select>
            <select className={classn} name = 'Condition' onChange = {(val) => {
                props.filter.rule.condition = val.target.value;}
            }>
            <option className = {classo} hidden>Select Condition</option>
            {
                props.filter.setCondition(selectedField).map((val, key) => 
                <option className = {classo} key={key}>{val}</option> )
            }
            </select>
            <select className={classn} name = 'Criteria' onChange = {(val) => {
                props.filter.rule.value = val.target.value;}
            }>
            <option className = {classo} hidden>Select Criteria</option>
            {
                props.filter.setValue(selectedField).map((val, key) => 
                <option className = {classo} key={key}>{val}</option> )
            }
            </select>
        </div>
    );
}

export default Filter;
