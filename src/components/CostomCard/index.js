import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CostomInput from '../CostomInput'
import IconButton from '@material-ui/core/IconButton';



const useStyles = makeStyles({
  cardConteiner: {
    flex: 1,
    flexBasis:170,
  },
  card: {
    width: 170,
    height:270,
    padding:"10px 30px",
    margin:20,
  },
  title: {
    paddingTop: 10
  },
  pos: {
    marginBottom: 12,
  },
  media:{
    height: 130,
    width: 140,
    outline:"#999 solid 3px"
  },
  textField:{
    margin: 0,
    padding: 0,
    width:60,
    fontSize:'5px'
  },
  muicardaction: {
    height:20
  }
});

export default function CostomCard(props) {
  const classes = useStyles();
  const product = props.product;
  const [state, setState] = React.useState({
      selectNum: 1
  });
  
  const handleSelectNum = (selectNum) =>{
      setState({...state,selectNum});
      // console.log("selectNum",selectNum)
  }
  const handleAddToCart = () =>{
      props.handleMsg(product.productName, state.selectNum);
      props.hendleOpenMsg();
      props.handleAdd(product,state.selectNum);
  }
  return (
    // card raised="true"可以用在hover上 选择当前的卡片的时候
    <div className={classes.cardConteiner}>
      <Card className={classes.card}>
        <CardContent>
          <CardMedia
              className={classes.media}
              image={product.imgUrl}
              title={product.productName}
            />
          <Typography variant="subtitle1" className={classes.title} color="textSecondary">
          { product.productName }
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
          { `库存: ${product.stock}         单价：${product.unitPrice}` }
          </Typography>
        </CardContent>
        <CardActions disableSpacing={false} className={classes.muicardaction}>
          <CostomInput  
            stock={product.stock} 
            selectNum={state.selectNum} 
            handleSelectNum={handleSelectNum}/>
          <IconButton 
          className={classes.iconButton} aria-label="add"
          onClick={handleAddToCart} 
          >
          <AddShoppingCartIcon  className={classes.icon }/>
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}