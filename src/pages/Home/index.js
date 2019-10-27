import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { CostomCard } from '../../components/';
import mock from './mock.js'

const styles =(theme)=> ({
    root: {
      marginTop:100,
      display: "flex",
      flexWrap:"wrap",
      width:"90vw",
      border:"1px solid green",
      justifyContent: "center",
      alignContent:"flex-start"
    },
    card:{
        margin:20,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
});

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            productList:mock.productList
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Container maxWidth="lg" className={classes.root} >
                        {
                            this.state.productList.map((product)=>{
                            return (<CostomCard 
                                        product = {product} 
                                        key={product.id} 
                                        />)
                        })
                        }
                </Container>
            </Fragment>
        )
    }
}
export default withStyles(styles)(Home);