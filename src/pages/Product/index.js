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
import { genderateOrders } from '../../store/OrderFormState'


import Paper from '@material-ui/core/Paper';

const styles =(theme)=> ({
    container: {
        marginTop:100,
        width:"50vw",
      },
    root: {
        width: '100%',
        overflowX: 'auto',
      },
      table: {
        minWidth: 650,
      },
      title:{
          fontSize:"30px",
          textAlign:"center"
      }
});
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  

 class OrderForm extends Component {
    render() {
        console.log("props in orderForm",this.props);
        const {classes} = this.props;
        const {details, totalPrice} = this.props.mapStateToProps;
        const rows = [
            createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
            createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
            createData('Eclair', 262, 16.0, 24, 6.0),
            createData('Cupcake', 305, 3.7, 67, 4.3),
            createData('Gingerbread', 356, 16.0, 49, 3.9)];
        console.log(this.props);
        return (
                <Fragment>
                    <Container maxWidth="lg" className={classes.container} >
                        <Paper className={classes.root}>
                             <Typography className={classes.title} color="inherit" variant="subtitle1">
                                 订单
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
                                {details.map(detail => {
                                    const product = detail.product;
                                    return (
                                        <TableRow key={product.id}>
                                            <TableCell component="th" scope="row">
                                                {product.productName}
                                            </TableCell>
                                            <TableCell align="right">{product.unitPrice}</TableCell>
                                            <TableCell align="right">{detail.selectNum}</TableCell>
                                            <TableCell align="right">{detail.singleTotal}</TableCell>
                                        </TableRow>
                                )})}
                                </TableBody>
                                <TableFooter>
                                <TableRow key={"order-footer"}>
                                    <TableCell component="th" scope="row" variant="footer" colSpan="3">
                                        {`总计：${ totalPrice }`} 
                                    </TableCell>
                                    <TableCell align="right" variant="footer">
                                        <Button>提交订单</Button>
                                    </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </Paper>
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
        genderateOrders
    }
  )(withStyles(styles)(OrderForm))
