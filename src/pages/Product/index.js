import React, { Component } from 'react'

export default class Product extends Component {
    render() {
        console.log(this.props);
        return (
            <div style={{height:"10000px",paddingTop:'60px'}}>
                product
            </div>
        )
    }
}
