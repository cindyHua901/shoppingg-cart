import React, { Component, Fragment} from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';


const styles = theme =>({
    root: {
        flexGrow:1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    topBar:{
        width:"95vw"
    },
    rightLink: {
        flexGrow:0,
        flexBasis:100,
        width:200
    },
    leftLink: {
        flex:2,
        width:200,
        marginLeft:100
    }
    
  });

class SideNav extends Component {
    handleClick = (path)=>{
        console.log(this.props);
        this.props.history.push(path);
    }
    
    render() {
        const { classes,links } = this.props;
        let className ;
        return (
            <div className={classes.root}>
            <AppBar position="fixed" id="TopNav">
              <Toolbar className={classes.topBar}>
                {
                    links.map((link, index) =>{
                            className = index === 0 ?classes.leftLink :classes.rightLink
                    return (
                        <Link color='inherit'
                            className = {className}
                            onClick={this.handleClick.bind(this,link.path)}
                            key={link.path}
                        >{link.title}</Link>
                    )
                })
                }
              </Toolbar>
            </AppBar>
          </div>
        )
    }
}

export default withRouter(withStyles(styles)(SideNav));
