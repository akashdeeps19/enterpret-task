import React from 'react';
import './App.css';
import { GroupFilter } from './queryBuilder';
import QueryBuild from './QueryBuild';
// import { FilterBuilder } from './queryBuilder';

function App() {
  let fields = ['Theme', 'Sub-theme', 'Reason', 'Language', 'Source', 'Rating', 'Time Period', 'Customer ID'];

  let conditionForFields = {'Theme' : ['Equals', 'Does not equal', 'Like', 'Not like', 'Is Empty', 'Is', 'Is not'],
                              'default' : ['Equals', 'Does not equal', 'Like', 'Not like', 'Is Empty', 'Is', 'Is not']}

  let conditionMapping = {'Equals' : '==',
                          'Does not equal' : '!='}

  let valueForFields = {'Theme' : ['performance', 'offer'],
                      'Sub-theme' : ['performance', 'platform'],
                      'default' : []}
  
  let gf = new GroupFilter(fields, conditionForFields, conditionMapping, valueForFields);
  gf.addGroupFilter();
  return (
    <div className="App">
      <h1 className="m-6 text-xl">Query Builder</h1>
      <div className="flex justify-center items-center w-3/5 m-auto">
        <QueryBuild gf={gf}></QueryBuild>
      </div>
    </div>
  );
}

export default App;
