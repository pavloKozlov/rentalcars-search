import SearchService from './SearchService';

const getResponseData = (values) => ({ results: { docs: values } });

describe('SearchService', () => {
  const mockFetchResolve = (values) => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(getResponseData(values)),
      })
    );
  };

  const mockFetchReject = () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.reject(new Error('some error')),
      })
    );
  };

  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    fetch.mockClear();
    console.error.mockClear();
  });

  it('should call the endpoint with search term and number of results 6', async () => {
    const SEARCH_TERM = 'some-search-term';
    mockFetchResolve([]);
    await SearchService.searchLocations(SEARCH_TERM);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=${SEARCH_TERM}`
    );
  });

  it('should resolve with all results', async () => {
    const VALUES = [
      {
        placeKey: 'key 1',
        name: 'some-name 1',
      },
      {
        placeKey: 'key 2',
        name: 'some-name 2',
      },
      {
        placeKey: 'key 3',
        name: 'some-name 3',
      },
    ];
    mockFetchResolve(VALUES);
    const result = await SearchService.searchLocations('term');
    expect(result).toEqual(VALUES);
  });

  it('should resolve with empty array if placeKey for first item is `undefined`', async () => {
    const VALUES = [
      {
        name: 'some-name 1',
      },
    ];
    mockFetchResolve(VALUES);
    const result = await SearchService.searchLocations('term');
    expect(result).toEqual([]);
  });

  it('should reject if API call fails', (done) => {
    mockFetchReject();
    SearchService.searchLocations('term')
      .then(() => {
        done.fail(
          'If fetch rejected, searchLocations method should throw an error'
        );
      })
      .catch(() => {
        done();
      });
  });
});
