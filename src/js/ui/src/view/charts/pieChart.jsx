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
        if(this.props.balances.length === 0){
            return {};
        }

        const addresses = Object.keys(this.props.balances)
        const balances = addresses.map(address => this.props.balances[address])
        const colors = addresses.map(() => '#' + (Math.random() * 0xFFFFFF << 0).toString(16))

        const finalData = {
            labels: addresses,
            datasets: [{
                data: balances,
                backgroundColor: colors
            }]
        };
        return finalData
    }

    render() {
        const options = {
            legend: {
                display: true,
                labels: {
                    fontColor: '#fff'
                }
            }
        }

        if (this.prepareData() === undefined) {
            return ''
        }
        return <Doughnut data={this.prepareData()} options={options} />
    }
}
