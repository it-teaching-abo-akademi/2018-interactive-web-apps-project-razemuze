import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import SimpleStorage from "react-simple-storage";
import PortfolioContainer from "./components/PortfolioContainer";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newItem: "",
            list: [],
            count: 0,
        };
    }


    updateInput(key, value) {
        // update react state
        this.setState({ [key]: value });
    }


    // This adds a portfolio
    addItem() {
        let myObj = {};
        myObj["name"] = this.state.newItem.slice();
        myObj["stocks"] = [];

        // create a new item with unique id
        const newItem = {
            id: 1 + Math.random(),
            value: JSON.stringify(myObj)
        };

        // copy current list of items
        const list = [...this.state.list];

        // add the new item to the list
        list.push(newItem);

        let tmpCount = this.state.count + 1;

        // update state with new list, reset the new item input
        this.setState({
            list,
            newItem: "",
            count: tmpCount
        });
    }

    // This deletes a portfolio
    deleteItem(id) {
        // copy current list of items
        const list = [...this.state.list];
        // filter out the item being deleted
        const updatedList = list.filter(item => item.id !== id);
        let tmpCount = this.state.count - 1;
        this.setState({ list: updatedList, count: tmpCount });
    }

    // This adds stocks to a specific portfolio
    addStock(id, name, amount) {
        let listCopy = this.state.list.slice();
        for (let i=0; i<listCopy.length; i++) {
            if (id === listCopy[i].id) {
                // Found portfolio

                // Get old data
                let content = JSON.parse(listCopy[i].value);

                // add new data
                content.stocks.push({id: 1 + Math.random(), "name": name, "amount": amount});
                listCopy[i].value = JSON.stringify(content);
                this.setState({list: listCopy});

                break;
            }
        }
    }

    // This removes a specific stock from a specific portfolio
    deleteStock(portfolioId, stockId) {
        let listCopy = this.state.list.slice();
        for (let i=0; i<listCopy.length; i++) {
            if (portfolioId === listCopy[i].id) {
                // Found portfolio
                let content = JSON.parse(listCopy[i].value);

                let stocks = content.stocks;

                console.log(stocks);
                console.log(typeof(stocks));

                let tmpIndex = -1;

                content.stocks.map((item, index) => {
                    if (item.id === stockId) {
                        console.log(index);
                        tmpIndex = index;
                    }
                })

                content.stocks.splice(tmpIndex, 1);
                //listCopy[i].value = content;

                //let updatedList = content.filter(item => item.id !== stockId);

                listCopy[i].value = JSON.stringify(content);
                this.setState({list: listCopy});

                break;
            }
        }
    }

    render() {
        //localStorage.clear();  // Can be uncommented in order to clear all stored data, useful for testing.
        return (
            <div className="App">

                <SimpleStorage parent={this} />

                <header className="App-header">
                    <input
                        type="text"
                        placeholder="Portfolio name"
                        value={this.state.newItem}
                        onChange={e => this.updateInput("newItem", e.target.value)}
                    />
                    <button
                        onClick={() => this.addItem()}
                        disabled={(!this.state.newItem.length || this.state.count > 9)}
                    >
                        Create portfolio
                    </button>
                    <br/>
                    {this.state.count} / 10 Portfolios Created
                </header>
                <div className="portfolioArea">

                        {this.state.list.map(item => {
                            return (
                                <PortfolioContainer state={this.state} setState={p=>{this.setState(p)}} idval={item.id}
                                                    content={item.value} deleteItem={this.deleteItem}
                                                    addStock={this.addStock} deleteStock={this.deleteStock}/>

                                /*
                                <li key={item.id}>
                                    {JSON.parse(item.value).name}
                                    <button onClick={() => this.deleteItem(item.id)}>
                                        Remove
                                    </button>
                                </li>*/
                            );
                        })}

                </div>
            </div>
        );
    }
}

export default App;


/*import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PortfolioContainer from './components/PortfolioContainer.js';
import AddPortfolioModal from './components/AddPortfolioModal.js';


class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <AddPortfolioModal/>
                </header>
                <PortfolioContainer/>
            </div>
        );
    }
}

export default App;
*/