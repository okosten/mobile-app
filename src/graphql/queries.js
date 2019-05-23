import { gql } from 'react-apollo';

const getProducts = gql`
query {
  allProducts {
    id
    name
    type
    capacity
  }
}`;

const allRecipes = gql`
query {
  allRecipes {
    id
    name
    products
  }
}`;

const getProduct = gql`
  query Product($id: ID!) {
    Product(id: $id) {
      id
      name
      type
      capacity
    }
  }
`;

const getRecipe = gql`
  query Recipe($id: ID!) {
    Recipe(id: $id) {
      id
      name
      products
    }
  }
`;

const allProductLists = gql`
query {
  allProductLists {
    id
    name
  }
}`;

//const getPlayer = gql`
//  query allPlayers(filter: {
//    email_contains: "biggest"
//  }) {
//      id
//      name
//      email
//      phone
//      rating
//      playerType
//    }
//  }`;
const getUser = gql`
  query($email: String, $password: String) {
    allUsers(filter: {
      email_contains: $email,
      password_contains: $password
    }) {
      id
      name
      email
      phone
      rating
      playerType }
  }`;

const allUsers = gql`
  query($ratingfrom: Int, $ratigto: Int) {
    allUsers(filter: {
      rating_lte: $ratigto
    }) {
      id
      name
      email
      phone
      rating
      playerType }
  }`;

export {
  getProducts,
  getProduct,
  allRecipes,
  getRecipe,
  allProductLists,
  allUsers,
  getUser
}
