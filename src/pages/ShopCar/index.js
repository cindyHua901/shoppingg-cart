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
import Button from '@material-ui/core/Button';
import ListSubheader from '@material-ui/core/ListSubheader';
import DetailItem from './DetailItem';
import {checkedAll, isChecked,changeNumberAction,deleteProductAction} from '../../store/ShopCarState'
import { genderateOrders } from '../../store/OrderFormState'

const styles = (theme)=>({
    shopCarContainer:{
        marginTop:100,
        width:"80vw"
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
    subTitle: {
        fontSize: 30,
        lineHight: 60,
        height:60
    }
})

class ShopCar extends Component { 
    handleGenerateOrder=()=>{
        // 生成订单 将勾选的detail放到订单 并从购物车中删除
        const detalis = this.props.mapStateToProps.details.filter(detail =>{
            if(detail.isChecked){
                this.props.deleteProductAction(detail.product.id);
            }
            return detail.isChecked
        })
        this.props.mapStateToProps.details.map( detail =>{
            return detail
        })
        const totalPrice = this.props.mapStateToProps.totalPrice;
        this.props.genderateOrders(detalis, totalPrice);
        this.props.history.push('/orderform');
    }
    render() {
        const {classes,changeNumberAction, isChecked,deleteProductAction,checkedAll} = this.props;
        const {details, isAllChecked, totalPrice,} = this.props.mapStateToProps;
        console.log(this.props);
        return (
            <Fragment>
                shopCar
                {/* 想要具有路由属性 使用withRouter */}
                
                <CssBaseline />
                <Container maxWidth="false" className={classes.shopCarContainer}>
                <List subheader={<ListSubheader color="primary" className={classes.subTitle}>ShoppingCart</ListSubheader>} className={classes.root}>
                    <ListItem key="formHeader" role={undefined} dense button>
                        <ListItemIcon>
                        <Checkbox
                            edge="start"
                            id="selectAllProduct"
                            tabIndex={-1}
                            checked={isAllChecked}     
                            disableRipple
                            inputProps={{ 'aria-labelledby': "formHeader" }}
                            onChange={()=>checkedAll()}
                        />
                        </ListItemIcon>
                        <ListItemText id="IDColumn" primary="图片" />
                        <ListItemText id="IDColumn" primary="商品名称" />
                        <ListItemText id="UnitPriceColumn" primary={`单价`} />
                        <ListItemText id="SelectNumColumn" primary={`数量`} />
                        <ListItemText id="SingleTitleColumn" primary={`小计`} />
                        <ListItemSecondaryAction>
                        {/* <IconButton id="removeAllProduct" aria-label="removeAllProduct">
                            <DeleteForeverIcon />
                        </IconButton> */}
                        </ListItemSecondaryAction>
                    </ListItem>
                        {   
                            details.map(detail => {
                                return (<DetailItem 
                                            key = {detail.product.id} 
                                            detail = {detail} 
                                            handleChecked={isChecked}
                                            sumSinglePrice = {changeNumberAction}
                                            deleteProduct = {deleteProductAction} 
                                            />)
                            }
                        )
                        }
                    <ListItem>
                    <ListItemText id={"total"} primary={`总计：${totalPrice}`} />
                        <ListItemSecondaryAction>
                        <Button edge="end" aria-label="comments" onClick={this.handleGenerateOrder}>
                            <ListItemText id="subOrderForm" primary="生成订单" />
                        </Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
                </Container>
            </Fragment>
        )
    }
}

  export default connect(
    (store)=>{
        console.log(store)
        return {
            mapStateToProps: store.shopCar
        }
    },
    {
        changeNumberAction,
        deleteProductAction,
        checkedAll,
        isChecked,
        genderateOrders
    }
  )(withStyles(styles)(ShopCar))