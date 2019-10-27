import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ListSubheader from '@material-ui/core/ListSubheader';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { NavBar } from '../../components'
import DetailItem from './DetailItem';
import {addProduct, addSelectNum,reduceSelectNum,deleteProduct,checkProduct} from '../../store/ShopCarState'

const styles = (theme)=>({
    shopCarContainer:{
        marginTop:100,
        border:"1px solid green"
    },
    listRoot:{
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
})
class ShopCar extends Component {
        // this.state = {
        //         details:[
        //             {
        //             product:{
        //                 id:1,					//商品id
        //                 productName:'玫瑰',    //商品名
        //                 unitPrice:99, 
        //                 stock: 10,             	//库存
        //                 imgUrl:'url',         //图片资源
        //                 description:'ssssssssss'
        //             },
        //             selectNum: 2,
        //             singleTotal: 198,
        //             isChecked: true,    //是否添加到购物车
        //         },{
        //             product:{
        //                 id:2,					//商品id
        //                 productName:'洋桔梗',    //商品名
        //                 unitPrice:66, 
        //                 stock: 10,             	//库存
        //                 imgUrl:'url',         //图片资源
        //                 description:'ssssssssss'
        //             },
        //             selectNum: 3,
        //             singleTotal: 198,
        //             isChecked: false,    //是否添加到购物车
        //             },{
        //                 product:{
        //                     id:3,					//商品id
        //                     productName:'洋桔梗',    //商品名
        //                     unitPrice:66, 
        //                     stock: 10,             	//库存
        //                     imgUrl:'url',         //图片资源
        //                     description:'ssssssssss'
        //                 },
        //                 selectNum: 8,
        //                 singleTotal: 528,
        //                 isChecked: true,    //是否添加到购物车
        //             },{
        //                 product:{
        //                     id:4,					//商品id
        //                     productName:'肉肉',    //商品名
        //                     unitPrice:2, 
        //                     stock: 10,             	//库存
        //                     imgUrl:'url',         //图片资源
        //                     description:'ssssssssss'
        //                 },
        //                 selectNum: 1,
        //                 singleTotal: 2,
        //                 isChecked: false,    //是否添加到购物车
        //             },{
        //                 product:{
        //                     id:5,					//商品id
        //                     productName:'迎春',    //商品名
        //                     unitPrice:3, 
        //                     stock: 6,             	//库存
        //                     imgUrl:'url',         //图片资源
        //                     description:'ssssssssss'
        //                 },
        //                 selectNum: 1,
        //                 singleTotal: 3,
        //                 isChecked: false,    //是否添加到购物车
        //             }
        //         ],
        //         isAllChecked: false,
        //         totalPrice: 333,       //遍历购物车被选中的产品 reduce singleTotal 计算总和
        // }

    handleSelectAll = () =>{
        // 判断是否所有的单品都勾选了
        const count = this.props.details.filter(detail =>{
                            return detail.isChecked
                        }).length;
        let isAllChecked = false;
        if(count === this.props.details.length){
            isAllChecked = true;
        }
        this.setState({
            ...this.state,
            isAllChecked,
            totalPrice: this.sumTotalPrice()
        });
        
    }

    //当detailde isChecked更改的时候就需要判断 是否更改 全选复选框的值
    toggleSelectAll = () =>{
        alert("isAllchecked"+ this.state.isAllChecked);
        const isAllChecked = !this.state.isAllChecked;
        alert(isAllChecked);
        let details ;
        if(isAllChecked){
            details = this.state.details.map(detail =>{
                detail.isChecked = true;
                return detail;
            })
        }else{
           details = this.state.details.map(detail =>{
                detail.isChecked = false;
                return detail;
            })
        }
        this.setState({
            details,
            isAllChecked,
            totalPrice: this.sumTotalPrice()
        });
    }

    //选中更改的时候 修改detail里的isChecked值
    handleToggle = (productId) =>{
        const details = this.state.details.map(detail => {
            if(productId === detail.product.id){
                detail.isChecked = !detail.isChecked ;
            }
            return detail;
        });
        this.setState({
            ...this.state,
            details,
            totalPrice:this.sumTotalPrice()
        })
        this.handleSelectAll();
    }

    //计算所有选中商品的价格
    sumTotalPrice = () =>{
        var totalPrice = 0
        const details = this.state.details;
        for(var i=0; i < details.length; i++){
            if(details[i].isChecked){
                totalPrice += details[i].singleTotal
            }
        }
        return totalPrice;
    }

    //计算单品的价格
    sumSinglePrice = (productID,selectNum) =>{
        const details = this.state.details.map((detail)=>{
            if(detail.product.id === productID){
                detail.selectNum = selectNum;
                detail.singleTotal = detail.selectNum * detail.product.unitPrice;
            }
        });
        this.setState({
            ...this.state, details,
            totalPrice: this.sumTotalPrice()
        })
        
    }

    // 删除商品
    deleteProduct = (productID)=>{
        let totalPrice = 0;
        const details = this.state.details.filter((detail) =>{
            return detail.product.id !== productID;
        })
        for(var i=0; i < details.length; i++){
            if(details[i].isChecked){
                totalPrice += details[i].singleTotal
            }
        }
        this.setState({
            ...this.state,
            details,
            totalPrice
        })
    }
    componentWillUpdate(){
        // this.sumTotalPrice();
    }

    componentWillMount() {
        this.setState({
            ...this.state, totalPrice:this.sumTotalPrice()
        })
    }

    render() {
        const {classes} = this.props;
        const {details, isAllChecked, totalPrice} = this.props.shopCart;
        const {
                addProduct,
                addSelectNum,
                reduceSelectNum,
                deleteProduct,
                checkProduct
            } = this.props
        return (
            <Fragment>
                shopCar
                {/* 想要具有路由属性 使用withRouter */}
                <NavBar />
                <CssBaseline />
                <Container maxWidth="lg" className={classes.shopCarContainer}>
                <List subheader={<ListSubheader>ShoppingCart</ListSubheader>} className={classes.root}>
                    <ListItem key="formHeader" role={undefined} dense button>
                        <ListItemIcon>
                        <Checkbox
                            edge="start"
                            id="selectAllProduct"
                            tabIndex={-1}
                            checked={isAllChecked}     
                            disableRipple
                            inputProps={{ 'aria-labelledby': "formHeader" }}
                            onChange={this.toggleSelectAll}
                        />
                        </ListItemIcon>
                        <ListItemText id="IDColumn" primary="商品名称" />
                        <ListItemText id="UnitPriceColumn" primary={`单价`} />
                        <ListItemText id="SelectNumColumn" primary={`数量`} />
                        <ListItemText id="SingleTitleColumn" primary={`小计`} />
                        <ListItemSecondaryAction>
                        <IconButton id="removeAllProduct" aria-label="removeAllProduct">
                            <DeleteForeverIcon />
                        </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                        {   
                            details.map(detail => {
                                return (<DetailItem 
                                            key = {detail.product.id} 
                                            detail = {detail} 
                                            changeCheckState = {this.handleToggle}
                                            sumSinglePrice = {this.sumSinglePrice}
                                            deleteProduct = {this.deleteProduct} />)
                            }
                        )
                        }
                    <ListItem>
                    <ListItemText id={"total"} primary={`总计：${totalPrice}`} />
                        <ListItemSecondaryAction>
                        <Button edge="end" aria-label="comments">
                            <ListItemText id="subOrderForm" primary="提交订单" />
                        </Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
                </Container>
            </Fragment>
        )
    }
}

//先定义 mapStateToProps 这个函数来指定如何把当前 Redux store state 映射到展示组件的 props 中
const mapStateToProps = state =>{
    return {
        shopCart:state.shopCart
    }
}
// mapDispatchToProps() 方法接收 dispatch() 方法并返回期望注入到展示组件的 props 中的回调方法。
const mapDispatchToProps = dispatch =>{
    return {
        addProduct,
        addSelectNum,
        reduceSelectNum,
        deleteProduct,
        checkProduct
    }
}
const ShopCartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(ShopCar)
export default withStyles(styles)(ShopCartContainer)