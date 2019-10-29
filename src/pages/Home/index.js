import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { CostomCard } from '../../components/';
import { addProductAction } from '../../store/ShopCarState'
import { showMessage ,closeMessage} from '../../store/MessageState'
import Snackbar from '@material-ui/core/Snackbar';
import CustomizedSnackbars from '../../components/CustomizedSnackbars'

// 商品页面
const styles =(theme)=> ({
    root: {
      marginTop:100,
      width:"90vw",
      display: "flex",
      flexWrap:"wrap",
      justifyContent: "flex-start",
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
        const { classes, addProductAction, showMessage, closeMessage} = this.props;
        const productList = this.props.mapStateToProps;
        const msg = this.props.msg;
        return (
            <Fragment>
                <Container maxWidth="false" className={classes.root} >
                        {
                            productList.map((product)=>{
                            return (<CostomCard 
                                        className = {classes.card}        
                                        product = {product} 
                                        key={product.id} 
                                        handleAdd = {addProductAction}
                                        handleCloseMsg={closeMessage}
                                        hendleOpenMsg={showMessage}
                                        msgOpen={msg.msgOpen}
                                        />)
                        })
                        }
                </Container>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={msg.msgOpen}
                    autoHideDuration={3000}
                    onClose={closeMessage}
                    >
                    <CustomizedSnackbars
                        onClose={closeMessage}
                        variant="success"
                        message={`${msg.productName} x ${msg.selectNum} 已放入购物车`}
                    />
                </Snackbar>
            </Fragment>
        )
    }
}


export default connect(
    (store)=>{
        // console.log(store)
        return {
            mapStateToProps: store.products.productList,
            msg: store.Message
        }
    },
    {
        addProductAction,
        showMessage,
        closeMessage

    }
  )(withStyles(styles)(Home))