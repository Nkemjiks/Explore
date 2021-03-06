const paths = {
  autoComplete: 'spelling/AutoComplete',
  webSearch: 'Search/WebSearchAPI',
  newSearch: 'Search/NewsSearchAPI',
  imageSearch: 'Search/ImageSearchAPI'
};

export async function makeApiCall(path: any, body: any, method: any) {
  const url = `${process.env.REACT_APP_API_ENDPOINT}/${path}`;

  const options: any = {
    method,
    headers: {
      "x-rapidapi-host": `${process.env.REACT_APP_RAPID_API_HOST}`,
	    "x-rapidapi-key": `${process.env.REACT_APP_RAPID_API_KEY}`
    },
  };
  try {
    const data = await fetch(url, options).catch((error: any) => {
      return new Error(error);
    });

    if (data instanceof Error) {
      throw data;
    }
    const res = await data.json();
    if (res.statusCode >= 400) {
      throw res.message;
    }
    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getAutoComplete(query: string) {
  const res = await makeApiCall(`${paths.autoComplete}?text=${query}`, null, 'GET');
  return res;
}

export async function getWebSearchResult(query: string, pageNumber: number) {
  const res = await makeApiCall(`${paths.webSearch}?q=${query}&pageNumber=${pageNumber}&pageSize=10&autoCorrect=true&safeSearch=false`, null, 'GET');
  return res;
}

export async function getNewSearchResult(query: string, pageNumber: number) {
  const res = await makeApiCall(`${paths.newSearch}?q=${query}&pageNumber=${pageNumber}&pageSize=10&autoCorrect=true&safeSearch=false`, null, 'GET');
  return res;
}

export async function getImageSearchResult(query: string, pageNumber: number) {
  const res = await makeApiCall(`${paths.imageSearch}?q=${query}&pageNumber=${pageNumber}&pageSize=10&autoCorrect=true&safeSearch=false`, null, 'GET');
  return res;
}
