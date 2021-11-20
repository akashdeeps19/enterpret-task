export interface Rule {
    field?: string 
    condition: string
    value?: string
    type: 'rule'
}

export interface RuleGroup {
  children: (RuleGroup | Rule)[]
  conjunction: 'AND' | 'OR'
  not: boolean
  type: 'rule_group'
}

export class FilterBuilder{
    rule: Rule;
    fields: string[];
    conditionForFields: {[key: string]: string[]};
    conditionMapping: {[key: string]: string};
    valueForFields: {[key: string]: string[]};

    constructor(fields: string [], conditionForFields: {[key: string]: string[]}, conditionMapping: {[key: string]: string}, valueForFields: {[key: string]: string[]}){
        this.fields = fields;
        this.conditionForFields = conditionForFields;
        this.conditionMapping = conditionMapping;
        this.valueForFields = valueForFields;
        this.rule = {condition : '', type : 'rule'};
    }

    setCondition(field: string): string[]{
        if(field in this.conditionMapping)
            return this.conditionForFields[field];
        return this.conditionForFields['default'];
    }

    setValue(field: string): string[]{
        if(field in this.valueForFields)
            return this.valueForFields[field];
        return this.valueForFields['default'];
    }

    getQueryString(){
        return `${this.rule.field}  ${this.conditionMapping[this.rule.condition]}  ${this.rule.value}`;
    }

    getQueryRule(field: string, condition: string, criteria: string){
        this.rule.field = field;
        this.rule.condition = condition;
        this.rule.value = criteria;
        return this.rule;
    }
}


// let qb = new QueryBuilder(fields, conditionForFields, conditionMapping, valueForFields);

// function populateSelect(select, options){
//     let sel = document.getElementById(select);
//     for (let i = 0;i < options.length;i++){
//         let opt = document.createElement('option');
//         opt.value = options[i];
//         opt.innerHTML = options[i];
//         sel.appendChild(opt);
//     }
// }

// populateSelect('field', fields);

// function populateConditionsVals(){
//     let field = (<HTMLSelectElement>document.getElementById('field')).value;
//     populateSelect('condition', qb.setCondition(field))
//     populateSelect('criteria', qb.setValue(field))
// }

// function getQuery(){
//     let field = (<HTMLSelectElement>document.getElementById('field')).value;
//     let condition = (<HTMLSelectElement>document.getElementById('condition')).value;
//     let criteria = (<HTMLSelectElement>document.getElementById('criteria')).value;
//     document.getElementById('query').innerHTML = qb.getQueryString(field, condition, criteria);
// }



