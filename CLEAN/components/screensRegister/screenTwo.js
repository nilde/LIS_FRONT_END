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


const POSSIBLE_STATES=["PENDIENTE","EN PROGRESO","SOLUCIONADA"]

const relations={
    "Destrozo":"#CE0202",
    "Mejora":"#3CB500",
    "Limpieza":"#0077E8",
    "Avería":"#E5BD1D"
}


export default class ModalDetails extends Component {
    constructor(props) {
        super(props);
        this.manageLike=this.manageLike.bind(this);
        this.state={
            heart:false,
            entries:[{title: 1},{title: 2},{title: 3},{title: 4}],
            likes:322,
            actualState:0,
            idIncidence:"122ff364"
        }
    }




    componentDidMount() {


    }

    manageLike(){
        if(this.state.heart){
             this.setState({heart:false,likes:this.state.likes-1})

        }
        else{
              this.setState({heart:true,likes:this.state.likes+1})
        }
    }

    _renderItem ({item, index}) {
        return (
            <View style={{backgroundColor:"#303030",alignItems:"center",height:"80%",justifyContent:"center"}}>

    <Image
      style={{ width:"100%",height:"100%",resizeMode:"cover",position:"absolute",alignSelf:"center" }}
      source={{ uri: 'https://lachincheta.laverdad.es/img/chinchetas/101/202075912__300x400.jpg' }}

      alt={index}
    />

            </View>
        );
    }
    
    render() {
        return(
            <Modal isVisible={this.props.isVisible}>
                <Button style={{alignSelf:"center",position:"absolute",top:"4.1%",backgroundColor:"#fff",width:wp("18%"),height:wp("18.1%"),borderRadius:wp("12%"),justifyContent:"center",borderWidth:0}} onPress={()=>this.props.closeModalVisible("DETAILS")}>
                <Image style={{width:"33%",height:"33%",resizeMode:"contain",tintColor:"#303030",alignSelf:"center"}} source={require("../images/close.png")}/>
                </Button>
                <View style={{position:"absolute",bottom:"-4%",width:wp("100%"),height:hp("85%"),backgroundColor:"#fff",alignSelf:"center",borderTopLeftRadius:20,borderTopRightRadius:20,overflow:"hidden",paddingTop:"5%"}}>
                    <View style={{backgroundColor:relations[this.props.type],borderWidth:0,width:"35%",height:"6%",alignSelf:"center",borderRadius:3,justifyContent:"center",alignItems:"center"}}>
                <Text style={{color:"#fff",fontSize:18,fontWeight:"500"}}>
                    {this.props.type.toUpperCase()}
                </Text>
                    </View>
                <View style={{position:"absolute",top:"6%",width:"80%",height:"55%",marginTop:"15%",alignSelf:"center",alignItems:"center"}}>

                <View style={{flex:1,shadowOpacity:0.6,shadowRadius:2,shadowOffset:{height:1}}}>
                <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.entries}
              renderItem={this._renderItem}
              sliderWidth={wp("90%")}
              itemWidth={wp("65%")}
              itemHeight={"90%"}
            />
            </View>
                </View>

                <View style={{position:"absolute",bottom:"22%",width:"80%",height:"20%",marginTop:"8%",alignSelf:"center",alignItems:"center"}}>
                <Text style={{fontSize:28,textAlign:"center",fontWeight:"500"}}>
                    Descripción
                </Text>

                <Text style={{fontSize:18,marginTop:"5%",textAlign:"center",color:"gray"}}>
                   Esto es una descripción un poco larga pero tampoco nos flipemos que la peña no se la lee luego.
                </Text>
               
                </View>
                <Button style={{alignSelf:"center",position:"absolute",bottom:"13%",backgroundColor:"#303030",width:"50%",alignItems:"center",height:"7%",justifyContent:"center",borderRadius:50,borderWidth:0}} onPress={()=>this.setState({actualState:(this.state.actualState+1)%3})}>
                <Text style={{fontSize:20,fontWeight:"500",color:"#fff"}}>
                    {POSSIBLE_STATES[this.state.actualState]}
                </Text>
                </Button>
                <Text style={{position:"absolute",bottom:"10%",alignSelf:"center",fontSize:14,fontWeight:"500",color:"gray"}}>
                    Pulsa para modificar el estado.
                </Text>

                <Text style={{position:"absolute",top:"5%",right:"5%",fontSize:13,fontWeight:"500",color:"gray"}}>
                    ID:{this.state.idIncidence}
                </Text>

                {false &&
                <Button style={{alignSelf:"center",position:"absolute",bottom:"10%",width:wp("22%"),height:wp("22%"),borderRadius:0,justifyContent:"center",borderWidth:0}} onPress={()=>this.manageLike()}>
                
                {!this.state.heart &&
                <Image style={{width:"53%",height:"53%",resizeMode:"contain",tintColor:"#303030",alignSelf:"center",tintColor:"#F9313F"}} source={require("../images/emptyHeart.png")}/>}
                {this.state.heart &&
                <Image style={{width:"53%",height:"53%",resizeMode:"contain",tintColor:"#303030",alignSelf:"center",tintColor:"#F9313F"}} source={require("../images/fullHeart.png")}/>}
                </Button>
                }
                </View>
                {false &&
                <Text style={{position:"absolute",bottom:"4%",alignSelf:"center",color:(this.state.heart)? "#F9313F":"gray",fontSize:20,fontWeight:"600"}}>
                    {this.state.likes}
                </Text>
                }
              
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
