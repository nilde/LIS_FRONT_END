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

const COLORS = ["#CE0202", "#3CB500", "#0077E8","#E5BD1D"]

export default class ModalCreation extends Component {
    constructor(props) {
        super(props);

        this._renderItem=this._renderItem.bind(this);

        this.state = {
            heart: false,
            entries: [{ title: 1 }, { title: 2 }, { title: 3 }, { title: 4 }],
            likes: 322,
            active: -1,
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
            <Modal isVisible={this.props.isVisible}>

                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Button style={{ alignSelf: "center", position: "absolute", top: "4.1%", backgroundColor: "#fff", width: wp("18%"), height: wp("18.1%"), borderRadius: wp("12%"), justifyContent: "center", borderWidth: 0 }} onPress={() => this.props.closeModalVisible("CREATION")}>
                        <Image style={{ width: "33%", height: "33%", resizeMode: "contain", tintColor: "#303030", alignSelf: "center" }} source={require("../../images/close.png")} />
                    </Button>

                    <View style={{ position: "absolute", bottom: "-4%", alignSelf: "center", backgroundColor: "#fff", width: wp("100%"), height: hp("85%"), borderRadius: 20, overflow: "hidden", paddingTop: "5%" }}>


                        <Button isDisabled={this.state.active<0} style={{ alignSelf: "center", position: "absolute", bottom: "8%", width: "90%", height: "12%", backgroundColor: "#303030", borderWidth: 0, borderRadius: 3 }} onPress={() =>{this.setState({index:-1}); this.props.createPin(this.state.active,this.state.description)}}>
                            <Text style={{ color: "#fff", fontWeight: "600", alignSelf: "center", fontSize: 23 }}>
                                Crear incidencia
            </Text>
                        </Button>

                        <View style={{ width: "95%", height: "25%", alignSelf: "center", position: "absolute", top: "32%" }}>
                            <View style={{ flexDirection: "column", justifyContent: "center" }}>
                                <Text style={{ alignSelf: "center", fontSize: 26, color: "#303030",fontWeight:"500" }}>
                                    Descripción
                                </Text>
                                <Text style={{ alignSelf: "center", fontSize: 12, color: "gray", position: "absolute", right: "13%", bottom: 0 }}>
                                    (opcional)
                                </Text>
                            </View>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: "#B5B5B5", height: "80%", width: "95%", alignSelf: "center", borderRadius: 5, marginTop: "5%" }}
                                {...this.props}
                                editable={true}
                                maxLength={140}
                                multiline={true}
                                numberOfLines={4}
                                onChangeText={(description) => this.setState({description})}
                                value={this.state.description}
                            />
                        </View>


                        <View style={{ position: "absolute", top: "5%", width: "100%", height: "25%"}}>
                            <Text style={{ alignSelf: "center", fontSize: 26, color: "#303030",marginBottom:"5%",fontWeight:"500" }}>
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


                        <View style={{ width: "95%", height: "25%", alignSelf: "center", position: "absolute", bottom: "16%" }}>
                            <Text style={{ alignSelf: "center", fontSize: 26,fontWeight:"500" }}>
                                Categoría
                                </Text>
                            <View style={{ width: "100%", height: "50%", flexDirection: "row", justifyContent: "space-around",position:"absolute",top:"25%" }}>
                                <Button style={{ width: "20%", alignSelf: "center", height: "45%", borderRadius: 3, backgroundColor: (this.state.active == 0) ? COLORS[0] : "#fff", borderColor: COLORS[0], borderWidth: 1 }} onPress={() => this.setState({ active: 0 })}>
                                    <Text style={{ color: (this.state.active == 0) ? "#fff" : COLORS[0], fontSize: 16,fontWeight:"500" }}>
                                        Destrozo
</Text>
                                </Button>
                                <Button style={{ width: "20%", alignSelf: "center", height: "45%", borderRadius: 3, backgroundColor: (this.state.active == 1) ? COLORS[1] : "#fff", borderColor: COLORS[1], borderWidth: 1 }} onPress={() => this.setState({ active: 1 })}>
                                    <Text style={{ color: (this.state.active == 1) ? "#fff" : COLORS[1], fontSize: 16,fontWeight:"500"  }}>
                                        Mejora
</Text>
                                </Button>
                                <Button style={{ width: "20%", alignSelf: "center", height: "45%", borderRadius: 3, backgroundColor: (this.state.active == 2) ? COLORS[2] : "#fff", borderColor: COLORS[2], borderWidth: 1 }} onPress={() => this.setState({ active: 2 })}>
                                    <Text style={{ color: (this.state.active == 2) ? "#fff" : COLORS[2], fontSize: 16,fontWeight:"500"  }}>
                                        Limpieza
</Text>
                                </Button>
                                <Button style={{ width: "20%", alignSelf: "center", height: "45%", borderRadius: 3, backgroundColor: (this.state.active == 3) ? COLORS[3] : "#fff", borderColor: COLORS[3], borderWidth: 1 }} onPress={() => this.setState({ active: 3 })}>
                                    <Text style={{ color: (this.state.active == 3) ? "#fff" : COLORS[3], fontSize: 16,fontWeight:"500"  }}>
                                        Avería
</Text>
                                </Button>



                            </View>

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
