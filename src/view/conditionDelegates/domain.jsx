import React from 'react';
import Coral from '@coralui/coralui-support-reduxform';
import CheckboxList from '../components/checkboxList';
import extensionViewReduxForm from '../extensionViewReduxForm';

class Domain extends React.Component {
  render() {
    const { domains } = this.props.fields;
    return <CheckboxList
      ref="domainsCheckboxList"
      options={this.props.domainOptions}
      {...domains}/>;
  }
}

const formConfig = {
  fields: ['domains'],
  formValuesToSettings(settings, values) {
    return {
      domains: values.domains || [] // An array is required.
    };
  }
};

const stateToProps = state => {
  return {
    domainOptions: state.propertySettings ? state.propertySettings.domainList : []
  };
};

export default extensionViewReduxForm(formConfig, stateToProps)(Domain);
