import React, { Component } from 'react'
import {withRouter}from 'react-router-dom'
class NavBar extends Component {
    toHome= () =>{
        console.log(this.props);
        // 编程式路由跳转
        this.props.history.push('/home');
    }
    render() {
        console.log(this.props);
        return (
            <div>
                <button onClick={this.toHome}>回首页</button>
            </div>
        )
    }
}
//withRouter 高阶组件 可以让任何组件都注入router的一些 props
// 使用withRouter可以让组件具有router的一些props

//HOC 高阶组件 Higher Order Component
// 高阶组件 组件返回一个组件 在返回的组件里注入一些东西(props)
//可以劫持组件的渲染
        // const withRouter = (OldComponent) =>{
        //     return class newComponent extends React.Component{
        //         render(){
        //             return <OldComponent x={1} />
        //         }
        //     }
        // }
export default withRouter(NavBar);
