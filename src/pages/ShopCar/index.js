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
import DetailItem from './DetailItem';
import {checkedAll, isChecked,changeNumberAction,deleteProductAction} from '../../store/ShopCarState'
import { genderateOrders } from '../../store/OrderFormState'

const styles = (theme)=>({
    shopCarContainer:{
        marginTop:100,
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
    handleGenerateOrder=()=>{
        const detalis = this.props.mapStateToProps.details.filter(detail =>{
            return detail.isChecked
        })
        const totalPrice = this.props.mapStateToProps.totalPrice;
        console.log(genderateOrders);
        console.log(this.props);
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