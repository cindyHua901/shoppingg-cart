import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { withStyles } from '@material-ui/core/styles';
import CostomInput from '../../components/CostomInput'


const styles = (theme)=>({
      text:{
        textAlign:'left'
      },
      media:{
        height:78,
        width: 78,
        outline:"#999 solid 3px"
      }
})

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
    const {detail,classes } = this.props;
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
                <ListItemText primary={
                    <CardMedia
                      className={classes.media}
                      image={product.imgUrl}
                      title={product.productName}
                    />}
                />
                <ListItemText id={labelId} primary={product.productName} className={classes.text}/>
                <ListItemText id={labelId} primary={`￥ ${product.unitPrice}`} className={classes.text} />
                <ListItemText id={labelId} className={classes.text}
                    primary={ 
                    <CostomInput 
                        stock={product.stock} 
                        selectNum={selectNum} 
                        handleSelectNum={this.handleSelectNum}
                    />} />
                <ListItemText id={labelId} primary={`￥ ${singleTotal}`} className={classes.text} />
                
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

export default withStyles(styles)(DetailItem)