import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ShowProducts from "./containers/ShowProducts";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ProductsActions from "./actions/RequestAPIAction";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
    root: {
        margin: "0px"
    },
    nav : {
        height         : "100px",
        backgroundColor: "red",
        marginBottom   : "2rem"
    }
};

class App extends Component {

    constructor(props) {
        super(props);
        this.props.productsActions.fetchProducts("fetchAll");
    }

    handleChangeCategory = (e, match) => {
        this.props.productsActions.fetchProducts("fetchCategory", match);
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={ classes.root }>
                <nav className={ classes.nav }>
                    { this.props.products.length > 0 && (
                        <ShowProducts.TemporaryDrawer changeCategory={ this.handleChangeCategory }/>) }
                    { this.props.products.length === 0 && <CircularProgress color="secondary"/> }

                </nav>
                <Grid
                    container
                    direction="row"
                    justify={ "center" }
                    className={ classes.root }
                >
                    <Grid item xs={11} lg={ 10 }>
                        <div>
                            {/* A <Switch> looks through its children <Route>s and
                             renders the first one that matches the current URL. */ }
                            <Switch>
                                <Route path={ "/products" }>
                                    <div>
                                        <ShowProducts.ShowProducts/>
                                    </div>
                                </Route>
                                <Route
                                    path={ "/category/:category" }
                                    children={ ({ match }) => (
                                        <div>
                                            <ShowProducts.ShowCategory match={ match }/>
                                        </div>
                                    ) }
                                />

                                <Route
                                    path={ "/product/:id" }
                                    children={ ({ match }) => (
                                        <div>
                                            <ShowProducts.ShowProduct
                                                match={ match }/>
                                        </div>
                                    ) }
                                />
                                <Route path={ "/" }>
                                    <div>
                                        <Typography variant="h2" component="h2" align={ "center" }>
                                            Liste de produits
                                        </Typography>
                                    </div>
                                </Route>
                            </Switch>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        products: state.api.products
    });
};

const mapDispatchToProps = (dispatch) => ({
    productsActions: bindActionCreators(ProductsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));