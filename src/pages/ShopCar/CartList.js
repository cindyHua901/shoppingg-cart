import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
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
import CostomInput from '../../components/CostomInput'

    const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    });

class CheckboxList extends Component {

  handleSelectAll = (event) =>{
    console.log(event.target.checked)
        // props.SelectAll(e.currentTarget.value);
  }
   handleSelectNum = (selectNum) =>{
    // setState({...state,selectNum});
    console.log("selectNum",selectNum)
}
    handleToggle= (event)=> {
        console.log(event.target)
        // console.log(event.target.checked);
        // event.target.value = !event.target.checked;
        // this.props.handleToggle();
    }
 
  render() {
    const {details, totalPrice, isAllChecked} = this.props.shopCartList;
    const classes = this.props.classes;
    return (
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
                    onChange={this.handleSelectAll}
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
          {details.map((detail, index) => {
            const product = detail.product;
            const labelId = `checkbox-list-label-${product.id}`;
            const isChecked = detail.isChecked;
            const selectNum = detail.selectNum;
            const singleTotal = detail.singleTotal;
            return (
              <ListItem key={product.id} id={`product${product.id}`} role={undefined} dense button>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={isChecked}
                    tabIndex={-1}
                    onClick={this.handleToggle}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={product.productName} />
                <ListItemText id={labelId} primary={`￥ ${product.unitPrice}`} />
                <ListItemText id={labelId} 
                    primary={ 
                    <CostomInput 
                        stock={product.stock} 
                        selectNum={selectNum} 
                        handleSelectNum={this.handleSelectNum}
                    />} />
                <ListItemText id={labelId} primary={`￥ ${singleTotal}`} />
                
                <ListItemSecondaryAction>
                  <IconButton  aria-label="comments">
                    <DeleteForeverIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
          <ListItem>
            <ListItemText id={"total"} primary={`总计：${totalPrice}`} />
                <ListItemSecondaryAction>
                  <Button edge="end" aria-label="comments">
                    <ListItemText id="subOrderForm" primary="提交订单" />
                  </Button>
                </ListItemSecondaryAction>
          </ListItem>
        </List>
      );
  }
  
}

export default withStyles(styles)(CheckboxList)