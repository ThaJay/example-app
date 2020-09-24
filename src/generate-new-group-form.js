import React, {Component} from 'react'
import {Block, Select, Option, Loading, AddButtonWithLabel} from './base-components'
import {getContinents, getCountriesByContinent, getPostalCodesFromCountry} from './fetch-data'


export class GenerateNewGroupForm extends Component {
  state = {
    continentsLoading: true,
    continents       : [],
    selectedContinent: '',

    countriesLoading: false,
    countries       : [],
    selectedCoutry  : '',

    groupSize: 20
  }

  componentDidMount () {
    getContinents().then(
      response => {
        this.setContinentsLoading(false)
        this.setState({continents:response.results})
      }
    )
  }

  render () {
    return (
      <Block>
        <SelectApiData
          name='continent'
          loading={this.state.continentsLoading}
          setLoading={this.setContinentsLoading}
          items={this.state.continents}
          value={this.state.selectedContinent}
          setValue={this.setContinent}
        />

        <SelectApiData
          name='country'
          hidden={!this.state.selectedContinent}
          loading={this.state.countriesLoading}
          setLoading={this.setCountriesLoading}
          items={this.state.countries}
          value={this.state.selectedCountry}
          setValue={this.setCountry}
        />

        <GroupSize
          hidden={!this.countriesLoaded}
          value={this.state.groupSize}
          onChange={this.setGroupSize}
        />

        <GenerateGroupButton
          hidden={!this.countriesLoaded}
          onClick={this.generateGroup}
        />
      </Block>
    )
  }

  get countriesLoaded () {
    return (this.state.selectedContinent && !this.state.countriesLoading)
  }

  setGroupSize = event => {
    this.setState({groupSize:event.target.value})
  }

  setContinent  = event => {
    this.setState({
      selectedContinent: event.target.value,
      countriesLoading : true
    })

    getCountriesByContinent(event.target.value).then(
      response => {
        this.setState({
          countriesLoading: false,
          countries       : response.results
        })
      }
    )
  }

  setCountry  = event => {
    this.setState({selectedCoutry:event.target.value})
  }

  setContinentsLoading = continentsLoading => {
    this.setState({continentsLoading})
  }

  generateGroup = () => {
    const [name, code] = this.getCountryDetails(this.state.selectedCoutry)
    getPostalCodesFromCountry(
      this.state.groupSize, code
    ).then(response => {
      this.props.addGroup(name, response.results)
    })
  }

  getCountryDetails (countryId) {
    for (const country of this.state.countries) {
      if (country.objectId === countryId) return [country.name, country.code]
    }
  }
}


class SelectApiData extends Component {
  render () {
    if (this.props.hidden) return null
    else if (this.props.loading) return <Loading name={`${this.props.name} list`} />
    else {
      return (
        <Select
          name={this.props.name}
          label={`Select ${this.props.name}:`}
          value={this.props.value}
          onChange={this.props.setValue}
        >
          <Option
            value=''
            name={`Please select a ${this.props.name}`}
          />

          {this.options}
        </Select>
      )
    }
  }

  get options () {
    return [...this.optionsGenerator()]
  }

  * optionsGenerator () {
    for (const item of this.props.items) {
      yield (
        <Option
          key={item.objectId}
          value={item.objectId}
          name={item.name}
        />
      )
    }
  }
}


function GroupSize (props) {
  if (props.hidden) return null
  else {
    return (
      <Block>
        <label>
          Group size:
        </label>

        <input
          {...props}
          type='number' // after props so can not be overwritten
        />
      </Block>
    )
  }
}

function GenerateGroupButton (props) {
  if (props.hidden) return null
  else {
    return (
      <AddButtonWithLabel
        ButtonLabel='Generate Group'
        onClick={props.onClick}
      />
    )
  }
}
