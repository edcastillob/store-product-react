import { 
  GET_ALL_PRODUCTS, GET_PRODUCT_DETAIL, POST_PRODUCT, 
  GET_ALL_STORES, GET_STORE_DETAIL, POST_STORE, USER_LOGIN,
  ASSOCIATE_PRODUCT_TO_STORE, ASSOCIATE_STORE_TO_PRODUCT,  UPDATE_PRODUCT_STORE_ASSOCIATION, DELETE_PRODUCT_STORE_ASSOCIATION, GET_STORES_ASSOCIATED_TO_PRODUCT, GET_PRODUCTS_ASSOCIATED_TO_STORE
} from "../actions/types";

const initialState = {
  products: [],
  productDetail:"",
  stores: [],
  storeDetail:"",
  productStoreAssociations: [],
  storesAssociated:[],
  productsAssociated:[],
  user: {
    accessToken: "", 
    userInfo: {}     
  }
};



function reducer(state = initialState, actions) {
  switch (actions.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: actions.payload.products,
      };
      case POST_PRODUCT:
        return {
          ...state,
          products: [...state.products, actions.payload.product],
        };
        case GET_PRODUCT_DETAIL:
          return {
            ...state,
            productDetail: actions.payload.productDetail,
          };
    case GET_ALL_STORES:
      return {
        ...state,
        stores: actions.payload.stores,
      };
      case POST_STORE:
        return {
          ...state,
          stores: [...state.stores, actions.payload.store],
        };
        case GET_STORE_DETAIL:
          return {
            ...state,
            storeDetail: actions.payload.storeDetail,
          };
          case ASSOCIATE_PRODUCT_TO_STORE:
      return {
        ...state,
        productStoreAssociations: [...state.productStoreAssociations, actions.payload],
      };
    case ASSOCIATE_STORE_TO_PRODUCT:
      return {
        ...state,
        productStoreAssociations: [...state.productStoreAssociations, actions.payload],
      };
    case UPDATE_PRODUCT_STORE_ASSOCIATION:
      return {
        ...state,
        productStoreAssociations: state.productStoreAssociations.map(assoc => {
          if (assoc.productId === actions.payload.productId) {
            return {
              ...assoc,
              storeId: actions.payload.storeId
            };
          } else {
            return assoc;
          }
        }),
      };
    case DELETE_PRODUCT_STORE_ASSOCIATION:
      return {
        ...state,
        productStoreAssociations: state.productStoreAssociations.filter(assoc => 
          !(assoc.productId === actions.payload.productId && assoc.storeId === actions.payload.storeId)
        ),
      };
      case GET_STORES_ASSOCIATED_TO_PRODUCT:
        return {
          ...state,
          storesAssociated: actions.payload.stores,
        };
      case GET_PRODUCTS_ASSOCIATED_TO_STORE:
        return {
          ...state,
          productsAssociated: actions.payload.products,
        };
      case USER_LOGIN:
        return{
          ...state, 
          user: actions.payload.user,
        }
    default:
      return state;
  }
}

export default reducer;
