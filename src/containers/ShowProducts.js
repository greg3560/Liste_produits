/*
the mission of this container is
to update the interface with the call for actions
 */

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ProductActions from '../actions/RequestAPIAction';
import ProductList from '../components/ProductList';
import CategoryProductList from '../components/CategoryProductList';
import TemporaryDrawer from '../components/TemporaryDrawer';
import ProductCardLarge from '../components/ProductCardLarge';

// apply the action to the UI

const mapStateToProps = (state) => {
    return {
        data: state.api.data,
        products: state.api.products
    }
};

// link component with actions and dispatch
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(ProductActions, dispatch),
});
/*
    connection to the redux store.
    update UI with dispatch action
 */

export default {
    ShowProducts: connect(mapStateToProps, mapDispatchToProps)(ProductList),
    ShowProduct: connect(mapStateToProps, mapDispatchToProps)(ProductCardLarge),
    ShowCategory: connect(mapStateToProps, mapDispatchToProps)(CategoryProductList),
    TemporaryDrawer: connect(mapStateToProps, mapDispatchToProps)(TemporaryDrawer),
}