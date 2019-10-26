import React, { Component, Fragment} from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
    leftMenu: {
        flexGrow: 1,
        justifyContent:"flex-start"
    },
  });

class SideNav extends Component {
    constructor(){
        super();
    }
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
              <Toolbar>
                {
                    links.map((link, index) =>{
                            className = index === 0 ?classes.leftMenu :classes.rightMenu
                    return (
                        <Button color='inherit'
                            className = {className}
                            onClick={this.handleClick.bind(this,link.path)}
                            key={link.path}
                        >{link.title}</Button>
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
