import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CostomInput from '../../components/CostomInput'



class DetailItem extends Component {

  onChange= e => {
    this.props.handleChecked(this.props.detail.product.id);
  }

  handleSelectNum = (selectNum) => {
    this.props.sumSinglePrice(this.props.detail.product.id,selectNum)
  }
  handledelete = () =>{
    this.props.deleteProduct(this.props.detail.product.id);
  }
  render() {
    const {detail} = this.props;
    const {product, selectNum, isChecked, singleTotal} = detail;
    const labelId = `checkbox-list-label-${product}`;
    return (  
              <ListItem dense button>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    tabIndex={-1}
                    checked={isChecked}
                    onChange={this.onChange} 
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
                  <IconButton  
                    aria-label="comments"
                    onClick={this.handledelete}>
                    <DeleteForeverIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
        
  }
  
}

export default DetailItem