import React from 'react';
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
  card: {
    width: 170,
    height:260,
    margin:20,
    padding:"10px 30px"
  },
  title: {
    fontSize: 14,
    lineHeight:"25px",
    textAlign:"center"
  },
  pos: {
    marginBottom: 12,
  },
  media:{
    height: 130,
    width: 120,
    outline:"#999 solid 3px"
  },
  textField:{
    margin: 0,
    padding: 0,
    width:60,
    fontSize:'5px'
  },
  muicardaction: {
    height:50
  }
});

export default function CostomCard(props) {
  const classes = useStyles();
  const product = props.product;
  const [state, setState] = React.useState({
      selectNum: 1
  });
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };
  const handleSelectNum = (selectNum) =>{
      setState({...state,selectNum});
      console.log("selectNum",selectNum)
  }
  const handleAddToCart = () =>{
      props.handleAdd(product,state.selectNum);
      alert(`${product.productName} x ${state.selectNum} 已放入购物车`)
  }
  return (
    // card raised="true"可以用在hover上 选择当前的卡片的时候
    <Card className={classes.card} >
      <CardContent>
        <CardMedia
            className={classes.media}
            image={product.imgUrl}
            title={product.productName}
          />
        <Typography className={classes.title} textAlign="center" color="textSecondary">
         { product.productName }
        </Typography>
        <Typography className={classes.title} textAlign="center" color="textSecondary">
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
  );
}