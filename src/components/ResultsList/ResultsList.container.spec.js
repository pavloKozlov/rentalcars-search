import React from 'react';
import { shallow } from 'enzyme';
import ResultsListContainer from './ResultsList.container';
import ResultsList from './ResultsList';

const defaultProps = {
  values: [
    {
      placeKey: 'place 1',
    },
    {
      placeKey: 'place 2',
    },
  ],
  selectedIndex: 1,
  emptyMessage: 'some-message',
  className: 'some-css-class-name',
  optionIdPrefix: 'some-prefix',
  onChange: jest.fn(),
  onSelectionChange: jest.fn(),
};

jest.mock('./resultsListUtils', () => ({
  getOptionIndexFromEvent: (mockElm) => mockElm.idx,
}));

describe('ResultsList container', () => {
  const render = (props) =>
    shallow(<ResultsListContainer {...{ ...defaultProps, ...props }} />);

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render ResultsList', () => {
    const wrapper = render({ values: [] });

    const resultsList = wrapper.find(ResultsList);
    expect(resultsList.prop('values')).toEqual([]);
    expect(resultsList.prop('selectedIndex')).toEqual(
      defaultProps.selectedIndex
    );
    expect(resultsList.prop('emptyMessage')).toEqual(defaultProps.emptyMessage);
    expect(resultsList.prop('className')).toEqual(defaultProps.className);
    expect(resultsList.prop('optionIdPrefix')).toEqual(
      defaultProps.optionIdPrefix
    );
  });

  it('should change call onChange, onSelectionChange when onItemClick called from ResultsList', () => {
    const onChange = jest.fn();
    const onSelectionChange = jest.fn();
    const IDX = 1;
    const wrapper = render({
      onChange,
      onSelectionChange,
    });

    let resultsList = wrapper.find(ResultsList);
    expect(onChange.mock.calls.length).toBe(0);
    expect(onSelectionChange.mock.calls.length).toBe(0);
    resultsList.prop('onItemClick')({ idx: IDX });

    resultsList = wrapper.find(ResultsList);
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange).toHaveBeenCalledWith(defaultProps.values[IDX]);
    expect(onSelectionChange.mock.calls.length).toBe(1);
    expect(onSelectionChange).toHaveBeenCalledWith(IDX);
  });

  it('should not call onChange, onSelectionChange when onItemClick called from ResultsList and `getOptionIndexFromEvent` resolves with -1', () => {
    const onChange = jest.fn();
    const onSelectionChange = jest.fn();
    const IDX = -1;
    const wrapper = render({
      onChange,
      onSelectionChange,
    });

    let resultsList = wrapper.find(ResultsList);
    expect(onChange.mock.calls.length).toBe(0);
    expect(onSelectionChange.mock.calls.length).toBe(0);
    resultsList.prop('onItemClick')({ idx: IDX });

    resultsList = wrapper.find(ResultsList);
    expect(onChange.mock.calls.length).toBe(0);
    expect(onSelectionChange.mock.calls.length).toBe(0);
  });

  it('should call onSelectionChange when onItemHover called from ResultsList', () => {
    const onChange = jest.fn();
    const onSelectionChange = jest.fn();
    const IDX = 1;
    const wrapper = render({
      onChange,
      onSelectionChange,
    });

    let resultsList = wrapper.find(ResultsList);
    expect(onChange.mock.calls.length).toBe(0);
    expect(onSelectionChange.mock.calls.length).toBe(0);
    resultsList.prop('onItemHover')({ idx: IDX });

    resultsList = wrapper.find(ResultsList);
    expect(onChange.mock.calls.length).toBe(0);
    expect(onSelectionChange.mock.calls.length).toBe(1);
    expect(onSelectionChange).toHaveBeenCalledWith(IDX);
  });

  it('should not call onSelectionChange when onItemHover called from ResultsList and `getOptionIndexFromEvent` resolves with -1', () => {
    const onChange = jest.fn();
    const onSelectionChange = jest.fn();
    const IDX = -1;
    const wrapper = render({
      onChange,
      onSelectionChange,
    });

    let resultsList = wrapper.find(ResultsList);
    expect(onChange.mock.calls.length).toBe(0);
    expect(onSelectionChange.mock.calls.length).toBe(0);

    resultsList.prop('onItemHover')({ idx: IDX });
    resultsList = wrapper.find(ResultsList);
    expect(onChange.mock.calls.length).toBe(0);
    expect(onSelectionChange.mock.calls.length).toBe(0);
  });
});
