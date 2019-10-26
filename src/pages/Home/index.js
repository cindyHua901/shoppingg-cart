import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { CostomCard } from '../../components/'

const styles =(theme)=> ({
    root: {
      marginTop:100,
      display: "flex",
      flexWrap:"wrap",
      width:"90vw",
      border:"1px solid green",
      justifyContent: "center",
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
    constructor(props){
        super(props);
        this.state={
            productList:[{
                id:1,					//商品id
                productName:'name1',    //商品名
                unitPrice:66,
                stock: 10,             	//库存
                imgUrl:'http://game.gtimg.cn/images/yxzj/img201606/itemimg/1136.jpg',         //图片资源
                description:'ssssssssssssssssssss'
            },{
                id:2,					//商品id
                productName:'name2',    //商品名
                unitPrice:66,
                stock: 10,             	//库存
                imgUrl:'http://game.gtimg.cn/images/yxzj/img201606/itemimg/1136.jpg',         //图片资源
                description:'ssssssssssssssssssss'
            },
            {
                id:3,					//商品id
                productName:'name3',    //商品名
                unitPrice:66,
                stock: 10,             	//库存
                imgUrl:'http://game.gtimg.cn/images/yxzj/img201606/itemimg/1136.jpg',         //图片资源
                description:'ssssssssssssssssssss'
            },
            {
                id:4,					//商品id
                productName:'name4',    //商品名
                unitPrice:66,
                stock: 10,             	//库存
                imgUrl:'http://game.gtimg.cn/images/yxzj/img201606/itemimg/1136.jpg',         //图片资源
                description:'ssssssssssssssssssss'
            },{
                id:5,					//商品id
                productName:'name1',    //商品名
                unitPrice:66,
                stock: 10,             	//库存
                imgUrl:'http://game.gtimg.cn/images/yxzj/img201606/itemimg/1136.jpg',         //图片资源
                description:'ssssssssssssssssssss'
            },{
                id:6,					//商品id
                productName:'name2',    //商品名
                unitPrice:66,
                stock: 10,             	//库存
                imgUrl:'http://game.gtimg.cn/images/yxzj/img201606/itemimg/1136.jpg',         //图片资源
                description:'ssssssssssssssssssss'
            },
            {
                id:7,					//商品id
                productName:'name3',    //商品名
                unitPrice:66,
                stock: 10,             	//库存
                imgUrl:'http://game.gtimg.cn/images/yxzj/img201606/itemimg/1136.jpg',         //图片资源
                description:'ssssssssssssssssssss'
            },
            {
                id:8,					//商品id
                productName:'name4',    //商品名
                unitPrice:66,
                stock: 10,             	//库存
                imgUrl:'http://game.gtimg.cn/images/yxzj/img201606/itemimg/1136.jpg',         //图片资源
                description:'ssssssssssssssssssss'
            },
            {
                id:9,					//商品id
                productName:'name3',    //商品名
                unitPrice:66,
                stock: 10,             	//库存
                imgUrl:'http://game.gtimg.cn/images/yxzj/img201606/itemimg/1136.jpg',         //图片资源
                description:'ssssssssssssssssssss'
            },
            {
                id:10,					//商品id
                productName:'name4',    //商品名
                unitPrice:66,
                stock: 10,             	//库存
                imgUrl:'http://game.gtimg.cn/images/yxzj/img201606/itemimg/1136.jpg',         //图片资源
                description:'ssssssssssssssssssss'
            }
        ],
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Container maxWidth="lg" className={classes.root} >
                        {
                            this.state.productList.map((product)=>{
                            return (<CostomCard 
                                        product = {product} 
                                        key={product.id} 
                                        />)
                        })
                        }
                </Container>
            </Fragment>
        )
    }
}
export default withStyles(styles)(Home);