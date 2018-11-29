import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newItem: "",
      list: []
    }
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  updateInput(key, value) {
    // update react state
    this.setState({ [key]: value });
  }

  addItem() {
    // create a new item with unique id
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
    };

    // copy current list of items
    const list = [...this.state.list];

    // add the new item to the list
    list.push(newItem);

    // update state with new list, reset the new item input
    this.setState({
      list,
      newItem: ""
    });

  }

  deleteItem(id) {
    // copy current list of items
    const list = [...this.state.list];
    // filter out the item being deleted
    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="logo-set grid4">
            <div className="flex">
              <img src={logo} className="App-logo" alt="Star Books Logo" />
              <span>Star Books</span>
            </div>
          </div>
          <div className="nav-set grid8 column"><h2>Satellite Dashboard</h2></div>
        </header>
        <div className="App-IO">
          <div className="module input-set grid3">
            <h3>Satellite Data Import</h3>
            <p>
              Please enter Star Books satellite data in a our <strong><em>patented proprietary JSON format.</em></strong>
            </p>
            <textarea placeholder="Enter Satellite Data Here (JSON)" value={this.state.newItem} onChange={e => this.updateInput("newItem", e.target.value)}></textarea>
            <button onClick={() => this.addItem()} disabled={!this.state.newItem.length}>Update</button>
          </div>
          <div className="module output-set grid9">
            <h3>Satellite Data Log</h3>
            {this.state.list.map(item => {
              const json = item.value;
              const obj = JSON.parse(json);
              const timestamp = new Date(obj.timestamp).toDateString();
              console.log(timestamp);
              return (

                function tryParseJSON(obj) {
                  try {
                    var o = JSON.parse(obj);
  
                    // Handle non-exception-throwing cases:
                    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
                    // but... JSON.parse(null) returns null, and typeof null === "object", 
                    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
                    if (o && typeof o === "object") {
                      return o;
                      alert("Valid bro");
                    }
                  }
                  catch (e) { }
  
                  return false;
                },

                <div key={item.id} className="set flex">
                  <p><strong>Timestamp:</strong><br />{timestamp}</p>
                  <p><strong>Satellite ID:</strong><br />{obj.satellite_id}</p>
                  <p><strong>Set ID:</strong><br />{obj.collection[0].set_id}<br />{obj.collection[1].set_id}<br />{obj.collection[2].set_id}</p>
                  <p><strong>Condition:</strong><br />{obj.collection[0].condition}<br />{obj.collection[1].condition}<br />{obj.collection[2].condition}</p>
                  <p><strong>Status:</strong><br />{obj.collection[0].status}<br />{obj.collection[1].status}<br />{obj.collection[2].status}</p>
                  <p><strong>Errors:</strong><br />{obj.collection[0].errors}<br />{obj.collection[1].errors}<br />{obj.collection[2].errors}</p>
                  <button onClick={() => this.deleteItem(item.id)}>Remove</button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  }
}

export default App;