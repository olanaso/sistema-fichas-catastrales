import config from './../config'
export const countryReducer = (state, action) => {
    switch (action.type) {
      case 'SET_COUNTRY':
        return config.countries[action.countryId]
      case 'SET_ADMIN_LEVEL':
        return action.payload.adminLevel
      case 'CLEAR_STATS':
        config.countries[action.countryId]['dataLayers'] = []
        return config.countries[action.countryId]
      case 'SET_STATS':
        config.countries[action.countryId]['dataLayers'] = action.dataLayers
        return config.countries[action.countryId]
      default:
        return state
    }
  }
  