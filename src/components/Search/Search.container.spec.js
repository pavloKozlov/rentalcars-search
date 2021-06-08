import React from 'react';
import { shallow } from 'enzyme';
import SearchService from '../../services/SearchService';
import { flushPromises } from '../../utils/testUtils';
import SearchContainer from './Search.container';
import Search from './Search';

const DEFAULT_VALUES = [
  {
    placeKey: 'place 1',
  },
  {
    placeKey: 'place 2',
  },
  {
    placeKey: 'place 3',
  },
  {
    placeKey: 'place 4',
  },
];

describe('Search container', () => {
  const render = () => shallow(<SearchContainer />);

  let wrapper;
  let searchLocationsServiceMock;

  beforeEach(() => {
    searchLocationsServiceMock = jest
      .spyOn(SearchService, 'searchLocations')
      .mockImplementation(() => Promise.resolve(DEFAULT_VALUES));
    wrapper = render();
  });

  afterEach(() => {
    searchLocationsServiceMock.mockClear();
  });

  it('should call SearchService.searchLocations with search string passed to onChange handler, set isLoading and set results if string length is >= 2', async () => {
    const searchValue = 'ab';
    let search = wrapper.find(Search);
    search.prop('onChange')(searchValue);
    search = wrapper.find(Search);
    expect(search.prop('isLoading')).toBe(true);
    expect(search.prop('isResultsVisible')).toBe(false);
    await flushPromises();

    search = wrapper.find(Search);
    expect(searchLocationsServiceMock.mock.calls.length).toBe(1);
    expect(searchLocationsServiceMock).toHaveBeenCalledWith(searchValue);
    expect(search.prop('results')).toEqual(DEFAULT_VALUES);
    expect(search.prop('isResultsVisible')).toBe(true);
  });

  it('should not call SearchService.searchLocations with search string passed to onChange handler and hide results if string length is 1', async () => {
    let search = wrapper.find(Search);
    search.prop('onChange')('abc'); // set non-empty result
    await flushPromises();

    search = wrapper.find(Search);
    expect(searchLocationsServiceMock.mock.calls.length).toBe(1);
    expect(search.prop('results')).toEqual(DEFAULT_VALUES);
    expect(search.prop('isResultsVisible')).toBe(true);

    // set one char search
    const searchValue = 'a';
    search.prop('onChange')(searchValue);
    await flushPromises();

    search = wrapper.find(Search);
    expect(searchLocationsServiceMock.mock.calls.length).toBe(1); // calls count remains the same
    expect(search.prop('results')).toEqual(DEFAULT_VALUES);
    expect(search.prop('isResultsVisible')).toBe(false);
  });

  it('should not call SearchService.searchLocations with search string passed to onChange handler and hide results if string length is 0 and set results to []', async () => {
    let search = wrapper.find(Search);
    search.prop('onChange')('abc'); // set non-empty result
    await flushPromises();

    search = wrapper.find(Search);
    expect(searchLocationsServiceMock.mock.calls.length).toBe(1);
    expect(search.prop('results')).toEqual(DEFAULT_VALUES);
    expect(search.prop('isResultsVisible')).toBe(true);

    // set empty search
    search.prop('onChange')('');
    await flushPromises();

    search = wrapper.find(Search);
    expect(searchLocationsServiceMock.mock.calls.length).toBe(1); // calls count remains the same
    expect(search.prop('results')).toEqual([]);
    expect(search.prop('isResultsVisible')).toBe(false);
  });
});
