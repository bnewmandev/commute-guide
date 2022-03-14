import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
import React, {Component} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      homeLocation: "",
      workLocation: "",
      savedHL: "",
      savedWL: ""
    }
  }

  componentDidMount() {
      getLocations().then(locations => {
          this.setState({savedHL: locations.savedHL, savedWL: locations.savedWL})
      })
  }

    updateLocations() {
    if (this.state.homeLocation) {
      this.setState({savedHL: this.state.homeLocation, homeLocation: ""});
    }
    if (this.state.workLocation) {
      this.setState({savedWL: this.state.workLocation, workLocation: ""})
    }
    storeLocations({savedHL: this.state.savedHL, savedWL: this.state.savedWL}).then(() => console.log("Saved"))
  }

  render() {
    return(
        <View style={styles.container}>
          <Text>Please enter your home location: </Text>
          <TextInput value={this.state.homeLocation} onChangeText={text => this.setState({homeLocation: text})} style={styles.input} placeholder="Postcode" />
          <Text>Please enter your work location: </Text>
          <TextInput value={this.state.workLocation} onChangeText={text => this.setState({workLocation: text})} style={styles.input} placeholder="Postcode" />
          <Button
              onPress={() => this.updateLocations()}
              title="Update Changes"
          />
          <Text style={styles.spacerOne}>Current Locations: </Text>
          <Text>Home: {this.state.savedHL}</Text>
          <Text>Work: {this.state.savedWL}</Text>

          <StatusBar style="auto" />
        </View>
    )
  }
}

const storeLocations = async (value) => {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem("saved_locations", jsonValue, (e) => {
        if (e) {
            console.log(e)
        }
    })

}

const getLocations = async () => {
    const jsonValue = await AsyncStorage.getItem("saved_locations")
    return jsonValue != null ? JSON.parse(jsonValue) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    width: '90%',
    height: 40,
    textAlign: 'center',
    borderWidth: 1,
    marginBottom: 20
  },

  spacerOne: {
    marginTop: 30,
    marginBottom: 10
  }

});

