import React, { Component } from "react";
import { Doughnut } from 'react-chartjs-2';

var data = {
    // labels: [
    //     'Red',
    //     'Green',
    //     'Yellow'
    // ],
    datasets: [{
        data: [300, 50, 100],
        // backgroundColor: [
        //     '#FF6384',
        //     '#36A2EB',
        //     '#FFCE56'
        // ],
        // hoverBackgroundColor: [
        //     '#FF6384',
        //     '#36A2EB',
        //     '#FFCE56'
        // ]
    }]
};

// this.props.balances.reduce(
//     acc, 
// )

// return data

export default class PieChartFinal extends Component {
    prepareData = () => {
        const addresses = Object.keys(this.props.balances)

        addresses.reduce((prev, next) => {
            return [
                ...prev,
                this.props.balances[next]
            ]
        }, [])

        // this.setState({
        //     data: 
        // })
    }

    render() {
        return <Doughnut data={data} />
    }
}