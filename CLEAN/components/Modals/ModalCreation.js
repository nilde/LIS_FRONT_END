/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Location, TouchableOpacity, Icon, AsyncStorage, TextInput, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Modal from "react-native-modal";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';
import Button from 'apsl-react-native-button';
import * as Animatable from 'react-native-animatable';

const COLORS = ["#FF1500", "#00BF6C", "#0074F9","#F9C107"]

export default class ModalCreation extends Component {
    constructor(props) {
        super(props);

        this._renderItem=this._renderItem.bind(this);

        this.state = {
            heart: false,
            entries: [{ title: 1 }, { title: 2 }, { title: 3 }, { title: 4 }],
            likes: 322,
            active: 0,
            description:""
        }
    }

    _renderItem ({item, index}) {
        return (
            <View style={{backgroundColor:"#303030",alignItems:"center",height:"80%",justifyContent:"center"}}>

    <Image
      style={{ width:"100%",height:"100%",resizeMode:"cover",position:"absolute",alignSelf:"center" }}
      source={item}

      alt={index}
    />

            </View>
        );
    }


    render() {
        return (
            <Modal isVisible={this.props.isVisible}  backdropOpacity={0.9}>

                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Button style={{ alignSelf: "center", position: "absolute", top: "4.1%", backgroundColor: COLORS[this.state.active], width: wp("18%"), height: wp("18.1%"), borderRadius: wp("12%"), justifyContent: "center", borderWidth: 0 }} onPress={() =>{this.setState({active:-1}); this.props.closeModalVisible("CREATION")}}>
                        <Image style={{ width: "33%", height: "33%", resizeMode: "contain", tintColor: "#fff", alignSelf: "center" }} source={require("../../images/close.png")} />
                    </Button>

                    <View style={{ position: "absolute", bottom: "-4%", alignSelf: "center", backgroundColor: "#fff", width: wp("100%"), height: hp("85%"), borderRadius: 20, overflow: "hidden", paddingTop: "5%",backgroundColor:COLORS[this.state.active] }}>
                    <Image source={require("../../images/Path.png")} style={{position:"absolute",bottom:"-75%", resizeMode:"contain",width:wp("100%"),height:hp("100%"),tintColor:"#fff"}}/>
                    

                        <Button isDisabled={this.state.active<0} style={{ alignSelf: "center", position: "absolute", bottom: "4%", width: "90%", height: "12%", backgroundColor:COLORS[this.state.active] , borderWidth: 0, borderRadius: 50,shadowColor:COLORS[this.state.active],shadowRadius:8,shadowOpacity:0.3,shadowOffset:{height:1} }} onPress={() =>{this.setState({active:-1}); this.props.createPin(this.state.active,this.state.description)}}>
                            <Text style={{ color: "#fff", fontWeight: "600", alignSelf: "center", fontSize: 23 }}>
                                Crear incidencia
            </Text>
                        </Button>




                        <View style={{ position: "absolute", top: "5%", width: "100%", height: "25%"}}>
                            <Text style={{ alignSelf: "center", fontSize: 32, color: "#fff",marginBottom:"5%",fontWeight:"500" }}>
                                Imágenes
                                </Text>
                                <View style={{flex:1,shadowOpacity:0.3,shadowRadius:3,shadowOffset:{height:1},alignSelf:"center",alignItems:"center"}}>
                                <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.props.arrayImages}
              renderItem={this._renderItem}
              sliderWidth={wp("80%")}
              itemWidth={wp("35%")}
              itemHeight={"90%"}
            />
            </View>
                        </View>
                        <Animatable.View useNativeDriver animation="bounce" duration={28000} easing="linear" iterationCount="infinite" style={{position:"absolute",right:"22%",bottom:"32%",width:wp("7%"),height:wp("7%"),borderRadius:wp("5%"),backgroundColor:"#fff"}}></Animatable.View>
                <Animatable.View useNativeDriver animation="bounce" duration={24000} easing="linear" iterationCount="infinite" style={{position:"absolute",right:"17%",bottom:"36%",width:wp("3%"),height:wp("3%"),borderRadius:wp("4%"),backgroundColor:"#fff"}}></Animatable.View>
                <Animatable.View useNativeDriver animation="bounce" duration={20000} easing="linear" iterationCount="infinite" style={{position:"absolute",left:"20%",bottom:"28%",width:wp("10%"),height:wp("10%"),borderRadius:wp("5%"),backgroundColor:"#fff"}}></Animatable.View>
                


                        <Button style={{position:"absolute", bottom:"40%",right:"5%", width: wp("22%"), height: wp("22%"), alignSelf: "center", borderRadius:800,shadowRadius:8,borderWidth:0 }} onPress={() => this.setState({ active:(this.state.active+1)%COLORS.length })}>
                                <Text style={{ color:"#fff", fontSize: 44,fontWeight:"600",position:"absolute" }}>
                                        →
</Text>
                                   
                                </Button>
                                <Button style={{position:"absolute", bottom:"40%",left:"5%", width: wp("22%"), height: wp("22%"), alignSelf: "center", borderRadius:800,shadowRadius:8,borderWidth:0 }} onPress={() => this.setState({ active:(this.state.active-1<0)?3 :(this.state.active-1)%COLORS.length })}>
                                <Text style={{ color:"#fff", fontSize: 44,fontWeight:"600",position:"absolute" }}>
                                        ←
</Text>
                                   
                                </Button>

                        <View style={{ width: "50%", height: "40%", alignSelf: "center", position: "absolute", bottom: "30%" }}>
       

                                
                                {this.state.active==1 &&
                                <Button style={{position:"absolute",bottom:"10%", width: wp("30%"), height: wp("50%"), alignSelf: "center", borderRadius:800,borderWidth:0 }} onPress={() => this.setState({ active: 1 })}>
                                <Text style={{ color:"#fff", fontSize: 90,fontWeight:"600",position:"absolute",top:"20%"  }}>
                                        +
</Text>
                                    <Text style={{ color:"#fff", fontSize:24,fontWeight:"500",position:"absolute",bottom:"16%"  }}>
                                        Mejora
</Text>
                                </Button>

                                }

                                {this.state.active==2 &&
                                <Button style={{position:"absolute",bottom:"10%", width: wp("30%"), height: wp("50%"), alignSelf: "center", borderRadius:800,borderWidth:0 }} onPress={() => this.setState({ active: 1 })}>
                                <Image style={{position:"absolute",top:"30%",width:"38%",height:"38%",resizeMode:"contain",tintColor:"#fff"}} source={require("../../images/clean.png")}/>
                                   
                                    <Text style={{ color:"#fff", fontSize:24,fontWeight:"500",position:"absolute",bottom:"16%"  }}>
                                        Limpieza
</Text>
                                </Button>

                                }
                                {this.state.active==3&&
                                <Button style={{position:"absolute",bottom:"10%", width: wp("30%"), height: wp("50%"), alignSelf: "center", borderRadius:800,borderWidth:0 }} onPress={() => this.setState({ active: 1 })}>
                                <Text style={{ color:"#fff", fontSize: 75,fontWeight:"700",position:"absolute",top:"25%"   }}>
                                        !
</Text>
                                   
                                    <Text style={{ color:"#fff", fontSize:24,fontWeight:"500",position:"absolute",bottom:"16%"   }}>
                                        Avería
</Text>
                                </Button>

                                }

                                {this.state.active==0 &&
                                <Button style={{position:"absolute",bottom:"10%", width: wp("30%"), height: wp("50%"), alignSelf: "center", borderRadius:800,borderWidth:0 }} onPress={() => this.setState({ active: 1 })}>
                                <Image style={{position:"absolute",top:"30%",width:"38%",height:"38%",resizeMode:"contain",tintColor:"#fff"}} source={require("../../images/error.png")}/>
                                   
                                    <Text style={{ color:"#fff", fontSize:24,fontWeight:"500",position:"absolute",bottom:"16%"  }}>
                                        Destrozo
</Text>
                                </Button>

                                }

                            {false &&
                            <View style={{ width: "100%", height: "100%", flexDirection: "column", justifyContent: "space-around",position:"absolute",top:"25%" }}>
                            
                            <View style={{flex:1,width:"100%",flexDirection:"row",alignSelf:"center",justifyContent:"space-evenly"}}>
                                <Button style={{ width: wp("30%"), height: wp("30%"), alignSelf: "center", borderRadius:800, backgroundColor:(this.state.active == 0) ? COLORS[0] : "gray", borderColor: (this.state.active == 0) ? COLORS[0] : "gray",shadowColor:COLORS[0],shadowOpacity:(this.state.active == 0) ? 0.4 : 0,shadowOffset:{height:1},shadowRadius:8 }} onPress={() => this.setState({ active: 0 })}>
                                <Image style={{position:"absolute",width:"28%",height:"28%",resizeMode:"contain",tintColor:"#fff",top:"30%"}} source={require("../../images/error.png")}/>
                                   
                                    <Text style={{ color:"#fff", fontSize:18,fontWeight:"600",position:"absolute",bottom:"16%"  }}>
                                        Destrozo
</Text>
                                </Button>
                                <Button style={{ width: wp("30%"), height: wp("30%"), alignSelf: "center", borderRadius:800, backgroundColor: (this.state.active == 1) ? COLORS[1] : "gray", borderColor: (this.state.active == 1) ? COLORS[1] : "gray",shadowColor:COLORS[1],shadowOpacity:(this.state.active == 1) ? 0.4 : 0,shadowOffset:{height:1},shadowRadius:8 }} onPress={() => this.setState({ active: 1 })}>
                                <Text style={{ color:"#fff", fontSize: 60,fontWeight:"600",position:"absolute",top:"15%"  }}>
                                        +
</Text>
                                    <Text style={{ color:"#fff", fontSize:18,fontWeight:"500",position:"absolute",bottom:"16%"  }}>
                                        Mejora
</Text>
                                </Button>
                                </View>
                                <View style={{flex:1,width:"100%",flexDirection:"row",alignSelf:"center",justifyContent:"space-evenly"}}>
                                <Button style={{ width: wp("30%"), height: wp("30%"), borderRadius: 800, backgroundColor: (this.state.active == 2) ? COLORS[2] : "gray", borderColor:(this.state.active == 2) ? COLORS[2] : "gray",shadowColor:COLORS[2],shadowOpacity:(this.state.active == 2) ? 0.4 : 0,shadowOffset:{height:1},shadowRadius:8 }} onPress={() => this.setState({ active: 2 })}>
                                 <Text style={{ color:"#fff", fontSize:16,fontWeight:"600",position:"absolute",bottom:"16%"   }}>
                                        Limpieza
</Text>
                                </Button>
                                <Button style={{ width: wp("30%"), height: wp("30%"), borderRadius: 800, backgroundColor: (this.state.active == 3) ? COLORS[3] : "gray", borderColor:(this.state.active == 3) ? COLORS[3] : "gray",shadowColor:COLORS[3],shadowOpacity:(this.state.active == 3) ? 0.4 : 0,shadowOffset:{height:1},shadowRadius:8 }} onPress={() => this.setState({ active: 3 })}>
                                <Text style={{ color:"#fff", fontSize: 45,fontWeight:"700",position:"absolute",top:"25%"   }}>
                                        !
</Text>
                                   
                                    <Text style={{ color:"#fff", fontSize:16,fontWeight:"600",position:"absolute",bottom:"16%"   }}>
                                        Avería
</Text>
                                </Button>
                                </View>



                            </View>
                            }

                        </View>

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
