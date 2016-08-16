import { mount } from 'enzyme';
import Textfield from '@coralui/react-coral/lib/Textfield';
import { ReduxFormSelect as Select } from '@reactor/react-components';

import ElementFilter from '../components/elementFilter';
import TimePlayed from '../timePlayed';
import { getFormComponent, createExtensionBridge } from '../../__tests__/helpers/formTestUtils';
import AdvancedEventOptions from '../components/advancedEventOptions';

const getReactComponents = (wrapper) => {
  const amountField = wrapper.find(Textfield).filterWhere(n => n.prop('name') === 'amount').node;
  const unitSelect = wrapper.find(Select).node;
  const elementFilter = wrapper.find(ElementFilter).node;
  const advancedEventOptions = wrapper.find(AdvancedEventOptions).node;

  return {
    amountField,
    unitSelect,
    elementFilter,
    advancedEventOptions
  };
};

describe('time played view', () => {
  let extensionBridge;
  let instance;

  beforeAll(() => {
    extensionBridge = createExtensionBridge();
    instance = mount(getFormComponent(TimePlayed, extensionBridge));
  });

  it('sets form values from settings', () => {
    extensionBridge.init({
      settings: {
        elementSelector: '.foo',
        amount: 55,
        unit: 'percent',
        bubbleStop: true
      }
    });

    const {
      amountField,
      unitSelect,
      elementFilter,
      advancedEventOptions
    } = getReactComponents(instance);

    expect(amountField.props.value).toBe(55);
    expect(unitSelect.props.value).toBe('percent');
    expect(elementFilter.props.fields.elementSelector.value).toBe('.foo');
    expect(advancedEventOptions.props.fields.bubbleStop.value).toBe(true);
  });

  it('sets settings from form values', () => {
    extensionBridge.init();

    const { amountField, elementFilter, advancedEventOptions } = getReactComponents(instance);

    amountField.props.onChange(45);
    elementFilter.props.fields.elementSelector.onChange('.foo');
    advancedEventOptions.props.fields.bubbleStop.onChange(true);

    const { amount, unit, elementSelector, bubbleStop } = extensionBridge.getSettings();
    expect(amount).toBe(45);
    expect(unit).toBe('second');
    expect(elementSelector).toBe('.foo');
    expect(bubbleStop).toBe(true);
  });

  it('sets validation errors', () => {
    extensionBridge.init();

    const { amountField, elementFilter } = getReactComponents(instance);

    expect(extensionBridge.validate()).toBe(false);
    expect(amountField.props.error).toEqual(jasmine.any(String));
    expect(elementFilter.props.fields.elementSelector.error).toEqual(jasmine.any(String));
  });
});
