import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-Permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }

    getCameraPermissions = async () =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        
        this.setState({
          /*status === "granted" is true when user has granted permission
            status === "granted" is false when user has not granted the permission
          */
          hasCameraPermissions: status === "granted",
        });
      }

      handleBarCodeScanned = async({type, data})=>{
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal'
          });
        
      }

      render(){
          const hasCameraPermissions = this.state.hasCameraPermissions;
          const scanned = this.state.scanned;
          const buttonState = this.state.buttonState;

          if(buttonState === "clicked" && hasCameraPermissions){
              return(
                  <BarCodeScanner
                  onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                  />
              )
          }

          else if(buttonState === "normal"){
              return(
                  <View style={styles.container}>
                       <Image
                        source={require("../assets/Barcode-scanner.jpg")}
                        style={{width:200, height: 200}}/>

                    <Text>
                        {hasCameraPermissions===true ? this.state.scannedData : 'Request Camera Permissions'}
                    </Text>

                    <TouchableOpacity
                        onPress={this.getCameraPermissions}
                        style={styles.scanButton}
                        title = "Bar Code Scanner">
                        <Text style={styles.buttonText}>Scan QR Code</Text>
                    </TouchableOpacity>
                  </View>
              )
          }
      }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center'
    },
    scanButton:{
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 10
      },
      buttonText:{
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10
      },

})