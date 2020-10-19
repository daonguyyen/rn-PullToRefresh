import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      items: [],
      isLoading: false
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    let apiURL = 'https://jsonplaceholder.typicode.com/posts'
    this.setState({isLoading: true})
    fetch(apiURL).then(res => res.json()).then(res => {
      this.setState({items: res})
    }).finally( () => this.setState({isLoading: false}) ) //When request api final not reload list
  }

  renderRow = ({item, index}) => {
    return (
      <View style={{padding: 10, borderBottomColor: '#cccccc', borderBottomWidth: 1}}>
        <Text>{item.id + ') ' + item.title}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1, marginTop: 60}}>
        <FlatList 
          data = {this.state.items}
          renderItem = {this.renderRow}
          keyExtractor = {(i, k) => k.toString()}
          refreshing={this.state.isLoading} //Refresh Data
          onRefresh={this.getData}  //onRefresh (pull to refresh)
        />
      </View>
    )
  }
}
