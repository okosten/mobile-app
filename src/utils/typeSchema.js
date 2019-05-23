
const productSchema = function() {
  return {
    id: null,
    name: '',
    type: 0,
    capacity: 0
  }
};

errorSchema = {
  name: {
    required: true
  },
  capacity: {
    required: true,
    digitOnly: true
  },
  //products: {
  //  required: true
  //}
};

const recipeSchema = function() {
  return {
    id: null,
    name: '',
    products: []
  }
};

const userSchema = function () {
  return {
    id: null,
    name: '',
    password: '',
    email: '',
    phone: '',
    rating: 0,
    playerType: ''
  }
};

export {
  productSchema,
  recipeSchema,
  errorSchema,
  userSchema
}