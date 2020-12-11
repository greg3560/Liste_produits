import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core";
import ShowProducts from "../containers/ShowProducts";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";


const styles = theme => ({
    root: {
        padding: theme.spacing(10),
        marginBottom: theme.spacing(6),
        position: 'relative',
        width: '70%',
        margin: 'auto'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        backgroundSize: 'contain'
    },
    p: {
        marginBottom: '1rem'
    },
    price: {
        position: 'absolute',
        top: '13px',
        right: '20px'
    },
    headline: {
        margin: '20px 0',
        overflow: 'initial'
    },
    spinner: {
        left    : "50%",
        position: "absolute"
    }
});

class ProductCardLarge extends React.Component {
    constructor(props) {
        super(props);
        let id = this.props.match.params.id;
        this.props.actions.fetchProducts('fetchOne', id);
    };

    render() {
        const {classes} = this.props;
        const { title, price, image, description } = this.props.data;
        return (
            <div>
                { this.props.products.length > 0 && (
                    <Paper className={classes.root}>
                        <Grid container direction={'row'} justify={'center'}>
                            <Grid item xs={10}>
                                <Typography variant="h5" component="h3" className={classes.headline}>
                                    {title}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Typography variant="h5" component="h3" className={classes.headline} noWrap={true}>
                                    {price + ' €'}
                                </Typography>
                            </Grid>
                        </Grid>
                        <CardMedia
                            className={classes.media}
                            image={image}
                            title={title}
                        />
                        <Grid container direction={'row'} justify={'space-between'}>
                            <Grid item xs={12}>
                                <Typography variant="h5" component="h3" className={classes.headline}>
                                    Synopsis:
                                    {description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>) }
                { this.props.products.length === 0 && <CircularProgress className={classes.spinner} color="secondary"/> }
            </div>
        );
    }
}

export default withStyles(styles)(ProductCardLarge);