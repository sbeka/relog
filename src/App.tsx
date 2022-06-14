import React from "react";
import './App.css';
import "leaflet/dist/leaflet.css";
import Item from './components/Item/Item';
import { AppState } from './shared/types';
import MyMap from './components/MyMap/MyMap';
// @ts-ignore
import { FixedSizeList as List } from 'react-window';
import { getClientById } from './shared/utils';


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
          <List
            itemData={items}
            itemCount={items.length}
            itemSize={83.5}
            height={600}
            width={399}
          >
            {this.row.bind(this)}
          </List>
        </div>

        <div className="content" id={'content'}>
          <MyMap items={items} clients={clients} />
        </div>

        <div className="clear"></div>
      </div>
    );
  }

  row({ data, index, style }: any) {
    const client = getClientById(this.state.clients, data[index].client_id);
    return (<div style={style}>
      <Item item={data[index]} client={client} />
    </div>);
  }

}

export default App;
