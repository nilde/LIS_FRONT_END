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
import { RNCamera } from 'react-native-camera';

const PendingView = () => (
    <View
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <Text style={{ position: "absolute", color: "#fff", fontSize: 22, fontWeight: "500" }}>Cargando cámara</Text>
    </View>
);

const relations={
    "Destrozo":"#FF1500",
    "Mejora":"#00BF6C",
    "Limpieza":"#0074F9",
    "Avería":"#F9C107"
}


const COLORS = ["#FF1500", "#00BF6C", "#0074F9", "#F9C107"]

export default class ModalCreation extends Component {
    constructor(props) {
        super(props);
        this.takePicture = this.takePicture.bind(this);
        this._renderItem = this._renderItem.bind(this);

        this.state = {
            heart: false,
            entries: [0, 0, 0, 0],
            likes: 322,
            active: 0,
            description: "",
            cameraVisible: false,
            counterImages:0
        }
    }

    _renderItem({ item, index }) {
        console.warn(item)
        return (
            <View style={{borderWidth:0, backgroundColor: "#fff", alignItems: "center", height: "60%", justifyContent: "center", borderRadius: 10 }}>
            <Image
                    style={{ width: "100%", height: "100%", position: "absolute",bottom:0,resizeMode:"cover",  alignSelf: "center",borderRadius:10 }}
                    source={item}

                    alt={index}
                />
                {this.state.entries[index]==0 &&
            <Button style={{borderWidth:0, backgroundColor: "#fff", alignItems: "center", height: "60%", justifyContent: "center", borderRadius: 10 }} onPress={()=>this.setState({cameraVisible:true})}>

               

                <Text style={{ color:COLORS[this.state.active], fontSize: 48,fontWeight:"600",position:"absolute",top:"22%" }}>
                +
</Text>


<Text style={{ color:COLORS[this.state.active], fontSize: 22,fontWeight:"500",position:"absolute",bottom:"15%" }}>
                Añade una foto
</Text>

    
       
                                 </Button>
                                }
                                 {index!=this.state.entries.length-1 &&
    <View style={{position:"absolute",right:"3%", width: wp("7%"), height: wp("7%"), alignSelf: "center", borderRadius:800,borderWidth:0,backgroundColor:"#fff",justifyContent:"center",alignItems:"center" }} >
                                <Text style={{ color:COLORS[this.state.active], fontSize: 18,fontWeight:"700",position:"absolute" }}>
                                        →
</Text>
    
                                   
                                </View>
    }
   {index!=0 &&
                                <View style={{position:"absolute",left:"3%", width: wp("7%"), height: wp("7%"), alignSelf: "center", borderRadius:800,borderWidth:0,backgroundColor:"#fff",justifyContent:"center",alignItems:"center" }}>
                                <Text style={{ color:COLORS[this.state.active], fontSize: 18,fontWeight:"700",position:"absolute" }}>
                                        ←
</Text>
                                   
                                </View>
                                 }
                                 <View style={{width:wp("6%"),height:wp("6%"),borderRadius:4,backgroundColor:"#fff",position:"absolute",bottom:"3%",right:"3%",alignItems:"center",justifyContent:"center"}}>
            <Text style={{fontWeight:"700",color:COLORS[this.state.active]}}>
                {index+1}
                </Text>
            </View>
            </View>
        );
    }

    async takePicture(camera) {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        console.warn(this.state.counterImages)
        var actualArrayImages = this.state.entries;
        if(this.state.counterImages<4){
            actualArrayImages[this.state.counterImages]=data
         await this.setState({ entries: actualArrayImages,counterImages:this.state.counterImages+1 })
        }
    }


    render() {
        return (
            <Modal isVisible={this.props.isVisible} backdropOpacity={0.9}>

                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Button style={{ alignSelf: "center", position: "absolute", top: "4.1%", backgroundColor: COLORS[this.state.active], width: wp("18%"), height: wp("18.1%"), borderRadius: wp("12%"), justifyContent: "center", borderWidth: 0 }} onPress={() => { this.setState({ active: 0,entries:[0,0,0,0],counterImages:0 }); this.props.closeModalVisible("CREATION") }}>
                        <Image style={{ width: "33%", height: "33%", resizeMode: "contain", tintColor: "#fff", alignSelf: "center" }} source={require("../../images/close.png")} />
                    </Button>

                    <View style={{ position: "absolute", bottom: "-4%", alignSelf: "center", backgroundColor: "#fff", width: wp("100%"), height: hp("85%"), borderRadius: 20, overflow: "hidden", paddingTop: "5%", backgroundColor: COLORS[this.state.active] }}>
                        <Image source={require("../../images/Path.png")} style={{ position: "absolute", bottom: "-75%", resizeMode: "contain", width: wp("100%"), height: hp("100%"), tintColor: "#fff" }} />


                        <Button isDisabled={this.state.active < 0} style={{ alignSelf: "center", position: "absolute", bottom: "4%", width: "90%", height: "12%", backgroundColor: COLORS[this.state.active], borderWidth: 0, borderRadius: 50, shadowColor: COLORS[this.state.active], shadowRadius: 8, shadowOpacity: 0.2, shadowOffset: { height: 1 } }} onPress={() => { this.setState({ active: 0,entries:[0,0,0,0],counterImages:0}); this.props.createPin(this.state.active, this.state.description,this.state.entries) }}>
                            <Text style={{ color: "#fff", fontWeight: "600", alignSelf: "center", fontSize: 23 }}>
                                Crear incidencia
            </Text>
                        </Button>
                        <Text style={{ alignSelf: "center", fontSize: 32, color: "#fff", fontWeight: "500" }}>
                                Imágenes
                                </Text>
                                <View style={{position:"absolute",top:"5%",width:"80%",height:"55%",marginTop:"15%",alignSelf:"center",alignItems:"center",justifyContent:"center"}}>
                             
                <View style={{flex:1,shadowOpacity:0.4,shadowRadius:6,shadowOffset:{height:1}}}>
                    <Carousel
                    layout={'stack'} layoutCardOffset={'9'}
                                    ref={(c) => { this._carousel = c; }}
                                    data={this.state.entries}
                                    renderItem={this._renderItem}
                                    sliderWidth={wp("82%")}
                                    itemWidth={wp("60%")}
                                    style={{ position: "absolute", right: 0 }}
                                />
                            </View>
                        </View>
                        <Animatable.View useNativeDriver animation="bounce" duration={28000} easing="linear" iterationCount="infinite" style={{ position: "absolute", right: "22%", bottom: "32%", width: wp("7%"), height: wp("7%"), borderRadius: wp("5%"), backgroundColor: "#fff" }}></Animatable.View>
                        <Animatable.View useNativeDriver animation="bounce" duration={24000} easing="linear" iterationCount="infinite" style={{ position: "absolute", right: "17%", bottom: "36%", width: wp("3%"), height: wp("3%"), borderRadius: wp("4%"), backgroundColor: "#fff" }}></Animatable.View>
                        <Animatable.View useNativeDriver animation="bounce" duration={20000} easing="linear" iterationCount="infinite" style={{ position: "absolute", left: "20%", bottom: "28%", width: wp("10%"), height: wp("10%"), borderRadius: wp("5%"), backgroundColor: "#fff" }}></Animatable.View>



                        <Button style={{ position: "absolute", bottom: "40%", right: "5%", width: wp("22%"), height: wp("22%"), alignSelf: "center", borderRadius: 800, shadowRadius: 8, borderWidth: 0 }} onPress={() => this.setState({ active: (this.state.active + 1) % COLORS.length })}>
                            <Text style={{ color: "#fff", fontSize: 44, fontWeight: "600", position: "absolute" }}>
                                →
</Text>

                        </Button>
                        <Button style={{ position: "absolute", bottom: "40%", left: "5%", width: wp("22%"), height: wp("22%"), alignSelf: "center", borderRadius: 800, shadowRadius: 8, borderWidth: 0 }} onPress={() => this.setState({ active: (this.state.active - 1 < 0) ? 3 : (this.state.active - 1) % COLORS.length })}>
                            <Text style={{ color: "#fff", fontSize: 44, fontWeight: "600", position: "absolute" }}>
                                ←
</Text>

                        </Button>

                        <View style={{ width: "50%", height: "40%", alignSelf: "center", position: "absolute", bottom: "30%" }}>



                            {this.state.active == 1 &&
                                <View style={{ position: "absolute", bottom: "10%", width: wp("30%"), height: wp("50%"), alignSelf: "center", borderRadius: 800, borderWidth: 0,justifyContent:"center",alignItems:"center" }} onPress={() => this.setState({ active: 1 })}>
                                    <Text style={{ color: "#fff", fontSize: 90, fontWeight: "600", position: "absolute", top: "20%" }}>
                                        +
</Text>
                                    <Text style={{ color: "#fff", fontSize: 24, fontWeight: "500", position: "absolute", bottom: "16%" }}>
                                        Mejora
</Text>
                                </View>

                            }

                            {this.state.active == 2 &&
                                <View style={{ position: "absolute", bottom: "10%", width: wp("30%"), height: wp("50%"), alignSelf: "center", borderRadius: 800, borderWidth: 0,justifyContent:"center",alignItems:"center" }} >
                                    <Image style={{ position: "absolute", top: "30%", width: "38%", height: "38%", resizeMode: "contain", tintColor: "#fff" }} source={require("../../images/clean.png")} />

                                    <Text style={{ color: "#fff", fontSize: 24, fontWeight: "500", position: "absolute", bottom: "16%" }}>
                                        Limpieza
</Text>
                                </View>

                            }
                            {this.state.active == 3 &&
                                <View style={{ position: "absolute", bottom: "10%", width: wp("30%"), height: wp("50%"), alignSelf: "center", borderRadius: 800, borderWidth: 0,justifyContent:"center",alignItems:"center" }} >
                                    <Text style={{ color: "#fff", fontSize: 75, fontWeight: "700", position: "absolute", top: "25%" }}>
                                        !
</Text>

                                    <Text style={{ color: "#fff", fontSize: 24, fontWeight: "500", position: "absolute", bottom: "16%" }}>
                                        Avería
</Text>
                                </View>

                            }

                            {this.state.active == 0 &&
                                <View style={{ position: "absolute", bottom: "10%", width: wp("30%"), height: wp("50%"), alignSelf: "center", borderRadius: 800, borderWidth: 0,justifyContent:"center",alignItems:"center" }} >
                                    <Image style={{ position: "absolute", top: "30%", width: "38%", height: "38%", resizeMode: "contain", tintColor: "#fff" }} source={require("../../images/error.png")} />

                                    <Text style={{ color: "#fff", fontSize: 24, fontWeight: "500", position: "absolute", bottom: "16%" }}>
                                        Destrozo
</Text>
                                </View>

                            }

                        </View>

                    </View>
                </View>

                {this.state.cameraVisible &&
                    <Animatable.View animation="slideInUp" duration={1000} useNativeDriver style={{ position: "absolute", width: wp("102%"), height: hp("100%"),left:"-6%" }}>
                        <Button style={{ position: "absolute", top: "2%", right: 0, width: "25%", height: "8%", zIndex: 2 }} onPress={() => { this.setState({ cameraVisible: false }) }}>
                            <Image style={{ position: "absolute", alignSelf: "center", width: "40%", height: "40%", resizeMode: "contain", tintColor: "#fff" }} source={require("../../images/close.png")}></Image>
                        </Button>
                        <RNCamera
                            style={stylesCamera.preview}
                            type={RNCamera.Constants.Type.back}
                            flashMode={RNCamera.Constants.FlashMode.on}
                            permissionDialogTitle={'Permission to use camera'}
                            permissionDialogMessage={'We need your permission to use your camera phone'}
                        >
                            {({ camera, status, recordAudioPermissionStatus }) => {
                                if (status !== 'READY') return <PendingView />;
                                return (
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => { this.takePicture(camera); this.setState({ cameraVisible: false, visibleModalCreation: true }) }} style={stylesCamera.capture}>
                                            <View style={{ position: "absolute", alignSelf: "center", width: wp("14%"), height: wp("14%"), borderRadius: wp("7%"), shadowOpacity: 0.4, shadowRadius: 3, shadowOffset: { "height": 2 }, backgroundColor: "#fff" }}>

                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                );
                            }}

                        </RNCamera>
                    </Animatable.View>
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

const stylesCamera = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        width: wp("18%"),
        height: wp("18%"),
        borderRadius: wp("9%"),
        justifyContent: "center",
        position: "absolute",
        bottom: "6%"
    },
});