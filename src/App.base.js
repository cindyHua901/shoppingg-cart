import React from 'react';
import {Layout, Header} from './components'
import {Home, Product, ShopCar, Categroy} from './pages'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// 常用的router组件 
import {BrowserRouter as Router ,Route, NavLink as Link,Redirect, Switch} from 'react-router-dom'
// NavLink 与Link的区别就是 NavLink有activeClassName的样式 
import themes, { overrides } from './themes';
const theme = createMuiTheme({...themes.default, ...overrides});
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
          {/* Link里可以放 object */}
        <Link to="/home" activeClassName="current">首页</Link>
          {/* 这样会传递location给组件 */}
        <Link to={{
          pathname:'/product',
          search:'?sort=id',
          hash:"#the-hash",
          state:{userName: 'hua'}
          }}>产品</Link>
          <Link to="/shopCar">购物车</Link>
        {/* 直接跳转到某个页面 使用redirect组件 但是可能会出现问题 -->跳转到其他页面 再刷新的时候就会回到当前的page*/}
        <Switch>
          {/* exact绝对匹配 */}
          <Redirect to="/home" from="/" exact/>  
          <Route  component={Home} path = '/home'/>
          <Route  render={(routerProps)=>{
            return <Product {...routerProps}/>
          }} 
          path = '/products' exact/>  {/* exact 必须是路径全部匹配才会break  两个组件的route的path有包含关系的时候就需要在短的path 上使用exact */}
          <Route 
            component={Categroy}
            path='/products/:cateId'/>
          {/* <Route  component={Product} path= '/product'/> */}
          <Route  component={ShopCar} path='/shopCar'/>
          {/* 不能同时用render和componet  render 在需要验证的时候可以使用render components的优先级要高于render */}
          {/* from / to / path 都是局部匹配 比如/home /home1 会先匹配到 /home */}
          <Route 
          render={(routeProps)=>{return <Product {...routeProps}/>} }  path={'/products'}/>
          {/* switch组件只匹配 一个路由*/}
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
