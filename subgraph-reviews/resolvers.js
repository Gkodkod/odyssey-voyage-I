/**
 * @typedef {object} LocationReviewInput
 * @property {string} comment
 * @property {number} rating
 * @property {string} locationId
 *
 * @typedef {object} Review
 * @property {string} id
 * @property {string} [comment]
 * @property {number} [rating]
 *
 * @typedef {object} ResolverContext
 * @property {{ reviewsAPI: { getLatestReviews: () => Review[], submitReviewForLocation: (review: LocationReviewInput) => Review } }} dataSources
 */

/** @type {Record<string, Record<string, import('graphql').GraphQLFieldResolver<any, any>>>} */
const resolvers = {
  Query: {
    latestReviews: (_, __, { dataSources }) => {
      return dataSources.reviewsAPI.getLatestReviews();
    },
  },
  Review: {
    location: ({ locationId }) => {
      // The review object contains a locationId field that we can use to reference the Location type in the locations subgraph.
      return { id: locationId };
    },
  },
  Location: {
    //This code snippet defines a resolver function called __resolveReference that takes a parameter
    //location andd simply returns the location object as is.This resolver function is used in GraphQL to
    // resolve references to the Location type from other subgraphs.It is optional and is provided by default
    // by Apollo Server. It is used to resolve references to the Location type from other subgraphs.

    // When the reviews subgraph has gathered all of the data for each representation object, it combines it and sends it back to the router as the return value of the _entities field. The router then uses the __resolveReference resolver to resolve the reference to the Location type from the locations subgraph. In this case, since we are simply returning the location object as is, we can omit this resolver function and Apollo Server will use the default implementation, which also simply returns the location object as is. However, if we wanted to perform some additional logic to resolve the reference to the Location type, we could implement this resolver function to do so.
    __resolveReference: (location) => {
      return location;
    },
    overallRating: ({ id }, _, { dataSources }) => {
      // The location object contains an id field that we can use to retrieve all reviews for this location from the data source.
      return dataSources.reviewsAPI.getOverallRatingForLocation(id);
    },
    reviewsForLocation: ({ id }, _, { dataSources }) => {
      return dataSources.reviewsAPI.getReviewsForLocation(id);
    },
  },
  Mutation: {
    submitReview: (_, { locationReview }, { dataSources }) => {
      const newReview = dataSources.reviewsAPI.submitReviewForLocation(locationReview);
      return { code: 200, success: true, message: 'success', locationReview: newReview };
    },
  },
};

module.exports = resolvers;
