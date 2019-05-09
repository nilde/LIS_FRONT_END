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

import Modal from "react-native-modal";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';
import Button from 'apsl-react-native-button';
import * as Animatable from 'react-native-animatable';


const POSSIBLE_STATES=["PENDIENTE","EN PROGRESO","SOLUCIONADA"]


const relations={
    "Destrozo":"#FF1500",
    "Mejora":"#00BF6C",
    "Limpieza":"#0074F9",
    "Avería":"#F9C107"
}


export default class ModalDetails extends Component {
    constructor(props) {
        super(props);
        this._renderItem=this._renderItem.bind(this);

        this.manageLike=this.manageLike.bind(this);
        this.state={
            heart:false,
            entries:[{title: 1},{title: 2},{title: 3},{title: 4}],
            likes:177,
            actualState:0,
            idIncidence:"122ff364",
            flagStatus:false
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
        console.warn(this.state.entries.length)
        return (
            <View style={{ backgroundColor:"#fff",alignItems:"center",height:"90%",justifyContent:"center",borderRadius:20}}>

    <Image
      style={{ width:"100%",height:"100%",resizeMode:"cover",position:"absolute",alignSelf:"center",borderRadius:10,borderWidth:0,borderColor:"#fff" }}
      source={{ uri: 'https://lachincheta.laverdad.es/img/chinchetas/101/202075912__300x400.jpg' }}

      alt={index}
    />
    {index!=this.state.entries.length-1 &&
    <View style={{position:"absolute", bottom:"40%",right:"3%", width: wp("7%"), height: wp("7%"), alignSelf: "center", borderRadius:800,borderWidth:0,backgroundColor:"#fff",justifyContent:"center",alignItems:"center" }} >
                                <Text style={{ color:relations[this.props.type], fontSize: 18,fontWeight:"700",position:"absolute" }}>
                                        →
</Text>
    
                                   
                                </View>
    }
   {index!=0 &&
                                <View style={{position:"absolute", bottom:"40%",left:"3%", width: wp("7%"), height: wp("7%"), alignSelf: "center", borderRadius:800,borderWidth:0,backgroundColor:"#fff",justifyContent:"center",alignItems:"center" }}>
                                <Text style={{ color:relations[this.props.type], fontSize: 18,fontWeight:"700",position:"absolute" }}>
                                        ←
</Text>
                                   
                                </View>
                                 }
            <View style={{width:wp("6%"),height:wp("6%"),borderRadius:4,backgroundColor:"#fff",position:"absolute",bottom:"3%",right:"3%",alignItems:"center",justifyContent:"center"}}>
            <Text style={{fontWeight:"700",color:relations[this.props.type]}}>
                {index+1}
                </Text>
            </View>
            </View>
        );
    }
    
    render() {
        return(
            <Modal isVisible={this.props.isVisible}  backdropOpacity={0.9}>
                <Button style={{alignSelf:"center",position:"absolute",top:"4.1%",backgroundColor:relations[this.props.type],width:wp("18%"),height:wp("18.1%"),borderRadius:wp("12%"),justifyContent:"center",borderWidth:0}} onPress={()=>this.props.closeModalVisible("DETAILS")}>
                <Image style={{width:"33%",height:"33%",resizeMode:"contain",tintColor:"#fff",alignSelf:"center"}} source={require("../../images/close.png")}/>
                </Button>
                
                <Button style={{position:"absolute",top:"1%",right:"1%",borderWidth:0,width:"15%",justifyContent:"center",alignItems:"center"}}>


<Image source={require("../../images/share.png")} style={{resizeMode:"contain",width:wp("7.5%"),height:wp("7.5%"),tintColor:"#fff"}}/>
</Button>

                <Button style={{position:"absolute",top:"1%",left:"1%",borderWidth:0,width:"15%",justifyContent:"center",alignItems:"center"}} onPress={()=>this.setState({flagStatus:!this.state.flagStatus})}>


<Image source={require("../../images/flag_f.png")} style={{resizeMode:"contain",width:wp("6.5%"),height:wp("6.5%"),tintColor:(this.state.flagStatus) ? "#CE0202" :  "#fff"}}/>
</Button>
                <View style={{position:"absolute",bottom:"-4%",width:wp("100%"),height:hp("85%"),backgroundColor:relations[this.props.type],alignSelf:"center",borderTopLeftRadius:20,borderTopRightRadius:20,overflow:"hidden",paddingTop:"5%"}}>
                <Image source={require("../../images/Path.png")} style={{position:"absolute",bottom:"-75%", resizeMode:"contain",width:wp("100%"),height:hp("100%"),tintColor:"#fff"}}/>
                    <View style={{borderWidth:0,width:"100%",height:"10%",alignSelf:"center",borderRadius:40,justifyContent:"center",alignItems:"center"}}>
                <Text style={{color:"#fff",fontSize:34,fontWeight:"600",position:"absolute",top:0}}>
                    {this.props.type}
                </Text>
                <Text style={{color:"#fff",fontSize:15,fontWeight:"600",position:"absolute",bottom:"10%"}}>
                    Creada el 27 de Abr.
                </Text>
                    </View>
                   
                <View style={{position:"absolute",top:"5%",width:"80%",height:"55%",marginTop:"15%",alignSelf:"center",alignItems:"center",justifyContent:"center"}}>
                
                <View style={{flex:1,shadowOpacity:0.4,shadowRadius:6,shadowOffset:{height:1}}}>
                
               

                <Carousel
                layout={'stack'} layoutCardOffset={'9'}
              ref={(c) => { this._carousel = c; }}
              data={this.state.entries}
              renderItem={this._renderItem}
              sliderWidth={wp("82%")}
              itemWidth={wp("82%")}
              itemHeight={wp("82%")}
              style={{position:"absolute",right:0}}
            />
            </View>
                </View>
                
                <Animatable.View useNativeDriver animation="bounce" duration={28000} easing="linear" iterationCount="infinite" style={{position:"absolute",right:"22%",bottom:"32%",width:wp("7%"),height:wp("7%"),borderRadius:wp("5%"),backgroundColor:"#fff"}}></Animatable.View>
                <Animatable.View useNativeDriver animation="bounce" duration={24000} easing="linear" iterationCount="infinite" style={{position:"absolute",right:"17%",bottom:"36%",width:wp("3%"),height:wp("3%"),borderRadius:wp("4%"),backgroundColor:"#fff"}}></Animatable.View>
                <Animatable.View useNativeDriver animation="bounce" duration={20000} easing="linear" iterationCount="infinite" style={{position:"absolute",left:"20%",bottom:"28%",width:wp("10%"),height:wp("10%"),borderRadius:wp("5%"),backgroundColor:"#fff"}}></Animatable.View>
                


                {this.props.isAdmin &&
                <Button style={{alignSelf:"center",position:"absolute",bottom:"13%",backgroundColor:"#303030",width:"50%",alignItems:"center",height:"7%",justifyContent:"center",borderRadius:50,borderWidth:0}} onPress={()=>this.setState({actualState:(this.state.actualState+1)%3})}>
                <Text style={{fontSize:20,fontWeight:"500",color:"#fff"}}>
                    {POSSIBLE_STATES[this.state.actualState]}
                </Text>
                </Button>
                }
                {this.props.isAdmin &&
                <Text style={{position:"absolute",bottom:"10%",alignSelf:"center",fontSize:14,fontWeight:"500",color:"gray"}}>
                    Pulsa para modificar el estado.
                </Text>
                }
                {this.props.isAdmin &&
                <Text style={{position:"absolute",top:"5%",right:"5%",fontSize:13,fontWeight:"500",color:"gray"}}>
                    ID:{this.state.idIncidence}
                </Text>
                }
                <Text style={{color:relations[this.props.type],position:"absolute",bottom:"11%",left:"6%",fontSize:17,fontWeight:"500"}}>
                    Pendiente
                </Text>
                <Text style={{color:"#858784",position:"absolute",bottom:"11%",alignSelf:"center",fontSize:17,fontWeight:"500"}}>
                    En progreso
                </Text>
                <Text style={{color:"#858784",position:"absolute",bottom:"11%",right:"6%",fontSize:17,fontWeight:"500"}}>
                    Solucionada
                </Text>
                
                
                <View style={{position:"absolute",right:"12%",bottom:"7%",height:wp("1.5%"),width:"38%",borderRadius:wp("3%"),backgroundColor:"#858784"}}>

                </View>
                <View style={{position:"absolute",left:"12%",bottom:"7%",height:wp("1.5%"),width:"38%",borderRadius:wp("3%"),backgroundColor:"#858784"}}>

                </View>
                <View style={{position:"absolute",alignSelf:"center",bottom:"6%",height:wp("5%"),width:wp("5%"),borderRadius:wp("3%"),backgroundColor:"#858784"}}>

                </View>
                <View style={{position:"absolute",right:"12%",bottom:"6%",height:wp("5%"),width:wp("5%"),borderRadius:wp("3%"),backgroundColor:"#858784"}}>

                </View>
                <View style={{position:"absolute",left:"12%",bottom:"6%",height:wp("5%"),width:wp("5%"),borderRadius:wp("3%"),backgroundColor:relations[this.props.type]}}>

                </View>


                </View>
              
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
