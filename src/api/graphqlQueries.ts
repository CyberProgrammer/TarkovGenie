

export const GET_HIDEOUT_STATIONS_QUERY = `
  query {
    hideoutStations {
      id
      name
      imageLink
      levels {
        id
        level
        description
        itemRequirements {
          id
          count
          item {
            id
            name
            iconLink
          }
        }
        stationLevelRequirements {
          id
          station {
            id
            name
            imageLink
          }
          level
        }
        skillRequirements {
          id
          name
          level
        }
        traderRequirements {
          id
          trader {
            id
            name
            imageLink
          }
          value
        }
      }
    }
  }
`;

export const GET_ITEMS_QUERY = `
    query{
        items{
            id
            name
            image512pxLink
        }
    }`;