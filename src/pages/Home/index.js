import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { CostomCard } from '../../components/';
import {reducerProductStore} from '../../store/ProductsState'
import { addProductAction } from '../../store/ShopCarState'
import mock from './mock.js'
import ShopCar from '../ShopCar';

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
    render() {
        console.log(this.props)
        const { classes, addProductAction} = this.props;
        // const {productList} = this.state
        const productList = this.props.mapStateToProps;
        const shopCar = this.props.ShopCar;
        console.log(shopCar);
        return (
            <Fragment>
                <Container maxWidth="lg" className={classes.root} >
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
//先定义 mapStateToProps 这个函数来指定如何把当前 Redux store state 映射到展示组件的 props 中
const mapStateToProps = store =>{
    return {
        productList:store.products.productList
    }
}
// mapDispatchToProps() 方法接收 dispatch() 方法并返回期望注入到展示组件的 props 中的回调方法。
const mapDispatchToProps = { reducerProductStore };

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )
export default connect(
    (store)=>{
        console.log(store)
        return {
            mapStateToProps: store.products.productList,
            ShopCar:store.shopCar
        }
    },
    {
        reducerProductStore,
        addProductAction
    }
  )(withStyles(styles)(Home))