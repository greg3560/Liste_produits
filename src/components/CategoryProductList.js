import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import ProductCard from "./ProductCard";
import { withStyles } from "@material-ui/core";

const styles = {
    root   : {
        marginBottom: "2rem"
    },
    spinner: {
        left    : "50%",
        position: "absolute"
    }
};

class CategoryProductList extends React.Component {
    constructor(props) {
        super(props);
        let category = this.props.match.params.category;
        this.props.actions.fetchProducts("fetchCategory", category);
    };

    render() {
        const { classes } = this.props;
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={ 5 }
                className={ classes.root }
            >
                { this.props.data.length > 0 && this.props.data.map((product, index) => {
                    return (
                        <Grid key={ index } item xs={11} sm={6} md={6} lg={4}>
                            <ProductCard
                                product={ product }
                            />
                        </Grid>
                    );
                }) }
                { this.props.data.length === 0 && <CircularProgress className={ classes.spinner } color="secondary"/> }
            </Grid>
        );
    }
}

export default withStyles(styles)(CategoryProductList);