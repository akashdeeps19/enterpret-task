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

    setQueryRule(field: string, condition: string, criteria: string){
        this.rule.field = field;
        this.rule.condition = condition;
        this.rule.value = criteria;
    }

    getQueryRule(){
        return this.rule;
    }
}

export class GroupFilter{
    ruleGroup: RuleGroup;
    fields: string[];
    conditionForFields: {[key: string]: string[]};
    conditionMapping: {[key: string]: string};
    valueForFields: {[key: string]: string[]};
    children: (FilterBuilder | GroupFilter)[];

    constructor(fields: string [], conditionForFields: {[key: string]: string[]}, conditionMapping: {[key: string]: string}, valueForFields: {[key: string]: string[]}){
        this.fields = fields;
        this.conditionForFields = conditionForFields;
        this.conditionMapping = conditionMapping;
        this.valueForFields = valueForFields;
        this.ruleGroup = {children: [], conjunction: 'AND', not: false, type : 'rule_group'};
        this.children = [];
    }

    addGroupFilter(){
        this.children.push(new GroupFilter(this.fields, this.conditionForFields, this.conditionMapping, this.valueForFields));
        (this.children[this.children.length-1] as GroupFilter).addFilter();
        return this.children[this.children.length-1]
    }
    addFilter(){
        this.children.push(new FilterBuilder(this.fields, this.conditionForFields, this.conditionMapping, this.valueForFields));
        return this.children[this.children.length-1]
    }

    getQueryRule(){
        this.ruleGroup.children = [];
        for(let child of this.children){
            this.ruleGroup.children.push(child.getQueryRule())
        }
        return this.ruleGroup;
    }

    getQueryString(){
        this.getQueryRule()
        let opMap = {'AND' : '&&', 'OR' : '||'};
        let query = "(";
        for(let i = 0;i < this.children.length-1;i++){
            query += `${this.children[i].getQueryString()}  ${opMap[this.ruleGroup.conjunction]} `;
        }
        query += this.children[this.children.length-1].getQueryString() + ')';
        return query;
    }
}