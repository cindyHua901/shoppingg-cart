import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TableFooter from '@material-ui/core/TableFooter';
import Typography from '@material-ui/core/Typography';


import Paper from '@material-ui/core/Paper';

const styles =(theme)=> ({
    container: {
        marginTop:100,
        width:"80vw",
      },
    root: {
        width: '100%',
        overflowX: 'auto',
      },
    table: {
        minWidth: 650,
      },
    title: {
          fontSize:"30px",
          textAlign:"center"
      },
    tableFooter: {
        fontSize: 30
    } 
});

  

 class OrderForm extends Component {
    sumTotalprice = (details) => {
        let totalPrice = 0;
        for(var i=0; i< details.length; i++){
            if(details[i].isChecked){
                totalPrice += details[i].selectNum * details[i].product.unitPrice;
            }
        }
        console.log(totalPrice)
        return totalPrice;
    }
    render() {
        console.log("props in orderForm",this.props);
        const {classes} = this.props;
        const {forms} = this.props.mapStateToProps;
        return (
                <Fragment>
                    <Container maxWidth="false" className={classes.container} >
                        { 
                            forms.length >0?
                                <Typography className={classes.title} color="inherit" variant="subtitle1">
                                订单
                                </Typography>
                                :
                                <Typography className={classes.title} color="inherit" variant="caption">
                                没有订单哟，请在购物车选择商品生成订单
                                </Typography>
                        }
                        
                           {
                               forms.map( form =>{
                                   return(
                                    <Paper className={classes.root}>
                                        <Typography  color="inherit" variant="subtitle1">
                                            {`订单编号：${form.formID}`}
                                        </Typography>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>商品名称</TableCell>
                                                    <TableCell align="right">单价</TableCell>
                                                    <TableCell align="right">数量</TableCell>
                                                    <TableCell align="right">小计</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {form.details.map(detail => {
                                                const product = detail.product;
                                                return (
                                                    <TableRow key={product.id}>
                                                        <TableCell component="th" scope="row">
                                                            {product.productName}
                                                        </TableCell>
                                                        <TableCell align="right">{product.unitPrice}</TableCell>
                                                        <TableCell align="right">{detail.selectNum}</TableCell>
                                                        <TableCell align="right">{detail.selectNum * detail.product.unitPrice}</TableCell>
                                                    </TableRow>
                                            )})}
                                            </TableBody>
                                            <TableFooter className={classes.tableFooter}>
                                                <TableRow key={"order-footer"} >
                                                    <TableCell component="th" scope="row" variant="footer" colSpan="3">
                                                        {`总计：${ this.sumTotalprice(form.details) }`} 
                                                    </TableCell>
                                                    <TableCell align="right" variant="footer">
                                                        <Button>提交订单</Button>
                                                    </TableCell>
                                                </TableRow>
                                            </TableFooter>
                                        </Table>
                                    </Paper>
                                   )
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
            mapStateToProps: store.orderForm
        }
    },
    {
        
    }
  )(withStyles(styles)(OrderForm))
