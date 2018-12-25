import React, { Component } from 'react';


// I think it would make sense to get data from local storage here
// Then, i would need to run a loop in the render/return for amount of portfolios

class PortfolioContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newStock: "",
            stockAmount: 0
        };
    }

    updateInput(key, value) {
        // update react state
        this.setState({ [key]: value });
    }

    // A wrapper function for some extra features to run in the onclick when adding stocks to a portfolio
    addStockOnClick() {
        this.props.addStock(this.props.idval, this.state.newStock, parseInt(this.state.stockAmount, 10));
        this.updateInput("newStock", "");
        this.updateInput("stockAmount", 0);
    }


    render() {
        return (
            <div className="portfolioContainer" key={this.props.idval}>

                <span style={{marginRight: "5%"}}>{JSON.parse(this.props.content).name}</span>
                <button style={{marginRight: "5%"}}>Show in €</button>
                <button style={{marginRight: "5%"}}>Show in $</button>
                {JSON.parse(this.props.content).stocks.length}/50 Stocks

                <div className="closeButton" onClick={() => this.props.deleteItem(this.props.idval)}>
                    X
                </div>

                <div className="portfolioTable">
                    <div className="tableRow" style={{backgroundColor: "#eee"}}>
                        <div className="tableNameCol">Name</div>
                        <div className="tableAmountCol">Amount</div>
                    </div>

                    {JSON.parse(this.props.content).stocks.map(item => {
                        return (


                            <div className="tableRow" key={item.id}>
                                <div className="tableNameCol">{item.name}</div>
                                <div className="tableAmountCol">
                                    {item.amount}
                                    <button style={{float: "right"}} onClick={() => this.props.deleteStock(this.props.idval, item.id)}>
                                        Remove
                                    </button>
                                </div>


                            </div>
                        );
                    })}
                </div>

                <div className="portfolioTotal">
                    Total value of {JSON.parse(this.props.content).name}: ----
                </div>

                <div style={{display: "flex", flexWrap: "wrap", justifyContent: "flex-start", margin: "10px"}}>
                    <input
                        type="text"
                        style={{marginRight: "10px"}}
                        placeholder="Stock symbol"
                        value={this.state.newStock}
                        onChange={e => this.updateInput("newStock", e.target.value)}
                    />
                    <input
                        type="number"
                        style={{marginRight: "10px"}}
                        placeholder="Stock amount"
                        value={this.state.stockAmount}
                        onChange={e => this.updateInput("stockAmount", e.target.value)}
                        min="1"
                        step="1"
                    />
                    <button
                        onClick={() => this.addStockOnClick()}
                        disabled={(!this.state.newStock.length || this.state.stockAmount < 1 || JSON.parse(this.props.content).stocks.length > 49)}
                    >
                        &#43; Add
                    </button>
                </div>

            </div>
        );
    }
}

export default PortfolioContainer;