import React from 'react';
import { shallow } from 'enzyme';
import ResultsList from './ResultsList';
import ResultItem from './ResultItem/ResultsItem';

const OPTION_ID_PREFIX = 'some-prefix-';

const defaultProps = {
  values: [],
  emptyMessage: 'some message',
  selectedIndex: 0,
  className: 'some-class',
  optionIdPrefix: OPTION_ID_PREFIX,
  onItemClick: jest.fn(),
  onItemHover: jest.fn(),
};

describe('ResultsList', () => {
  const render = (props = {}) =>
    shallow(
      <ResultsList
        {...{
          ...defaultProps,
          ...props,
        }}
      />
    );

  describe('list', () => {
    const getList = (wrapper) => wrapper.find('ul');

    it('should not render empty ul if there are no values', () => {
      const wrapper = render();

      const ul = getList(wrapper);
      expect(ul.exists()).toBe(false);
    });

    it('should render ul with role === `listbox` if there are values', () => {
      const values = [
        {
          placeKey: '1',
          placeType: 'place 1',
        },
      ];
      const wrapper = render({
        values,
      });
      const ul = getList(wrapper);
      expect(ul.exists()).toBe(true);
      expect(ul.prop('role')).toBe('listbox');
    });

    it('should concatenetae classNames on the top level of the component', () => {
      const ADDITIONAL_CLASS_NAME = 'another-class-name and-more-css';
      const wrapper = render({
        className: ADDITIONAL_CLASS_NAME,
      });

      const topLevelDiv = wrapper.find('div');
      expect(topLevelDiv.prop('className')).toBe(
        `results-list ${ADDITIONAL_CLASS_NAME}`
      );
    });

    it('shold render ul with ResultList items if there are values', () => {
      const SELECTED_INDEX = 2;
      const values = [
        {
          placeKey: '1',
          placeType: 'place 1',
        },
        {
          placeKey: '2',
          placeType: 'place 2',
        },
        {
          placeKey: '3',
          placeType: 'place 3',
        },
      ];
      const wrapper = render({
        values,
        selectedIndex: SELECTED_INDEX,
      });

      const ul = getList(wrapper);
      expect(ul.exists()).toBe(true);

      const items = ul.find(ResultItem);
      expect(items.length).toBe(values.length);
      for (let i = 0; i < values.length; i++) {
        const item = items.get(i);
        expect(item.key).toBe(values[i].placeKey);
        expect(item.props.value).toBe(values[i]);
        expect(item.props.id).toBe(`${OPTION_ID_PREFIX}${i}`);
        expect(item.props.isSelected).toBe(i === SELECTED_INDEX);
      }
    });

    it('should call onItemClick callback when the list is clicked', () => {
      const clickHandler = jest.fn();

      const values = [
        {
          placeKey: '1',
          placeType: 'place 1',
        },
        {
          placeKey: '2',
          placeType: 'place 2',
        },
      ];
      const wrapper = render({
        values,
        onItemClick: clickHandler,
      });

      const ul = getList(wrapper);
      expect(ul.exists()).toBe(true);

      const items = ul.find(ResultItem);
      expect(items.exists()).toBe(true);
      ul.simulate('click');
      expect(clickHandler.mock.calls.length).toBe(1);
    });
  });

  describe('empty message', () => {
    const getEmptyMessage = (wrapper) => wrapper.find('.results-list__empty');

    it('should not render empty message if there are values', () => {
      const emptyMessage = 'some empty message';
      const wrapper = render({
        values: [
          {
            placeKey: '1',
            placeType: 'place 1',
          },
        ],
        emptyMessage,
      });

      const message = getEmptyMessage(wrapper);
      expect(message.exists()).toBe(false);
    });

    it('should render empty message if there are no values', () => {
      const emptyMessage = 'some empty message';
      const wrapper = render({
        values: [],
        emptyMessage,
      });

      const message = getEmptyMessage(wrapper);
      expect(message.text()).toBe(emptyMessage);
    });
  });
});
