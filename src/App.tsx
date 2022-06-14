import React from "react";
import './App.css';
import "leaflet/dist/leaflet.css";
import Item from './components/Item/Item';
import { AppState } from './shared/types';
import MyMap from './components/MyMap/MyMap';


class App extends React.Component<any, AppState> {

  constructor(props: any) {
    super(props);

    this.state = {
      items: [],
      clients: [],
      dataIsLoaded: false,
    };
  }

  componentDidMount() {
    Promise.all([
      fetch("./assets/database/NeRelog_clients.json").then(res => res.json()),
      fetch("./assets/database/NeRelog_apps.json").then(res => res.json()),
    ])
      .then(([clients, items]) => {
        this.setState({
          items: items,
          clients: clients,
          dataIsLoaded: true,
        });
      });
  }

  render() {
    const { dataIsLoaded, items, clients } = this.state;
    if (!dataIsLoaded) return <div><h1> Please wait some time.... </h1></div> ;

    return (
      <div className="App">

        <div className="left" id={'left'}>
          <div style={{overflowY:'scroll',height:'100%'}}>
            {items.map((item: any, i: number) => (
              <Item item={item} key={i} clients={clients} />
            ))}
          </div>
        </div>

        <div className="content" id={'content'}>
          <MyMap items={items} clients={clients} />
        </div>

        <div className="clear"></div>
      </div>
    );
  }

}

export default App;
