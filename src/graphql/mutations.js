import { gql } from 'react-apollo';

const createProduct = gql`
  mutation createProduct($name: String!, $type: Int!, $capacity: Float!) {
    createProduct(name: $name, type: $type, capacity: $capacity) {
      id
      name
      type
      capacity
    }
  }`;

const createRecipe = gql`
  mutation createRecipe($name: String!, $products: [String!]) {
    createRecipe(name: $name, products: $products) {
      id
      name
      products
    }
  }`;

const createUser = gql`
  mutation createUser($name: String!, $password: String!, $email: String!, $phone: String!, $rating: Int!, $playerType: PlayerType!) {
    createUser(name: $name, password: $password, email: $email, phone: $phone, rating: $rating, playerType: $playerType) {
      id
      name
      phone
      rating
      playerType
    }
  }`;

const createOffer = gql`
  mutation createOffer($userId: ID!, $startRating: Int, $endRating: Int, $preferredStyle: PlayerType!, $dates: [OfferdatesOfferDate!]) {
    createOffer(userId: $userId, endRating: $endRating, startRating: $startRating, preferredStyle: $preferredStyle, dates: $dates) {
      id
      dates {
        offerId {
          id
        }
      }
    }
  }`;

//type Offer @model {
//  id: ID! @isUnique
//  userId: User! @relation(name: "UserOnOffer")
//  dates: [OfferDate!]! @relation(name: "DateOnOffer")
//  createdAt: DateTime!
//  updatedAt: DateTime!
//  startRating: Int
//  endRating: Int
//  preferredStyle: PlayerType!
//}

const deleteProduct = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

const deleteRecipe = gql`
  mutation deleteRecipe($id: ID!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`;


export {
  createProduct,
  deleteProduct,
  deleteRecipe,
  createRecipe,
  createUser,
  createOffer
}