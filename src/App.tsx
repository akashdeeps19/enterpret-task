import React from 'react';
import './App.css';
import { GroupFilter } from './queryBuilder';
import QueryBuild from './QueryBuild';
// import { FilterBuilder } from './queryBuilder';

function App() {
  let fields = ['Theme', 'Sub-theme', 'Reason', 'Language', 'Source', 'Rating', 'Time Period', 'Customer ID'];

  let conditionForFields = {'Theme' : ['Equals', 'Does not equal', 'Greater', 'Lesser', 'Is', 'Is not'],
                              'default' : ['Equals', 'Does not equal', 'Greater', 'Lesser', 'Is', 'Is not']}

  let conditionMapping = {'Equals' : '==',
                          'Does not equal' : '!=',
                          'Is' : '===',
                          'Is not' : '!==',
                          'Greater' : '>',
                          'Lesser' : '<'
                        }

  let valueForFields = {'Theme' : ['performance', 'offer'],
                      'Sub-theme' : ['efficieny', 'platform'],
                      'default' : ['value1', 'value2']}
  
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
