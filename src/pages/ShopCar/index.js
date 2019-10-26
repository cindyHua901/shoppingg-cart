import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { NavBar } from '../../components'
import { CartList } from '..';

const styles = (theme)=>({
    shopCarContainer:{
        marginTop:100,
        border:"1px solid green"
    },
    listRoot:{
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    }
})
class ShopCar extends Component {
    constructor(){
        super();
        this.state = {
            shopCart:{
                details:[
                    {
                    product:{
                        id:1,					//商品id
                        productName:'玫瑰',    //商品名
                        unitPrice:99, 
                        stock: 10,             	//库存
                        imgUrl:'url',         //图片资源
                        description:'ssssssssss'
                    },
                    selectNum: 2,
                    singleTotal: 198,
                    isChecked: true,    //是否添加到购物车
                },{
                    product:{
                        id:2,					//商品id
                        productName:'洋桔梗',    //商品名
                        unitPrice:66, 
                        stock: 10,             	//库存
                        imgUrl:'url',         //图片资源
                        description:'ssssssssss'
                    },
                    selectNum: 3,
                    singleTotal: 66,
                    isChecked: false,    //是否添加到购物车
                    },{
                        product:{
                            id:3,					//商品id
                            productName:'洋桔梗',    //商品名
                            unitPrice:66, 
                            stock: 10,             	//库存
                            imgUrl:'url',         //图片资源
                            description:'ssssssssss'
                        },
                        selectNum: 8,
                        singleTotal: 66,
                        isChecked: true,    //是否添加到购物车
                    },{
                        product:{
                            id:4,					//商品id
                            productName:'肉肉',    //商品名
                            unitPrice:2, 
                            stock: 10,             	//库存
                            imgUrl:'url',         //图片资源
                            description:'ssssssssss'
                        },
                        selectNum: 1,
                        singleTotal: 66,
                        isChecked: false,    //是否添加到购物车
                    },{
                        product:{
                            id:5,					//商品id
                            productName:'迎春',    //商品名
                            unitPrice:3, 
                            stock: 6,             	//库存
                            imgUrl:'url',         //图片资源
                            description:'ssssssssss'
                        },
                        selectNum: 1,
                        singleTotal: 66,
                        isChecked: true,    //是否添加到购物车
                    }
                ],
                isAllChecked:false,
                totalPrice: 333,       //遍历购物车被选中的产品 reduce singleTotal 计算总和
            }
        }
    }

    handleSelectAll = (isAllChecked) =>{
        const shopCart = this.state.shopCart;
        this.setState({...shopCart.details,isAllChecked:!isAllChecked});     //全选 按钮
        console.log("selectAll",this.state.shopCart)
    }
    handleToggle = (productId) =>{
        const shopCart = this.state.shopCart.details.map((detail) =>{
            if(detail.product.productId === productId){
                detail.isChecked = !detail.isChecked ;
            }
            return  detail;
        });
        this.setState({
            ...this.state,shopCart
        })
    }
    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                shopCar
                {/* 想要具有路由属性 使用withRouter */}
                <NavBar />
                <CssBaseline />
                <Container maxWidth="lg" className={classes.shopCarContainer}>
                    <CartList shopCartList={this.state.shopCart}  SelectAll={this.handleSelectAll} handleToggle={this.handleToggle}/>
                </Container>
            </Fragment>
        )
    }
}

export default withStyles(styles)(ShopCar)