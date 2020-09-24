const apiBaseUrl = 'https://parseapi.back4app.com/classes/'
const backForAppApplicationId = 'YFfiLj9lLRC2OiEWBsAJoCQEEn31e2wTLxZGqgrz'
const backForAppApiKey = 'oNJzPsMn7xb9ODXfJT626wBXoQjkO5d7JLe3QXMT'
const headers = {
  'X-Parse-Application-Id': backForAppApplicationId,
  'X-Parse-REST-API-Key'  : backForAppApiKey
}

function getUrl (classname, queryString) {
  return `${apiBaseUrl}${classname}${queryString}`
}

async function getJsonData (url, init) {
  return await fetch(url, init).then(response => response.json())
}

function getApiData (classname, queryString) {
  return getJsonData(getUrl(classname, queryString), {headers})
}

export function getContinents () {
  return getApiData('Continentscountriescities_Continent', '?order=name&keys=name')
}

export function getCountriesByContinent (continentId) {
  const where = encodeURIComponent(JSON.stringify({
    continent: {
      __type   : 'Pointer',
      className: 'Continentscountriescities_Continent',
      objectId : continentId // 'X2rEcTJnsE' example id
    }
  }))

  return getApiData('Continentscountriescities_Country', `?order=name&keys=name,code&where=${where}`)
}

export function getPostalCodesFromCountry (amount, countryCode) {
  return getApiData(`Worldzipcode_${countryCode}`, `?limit=${amount}&order=postalCode&keys=postalCode,placeName`)
}
