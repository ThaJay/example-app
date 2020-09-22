const countriesBaseUrl = 'https://parseapi.back4app.com/classes/'
const backForAppApplicationId = 'YFfiLj9lLRC2OiEWBsAJoCQEEn31e2wTLxZGqgrz'
const backForAppApiKey = 'oNJzPsMn7xb9ODXfJT626wBXoQjkO5d7JLe3QXMT'
const headers = {
  'X-Parse-Application-Id': backForAppApplicationId,
  'X-Parse-REST-API-Key'  : backForAppApiKey
}

function getUrl (classname, queryString) {
  return `${countriesBaseUrl}${classname}${queryString}`
}

async function getJsonData (classname, queryString) {
  return await fetch(getUrl(classname, queryString), {headers}).then(response => response.json())
}

export function getContinents () {
  return getJsonData('Continentscountriescities_Continent', '?order=name&keys=name')
}

export function getCountriesByContinent (continentId) {
  const where = encodeURIComponent(JSON.stringify({
    continent: {
      __type   : 'Pointer',
      className: 'Continentscountriescities_Continent',
      objectId : continentId // 'X2rEcTJnsE' example id
    }
  }))

  return getJsonData('Continentscountriescities_Country', `order=name&keys=name&where=${where}`)
}
