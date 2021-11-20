import React from 'react';
import Filter from './Filter';
import { FilterBuilder } from './queryBuilder';

function FilterBox() {
  let fields = ['Theme', 'Sub-theme', 'Reason', 'Language', 'Source', 'Rating', 'Time Period', 'Customer ID'];

  let conditionForFields = {'Theme' : ['Equals', 'Does not equal', 'Like', 'Not like', 'Is Empty', 'Is', 'Is not'],
                              'default' : ['Equals', 'Does not equal', 'Like', 'Not like', 'Is Empty', 'Is', 'Is not']}

  let conditionMapping = {'Equals' : '==',
                          'Does not equal' : '!='}

  let valueForFields = {'Theme' : ['performance', 'offer'],
                        'Sub-theme' : ['performance', 'platform'],
                        'default' : []}
  let fb1 = new FilterBuilder(fields, conditionForFields, conditionMapping, valueForFields);
  let fb2 = new FilterBuilder(fields, conditionForFields, conditionMapping, valueForFields);
  return (
    <div className="w-1/2 self-center">
      <p>Hi</p>
      <Filter filter = {fb1}></Filter>
      <Filter filter = {fb2}></Filter>
      <button onClick = {()=>{
        console.log(fb1.getQueryString());
      }}>Build</button>
    </div>
  );
}

export default FilterBox;