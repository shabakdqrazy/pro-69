import React, { Component } from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions"

export default class TransactionScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      domState:"normal",
      hasCameraPermissions:null,
      scanned:false,
      scannedData:""
    }
  }
  
  getCameraPermission= async domState=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA)

    this.setState({
      hasCameraPermissions:status==="granted",
      domState:domState,
      scanned:false
    })
  }
  handleBarcodeScanned= async ({type,data})=>{
    this.setState({
      scannedData: data,
      domState:"normal",
      scanned : true
    }) 
  }
  render() {
    const {domState,hasCameraPermissions,scanned,scannedData}=this.state
    if(domState === "scanner"){
      return(
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarcodeScanned}
        />
      )
    }
    
    return (
      <View style={styles.container}>
        <Text>
          {hasCameraPermissions ? scannedData : "Request for Camera Permission"}
        </Text>
       <TouchableOpacity  style={styles.button}
       onPress ={()=>{this.getCameraPermission("scanner")}}
       >
         <Text style={styles.text}>Scan QR Code</Text>
       </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  },
  button:{
    width:"43%",
    height:55,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#f48d20",
    borderRadius:15


  }
});
