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


export default class ModalDetails extends Component {
    constructor(props) {
        super(props);
        this.manageLike=this.manageLike.bind(this);
        this.state={
            heart:false,
            entries:[{title: 1},{title: 2},{title: 3},{title: 4}],
            likes:322
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
                <Button style={{alignSelf:"center",position:"absolute",top:"12.1%",backgroundColor:"#fff",width:wp("18%"),height:wp("18.1%"),borderRadius:wp("12%"),justifyContent:"center",borderWidth:0}} onPress={()=>this.props.closeModalVisible("DETAILS")}>
                <Image style={{width:"33%",height:"33%",resizeMode:"contain",tintColor:"#303030",alignSelf:"center"}} source={require("../images/close.png")}/>
                </Button>
                <View style={{position:"absolute",bottom:"-4%",width:wp("100%"),height:hp("75%"),backgroundColor:"#fff",alignSelf:"center",borderTopLeftRadius:20,borderTopRightRadius:20,overflow:"hidden",paddingTop:"5%"}}>
                    <View style={{backgroundColor:"#F9313F",borderWidth:0,width:"35%",height:"6%",alignSelf:"center",borderRadius:3,justifyContent:"center",alignItems:"center"}}>
                <Text style={{color:"#fff",fontSize:16}}>
                    AVERÍA
                </Text>
                    </View>
                <View style={{position:"absolute",top:"6%",width:"80%",height:"55%",marginTop:"10%",alignSelf:"center",alignItems:"center"}}>

                <View style={{flex:1,shadowOpacity:0.3,shadowRadius:3,shadowOffset:{height:1}}}>
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
                <Text style={{fontSize:25,textAlign:"center"}}>
                    Descripción
                </Text>

                <Text style={{fontSize:14,marginTop:"4%",textAlign:"center",color:"gray"}}>
                   Esto es una descripción un poco larga pero tampoco nos flipemos que la peña no se la lee luego.
                </Text>
               
                </View>


                <Button style={{alignSelf:"center",position:"absolute",bottom:"10%",width:wp("22%"),height:wp("22%"),borderRadius:0,justifyContent:"center",borderWidth:0}} onPress={()=>this.manageLike()}>
                
                {!this.state.heart &&
                <Image style={{width:"43%",height:"43%",resizeMode:"contain",tintColor:"#303030",alignSelf:"center",tintColor:"#F9313F"}} source={require("../images/emptyHeart.png")}/>}
                {this.state.heart &&
                <Image style={{width:"43%",height:"43%",resizeMode:"contain",tintColor:"#303030",alignSelf:"center",tintColor:"#F9313F"}} source={require("../images/fullHeart.png")}/>}
                </Button>
                </View>

                <Text style={{position:"absolute",bottom:"4%",alignSelf:"center",color:"gray",fontSize:16,fontWeight:"500"}}>
                    {this.state.likes} me gusta
                </Text>
              
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
