import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
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
    mount(<ResultsListContainer {...{ ...defaultProps, ...props }} />);
  const originAddListener = document.addEventListener;
  let addListenerMock;

  beforeEach(() => {
    addListenerMock = jest
      .spyOn(document, 'addEventListener')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    addListenerMock.mockClear();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render ResultsList', () => {
    const wrapper = render({ values: [] });
    const resultsList = wrapper.find(ResultsList);
    expect(resultsList.prop('values')).toEqual([]);
    expect(resultsList.prop('selectedIndex')).toEqual(-1);
    expect(resultsList.prop('emptyMessage')).toEqual(defaultProps.emptyMessage);
    expect(resultsList.prop('className')).toEqual(defaultProps.className);
    expect(resultsList.prop('optionIdPrefix')).toEqual(
      defaultProps.optionIdPrefix
    );
  });

  it('should set 0 index as selected when values changes and values.length > 0', () => {
    const wrapper = render();
    const resultsList = wrapper.find(ResultsList);
    expect(resultsList.prop('selectedIndex')).toEqual(0);
    expect(resultsList.prop('values')).toEqual(defaultProps.values);
  });

  it('should set -1 index as selected when values changes and values.length === 0', () => {
    const wrapper = render();
    let resultsList = wrapper.find(ResultsList);
    expect(resultsList.prop('selectedIndex')).toEqual(0);

    wrapper.setProps({ values: [] });
    wrapper.update();
    resultsList = wrapper.find(ResultsList);
    expect(resultsList.prop('selectedIndex')).toEqual(-1);
  });

  it('should change selectedIndex and call onChange, onSelectionChange when onItemClick called from ResultsList', () => {
    const onChange = jest.fn();
    const onSelectionChange = jest.fn();
    const IDX = 1;
    const wrapper = render({
      onChange,
      onSelectionChange,
    });
    let resultsList = wrapper.find(ResultsList);
    expect(onChange.mock.calls.length).toBe(0);
    expect(onSelectionChange.mock.calls.length).toBe(1); // after useEffect
    act(() => {
      resultsList.prop('onItemClick')({ idx: IDX });
    });
    wrapper.update();
    resultsList = wrapper.find(ResultsList);
    expect(resultsList.prop('selectedIndex')).toEqual(IDX);
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange).toHaveBeenCalledWith(defaultProps.values[IDX]);
    expect(onSelectionChange.mock.calls.length).toBe(2);
    expect(onSelectionChange).toHaveBeenCalledWith(IDX);
  });

  it('should not change selectedIndex and not call onChange, onSelectionChange when onItemClick called from ResultsList and `getOptionIndexFromEvent` resolves with -1', () => {
    const onChange = jest.fn();
    const onSelectionChange = jest.fn();
    const IDX = -1;
    const wrapper = render({
      onChange,
      onSelectionChange,
    });
    let resultsList = wrapper.find(ResultsList);
    expect(onChange.mock.calls.length).toBe(0);
    expect(onSelectionChange.mock.calls.length).toBe(1); // after useEffect
    act(() => {
      resultsList.prop('onItemClick')({ idx: IDX });
    });
    wrapper.update();
    resultsList = wrapper.find(ResultsList);
    expect(resultsList.prop('selectedIndex')).toEqual(0); // 0 is default with value.length > 0
    expect(onChange.mock.calls.length).toBe(0);
    expect(onSelectionChange.mock.calls.length).toBe(1);
  });

  it('should change selectedIndex and call onSelectionChange when onItemHover called from ResultsList', () => {
    const onChange = jest.fn();
    const onSelectionChange = jest.fn();
    const IDX = 1;
    const wrapper = render({
      onChange,
      onSelectionChange,
    });
    let resultsList = wrapper.find(ResultsList);
    expect(onChange.mock.calls.length).toBe(0);
    expect(onSelectionChange.mock.calls.length).toBe(1); // after useEffect
    act(() => {
      resultsList.prop('onItemHover')({ idx: IDX });
    });
    wrapper.update();
    resultsList = wrapper.find(ResultsList);
    expect(resultsList.prop('selectedIndex')).toEqual(IDX);
    expect(onChange.mock.calls.length).toBe(0);
    expect(onSelectionChange.mock.calls.length).toBe(2);
    expect(onSelectionChange).toHaveBeenCalledWith(IDX);
  });

  it('should not change selectedIndex and not call onSelectionChange when onItemHover called from ResultsList and `getOptionIndexFromEvent` resolves with -1', () => {
    const onChange = jest.fn();
    const onSelectionChange = jest.fn();
    const IDX = -1;
    const wrapper = render({
      onChange,
      onSelectionChange,
    });
    let resultsList = wrapper.find(ResultsList);
    expect(onChange.mock.calls.length).toBe(0);
    expect(onSelectionChange.mock.calls.length).toBe(1); // after useEffect
    act(() => {
      resultsList.prop('onItemHover')({ idx: IDX });
    });
    wrapper.update();
    resultsList = wrapper.find(ResultsList);
    expect(resultsList.prop('selectedIndex')).toEqual(0); // 0 is default with value.length > 0
    expect(onChange.mock.calls.length).toBe(0);
    expect(onSelectionChange.mock.calls.length).toBe(1);
  });

  describe('useKeyPress', () => {
    let wrapper;
    let onChange = jest.fn();
    let onSelectionChange = jest.fn();

    const VALUES = [
      {
        placeKey: 'place 1',
      },
      {
        placeKey: 'place 2',
      },
      {
        placeKey: 'place 3',
      },
    ];

    beforeEach(() => {
      // set original add event listener implementation here
      addListenerMock.mockImplementation(originAddListener);
      onChange = jest.fn();
      onSelectionChange = jest.fn();
      wrapper = render({
        values: VALUES,
        onChange,
        onSelectionChange,
      });
    });

    it('should increment index when arrow down is pressed', () => {
      let resultsList = wrapper.find(ResultsList);
      expect(resultsList.prop('selectedIndex')).toEqual(0); // 0 is default with value.length > 0
      expect(onSelectionChange.mock.calls.length).toBe(1);
      act(() => {
        const event = new KeyboardEvent('keydown', { keyCode: 40 });
        document.dispatchEvent(event);
      });
      wrapper.update();
      resultsList = wrapper.find(ResultsList);
      expect(resultsList.prop('selectedIndex')).toEqual(1);
      expect(onSelectionChange.mock.calls.length).toBe(2);
      expect(onSelectionChange).toHaveBeenCalledWith(1);
    });

    it('should increment index when arrow down is pressed and move to 0 when moves out of the range', () => {
      const lastIndex = VALUES.length - 1;
      let resultsList = wrapper.find(ResultsList);
      act(() => {
        resultsList.prop('onItemHover')({ idx: lastIndex });
      });
      wrapper.update();
      resultsList = wrapper.find(ResultsList);
      expect(resultsList.prop('selectedIndex')).toEqual(lastIndex);
      expect(onSelectionChange.mock.calls.length).toBe(2);
      act(() => {
        const event = new KeyboardEvent('keydown', { keyCode: 40 });
        document.dispatchEvent(event);
      });
      wrapper.update();
      resultsList = wrapper.find(ResultsList);
      expect(resultsList.prop('selectedIndex')).toEqual(0);
      expect(onSelectionChange.mock.calls.length).toBe(3);
      expect(onSelectionChange).toHaveBeenCalledWith(0);
    });

    it('should decrement index when arrow up is pressed', () => {
      let resultsList = wrapper.find(ResultsList);
      act(() => {
        resultsList.prop('onItemHover')({ idx: 2 });
      });
      wrapper.update();
      resultsList = wrapper.find(ResultsList);
      expect(resultsList.prop('selectedIndex')).toEqual(2);
      expect(onSelectionChange.mock.calls.length).toBe(2);
      act(() => {
        const event = new KeyboardEvent('keydown', { keyCode: 38 });
        document.dispatchEvent(event);
      });
      wrapper.update();
      resultsList = wrapper.find(ResultsList);
      expect(resultsList.prop('selectedIndex')).toEqual(1);
      expect(onSelectionChange.mock.calls.length).toBe(3);
      expect(onSelectionChange).toHaveBeenCalledWith(1);
    });

    it('should decrement index when arrow up is pressed, and move to the last index when the currect selected index is 0', () => {
      const lastIndex = VALUES.length - 1;
      let resultsList = wrapper.find(ResultsList);
      expect(resultsList.prop('selectedIndex')).toEqual(0); // 0 is default with value.length > 0
      expect(onSelectionChange.mock.calls.length).toBe(1);
      act(() => {
        const event = new KeyboardEvent('keydown', { keyCode: 38 });
        document.dispatchEvent(event);
      });
      wrapper.update();
      resultsList = wrapper.find(ResultsList);
      expect(resultsList.prop('selectedIndex')).toEqual(lastIndex);
      expect(onSelectionChange.mock.calls.length).toBe(2);
      expect(onSelectionChange).toHaveBeenCalledWith(lastIndex);
    });

    it('should call onChange with currently selected value when space key is pressed', () => {
      const INDEX = 2;
      const resultsList = wrapper.find(ResultsList);
      act(() => {
        resultsList.prop('onItemHover')({ idx: INDEX });
      });
      wrapper.update();
      expect(onChange.mock.calls.length).toBe(0);
      act(() => {
        const event = new KeyboardEvent('keydown', { keyCode: 32 });
        document.dispatchEvent(event);
      });
      wrapper.update();
      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange).toHaveBeenCalledWith(VALUES[INDEX]);
    });

    it('should call onChange with currently selected value when enter key is pressed', () => {
      const INDEX = 1;
      const resultsList = wrapper.find(ResultsList);
      act(() => {
        resultsList.prop('onItemHover')({ idx: INDEX });
      });
      wrapper.update();
      expect(onChange.mock.calls.length).toBe(0);
      act(() => {
        const event = new KeyboardEvent('keydown', { keyCode: 13 });
        document.dispatchEvent(event);
      });
      wrapper.update();
      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange).toHaveBeenCalledWith(VALUES[INDEX]);
    });
  });
});
