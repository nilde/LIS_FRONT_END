/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Location, TouchableOpacity, Icon, AsyncStorage,TextInput,Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Modal from "react-native-modal";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';
import Button from 'apsl-react-native-button';


export default class ModalCreation extends Component {
    constructor(props) {
        super(props);
        this.state={
            heart:false,
            entries:[{title: 1},{title: 2},{title: 3},{title: 4}],
            likes:322,
            active:3
        }
    }

    
    
    render() {
        return(
            <Modal isVisible={this.props.isVisible}>
                    
                    <TouchableOpacity style={{ flex: 1, justifyContent: "center" }} onPress={() => this.props.closeModalVisible("CREATION")}>
                    <Button style={{alignSelf:"center",position:"absolute",top:"4.1%",backgroundColor:"#fff",width:wp("18%"),height:wp("18.1%"),borderRadius:wp("12%"),justifyContent:"center",borderWidth:0}} onPress={() => this.props.closeModalVisible("CREATION")}>
                <Image style={{width:"33%",height:"33%",resizeMode:"contain",tintColor:"#303030",alignSelf:"center"}} source={require("../images/close.png")}/>
                </Button>

                        <View style={{ position: "absolute",bottom:"-4%", alignSelf: "center", backgroundColor: "#fff", width: wp("100%"), height: hp("85%"), borderRadius: 10, overflow: "hidden",paddingTop:"5%" }}>

                               
                            <Button style={{ alignSelf: "center", position: "absolute", bottom: "8%", width: "90%", height: "15%", backgroundColor: "#303030", borderWidth: 0,borderRadius:3 }} onPress={()=>this.props.createPin()}>
                                <Text style={{ color: "#fff", fontWeight: "600", alignSelf: "center", fontSize: 20 }}>
                                    Crear incidencia
            </Text>
                            </Button>

                            <View style={{width:"95%",height:"25%",alignSelf:"center",position:"absolute",top:"28%"}}>
                                <View style={{flexDirection:"column",justifyContent:"center"}}>
                                <Text style={{alignSelf:"center",fontSize:26,color:"#303030"}}>
                                    Descripción
                                </Text>
                                <Text style={{alignSelf:"center",fontSize:12,color:"gray",position:"absolute",right:"3%",bottom:0}}>
                                    (140 carác. máx.)
                                </Text>
                                </View>
                                <TextInput
                                style={{borderWidth:1,borderColor:"#B5B5B5",height:"80%",width:"95%",alignSelf:"center",borderRadius:5,marginTop:"5%"}}
        {...this.props}
        editable = {true}
        maxLength = {140}
        multiline = {true}
         numberOfLines = {4}
      />
                                </View>


                                <View style={{position:"absolute",top:"5%",backgroundColor:"red",width:"100%",height:"20%"}}>
                                <Text style={{alignSelf:"center",fontSize:26,color:"#303030"}}>
                                    Imágenes
                                </Text>
                                </View>


                            <View style={{width:"95%",height:"25%",alignSelf:"center",position:"absolute",bottom:"20%"}}>
                                <Text style={{alignSelf:"center",fontSize:26}}>
                                    Categoría
                                </Text>
                                <View style={{width:"100%",height:"50%",flexDirection:"row",justifyContent:"space-around",marginTop:"2%"}}>
<Button style={{width:"20%",alignSelf:"center",height:"52%",borderRadius:3,backgroundColor:(this.state.active==0) ? "#303030" : "#fff",borderColor:"#303030",borderWidth:1}} onPress={()=>this.setState({active:0})}>
<Text style={{color:(this.state.active==0) ? "#fff" : "#303030",fontSize:18}}>
Tipo 1
</Text>
</Button>
<Button style={{width:"20%",alignSelf:"center",height:"52%",borderRadius:3,backgroundColor:(this.state.active==1) ? "#303030" : "#fff",borderColor:"#303030",borderWidth:1}} onPress={()=>this.setState({active:1})}>
<Text style={{color:(this.state.active==1) ? "#fff" : "#303030",fontSize:18}}>
Tipo 2
</Text>
</Button>
<Button style={{width:"20%",alignSelf:"center",height:"52%",borderRadius:3,backgroundColor:(this.state.active==2) ? "#303030" : "#fff",borderColor:"#303030",borderWidth:1}} onPress={()=>this.setState({active:2})}>
<Text style={{color:(this.state.active==2) ? "#fff" : "#303030",fontSize:18}}>
Tipo 3
</Text>
</Button>
<Button style={{width:"20%",alignSelf:"center",height:"52%",borderRadius:3,backgroundColor:(this.state.active==3) ? "#303030" : "#fff",borderColor:"#303030",borderWidth:1}} onPress={()=>this.setState({active:3})}>
<Text style={{color:(this.state.active==3) ? "#fff" : "#303030",fontSize:18}}>
Tipo 4
</Text>
</Button>



                                </View>

                            </View>

                        </View>
                    </TouchableOpacity>
                </Modal>
        )
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
