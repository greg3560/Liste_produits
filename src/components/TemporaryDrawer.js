import React  from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";

const useStyles = makeStyles({
                                  list: {
                                      width: 250,
                                  },
                                  fullList: {
                                      width: 'auto',
                                  },
                                 burgerMenu: {
                                     zIndex: 1000,
                                     cursor: 'pointer',
                                     color: '#fff',
                                     fontSize: '3rem',
                                     margin: '10px'
                                 },
                                 spinner: {
                                     left: '50%',
                                     position: 'absolute'
                                 },
                                 linkText: {
                                     fontSize: '1rem',
                                     fontFamily: "Roboto, Helvetica, Arial",
                                     fontWeight: 400,
                                     lineHeight: 1.5,
                                     letterSpacing: '0.00938em'
                                 }
                              });
 const TemporaryDrawer = props => {
     let categories = [];
     let link = ['/', '/products'];

     for (let i = 0, c = props.products.length; i < c; i++) {
         if (categories.indexOf(props.products[i].category) === -1) {
             categories.push(props.products[i].category);
         }
     }

     const classes = useStyles();
     const [state, setState] = React.useState({
                                                  top: false,
                                                  left: false,
                                                  bottom: false,
                                                  right: false,
                                              });


     const toggleDrawer = (anchor, open) => (event) => {
         if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
             return;
         }

         setState({ ...state, [anchor]: open });
     };

     const list = (anchor) => (
         <div
             className={clsx(classes.list, {
                 [classes.fullList]: anchor === 'top' || anchor === 'bottom',
             })}
             role="presentation"
             onClick={toggleDrawer(anchor, false)}
             onKeyDown={toggleDrawer(anchor, false)}
         >
             <List>
                 {['Accueil', 'Produits'].map((text, index) => (
                     <ListItem button key={text}>
                         <ListItemIcon>{index % 2 === 0 ? <HomeIcon /> : <ShoppingBasketIcon />}</ListItemIcon>
                         <Link to={link[index]} className={classes.linkText}><ListItemText
                             primary={text}/></Link>
                     </ListItem>
                 ))}
             </List>
             <Divider />
             <List>
                 {categories.length > 0 && categories.map((text, index) => (
                     <ListItem button key={text}>
                         <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                         <Link to={'/category/' + text} className={classes.linkText}><ListItemText
                             primary={text} onClick={(e) => props.changeCategory(e, text)}/></Link>
                    </ListItem>
                 ))}
             </List>
         </div>
     );

     return (
        <React.Fragment>
            <MenuIcon onClick={ toggleDrawer("left", true) } className={ classes.burgerMenu }/>
            <Drawer open={ state.left } onClose={ toggleDrawer("left", false) }>
                { list("left") }
            </Drawer>
        </React.Fragment>
     );
 };

 export default TemporaryDrawer;