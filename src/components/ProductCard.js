import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

const useStyles = makeStyles(theme => ({
    root      : {
        // marginBottom: '2rem'
    },
    card      : {
        maxWidth: 345
    },
    media     : {
        height        : 0,
        paddingTop    : "56.25%", // 16:9
        backgroundSize: "180px 170px"
    },
    expand    : {
        transform : "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: "rotate(180deg)"
    },
    avatar    : {
        backgroundColor: red[500]
    }
}));

function ProductCard(props) {
    const { product } = props;
    const [expanded, setExpanded] = React.useState(false);
    const classes = useStyles();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={ classes.root }>
            <Card className={ classes.card }>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={ classes.avatar }>
                            { product.title.substr(0, 1) }
                        </Avatar>
                    }
                    title={ product.title }
                    subheader={ product.category }
                />
                <CardMedia
                    className={ classes.media }
                    image={ product.image }
                    title={ product.title }
                />
                <CardContent>
                    <Link to={ "/product/" + product.id } className={ classes.linkText }><ListItemText
                        primary={ "Fiche détaillée" }/></Link>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        className={ clsx(classes.expand, {
                            [classes.expandOpen]: expanded
                        }) }
                        onClick={ handleExpandClick }
                        aria-expanded={ expanded }
                        aria-label="show more"
                    >
                        <ExpandMoreIcon/>
                    </IconButton>
                </CardActions>
                <Collapse in={ expanded } timeout="auto" unmountOnExit>
                    <CardContent>
                        { product.description }
                    </CardContent>
                    <CardContent>
                        { product.price + "Euros" }
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired
};

export default ProductCard;
