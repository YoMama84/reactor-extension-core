import React from 'react';

import extensionViewReduxForm from '../extensionViewReduxForm';
import reduceReducers from 'reduce-reducers';
import DelayType, { formConfig as delayTypeFormConfig } from './components/delayType';
import AdvancedEventOptions, { formConfig as advancedEventOptionsFormConfig } from './components/advancedEventOptions';
import SpecificElements, { formConfig as specificElementsFormConfig } from './components/specificElements';

class Hover extends React.Component {
  render() {
    return (
      <div>
        <SpecificElements ref="specificElements" fields={this.props.fields}/>
        <DelayType ref="delayType" fields={this.props.fields}/>
        <AdvancedEventOptions ref="advancedEventOptions" fields={this.props.fields}/>
      </div>
    );
  }
}

const formConfig = {
  fields: delayTypeFormConfig.fields
    .concat(specificElementsFormConfig.fields, advancedEventOptionsFormConfig.fields),
  settingsToFormValues: reduceReducers(
    specificElementsFormConfig.settingsToFormValues,
    delayTypeFormConfig.settingsToFormValues,
    advancedEventOptionsFormConfig.settingsToFormValues
  ),
  formValuesToSettings: reduceReducers(
    specificElementsFormConfig.formValuesToSettings,
    delayTypeFormConfig.formValuesToSettings
  ),
  validate: reduceReducers(
    specificElementsFormConfig.validate,
    delayTypeFormConfig.validate
  )
};

export default extensionViewReduxForm(formConfig)(Hover);

