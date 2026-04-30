/**
 * @typedef {object} ResolverContext
 * @property {{ locationsAPI: { getAllLocations: () => unknown[], getLocation: (id: string) => unknown } }} dataSources
 */

/** @type {Record<string, Record<string, import('graphql').GraphQLFieldResolver<any, any>>>} */
const resolvers = {
  Query: {

    // Resolver for the 'locations' query, which retrieves all locations from the data source.
    /**
    This code snippet is a resolver function for the 
    locations
    field in a GraphQL query. It takes three arguments: _ (unused), 
    __
    (unused), and { dataSources }. The dataSources object is destructured to access the locationsAPI property, which is an instance of an API class. The function calls the getAllLocations 
    method on the locationsAPI object, which returns an array of locations. The function then returns this array.
    **/
    locations: (_, __, { dataSources }) => {
      return dataSources.locationsAPI.getAllLocations();
    },

    // Resolver for the 'location' query, which retrieves a specific location by its ID from the data source.
    /**
    This code snippet is a resolver function for the 
    location
    field in a GraphQL query. It takes three arguments: _ (unused), { id } (the ID of the location to retrieve), and { dataSources }. The dataSources object is destructured to access the locationsAPI property, which is an instance of an API class. The function calls the getLocation method on the locationsAPI object, passing in the id argument. This method returns a specific location based on the provided ID. The function then returns this location.
    **/
    location: (_, { id }, { dataSources }) => {
      return dataSources.locationsAPI.getLocation(id);
    },
  },
  Location: {
    __resolveReference: ( { id }, { dataSources }) => {
      // This resolver is used to resolve references to the Location type from other subgraphs. 
      // The location object contains an id field that we can use to retrieve the full location object from the data source.
      return dataSources.locationsAPI.getLocation(id);
    }
  },
};

module.exports = resolvers;
