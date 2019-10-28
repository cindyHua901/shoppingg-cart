import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { CostomCard } from '../../components/';
import {reducerProductStore} from '../../store/ProductsState'
import { addProductAction } from '../../store/ShopCarState'

const styles =(theme)=> ({
    root: {
      marginTop:100,
      display: "flex",
      flexWrap:"wrap",
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
    render() {
        const { classes, addProductAction} = this.props;
        const productList = this.props.mapStateToProps;
        return (
            <Fragment>
                <Container maxWidth="false" className={classes.root} >
                        {
                            productList.map((product)=>{
                            return (<CostomCard 
                                        product = {product} 
                                        key={product.id} 
                                        handleAdd = {addProductAction}
                                        />)
                        })
                        }
                </Container>
            </Fragment>
        )
    }
}


export default connect(
    (store)=>{
        console.log(store)
        return {
            mapStateToProps: store.products.productList,
        }
    },
    {
        reducerProductStore,
        addProductAction
    }
  )(withStyles(styles)(Home))