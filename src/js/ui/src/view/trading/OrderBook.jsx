import React, { Component } from 'react'
import {OrderBook} from 'react-trading-ui'
import { connect } from 'react-redux'
// const OrderBook = require('react-trading-ui/lib/OrderBook')

// const MyApp = ({ book, trades }) => (
//     <div className='my-app'>
//         <OrderBook asks={[1, 2,3,4]} bids={[1, 2,3,4]} />
//     </div>
// )

class MyThing extends Component {
    render() {
        console.log(OrderBook)
        return (
            <div className='my-app'>
                 {/* <OrderBook asks={[]} bids={[]} /> */}123
            </div>
        )
    }
}

export default MyThing

// export default connect(
//     state => ({
//         book: state.book,
//         trades: state.trades
//     })
// )(MyApp)