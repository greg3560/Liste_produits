import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import ProductCard from "./ProductCard";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
    root   : {
    },
    spinner: {
        left    : theme.components.spinner.left,
        position: theme.components.spinner.position
    }
});

class ProductList extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={10}
                className={ classes.root }
            >
                { this.props.products.length > 0 && this.props.products.map((product, index) => {
                    return (
                        <Grid key={index} item xs={11} sm={6} md={6} lg={4}>
                            <ProductCard
                                product={ product }
                            />
                        </Grid>
                    );
                })}
                { this.props.products.length === 0 &&
                <CircularProgress className={ classes.spinner } color="secondary"/> }
            </Grid>
        );
    }
}

export default withStyles(styles)(ProductList);