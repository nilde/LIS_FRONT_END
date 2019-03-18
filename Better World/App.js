/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Location, TouchableOpacity, Icon,Image, AsyncStorage,TextInput } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Modal from "react-native-modal";
import Button from 'apsl-react-native-button'
import Wave from 'react-native-waveview';
import ModalDetails from './components/ModalDetails';
import ModalCreation from './components/ModalCreation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const COLORS = ["#E52727", "#08C921", "#4F23D3"]
const TEXTS = ["Problema", "Mejora", "Limpieza"]

const MARKERS_DIRECTION = 'http://localhost:3000/pin';

const ANCHOR = { x: 0.5, y: 0.5 };
export default class App extends Component {
    constructor(props) {
        super(props);
        this.manageMarkers = this.manageMarkers.bind(this);
        this.manageMarkersInfo = this.manageMarkersInfo.bind(this);
        this.manageGetPhone = this.manageGetPhone.bind(this);
        this.loadDataFromServer = this.loadDataFromServer.bind(this);
        this.closeModalVisible=this.closeModalVisible.bind(this);
        this.createPin=this.createPin.bind(this);

        this.state = {
            markers: [],
            visibleModalCreation: false,
            userCreated:false,
            visibleModalDetails:false
        }
    }

    //Function that manages the recover of the number saved on device
    async manageGetPhone() {
        var phone = await AsyncStorage.getItem("phone")
        if (phone == null) {
            phone = this.state.phone
            AsyncStorage.setItem("phone", phone)
        }

    }

    //Function that get the data of the markers from an API
    loadDataFromServer() {
        fetch(MARKERS_DIRECTION)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                var markers = []
                for (var i = 0; i < data.pins.length; i++) {
                    var latitude = data.pins[i].x
                    var longitude = data.pins[i].y
                    var color = COLORS[0]
                    var title = data.pins[i].info
                    markers.push({ coordinate: { latitude, longitude }, index: i, color: color, title: title })
                }

                this.setState({ markers: markers })
            })
    }

    componentDidMount() {
        this.manageGetPhone();
        this.loadDataFromServer();

    }


    //not working yet
    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            position => {

                this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
            },
            error => Alert.alert(error.message)
        );
        navigator.geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position);
                this.setState({ location });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );

    }


    //TODO:


closeModalVisible(type){
    console.warn(type)
    if(type=="DETAILS")
    this.setState({visibleModalDetails:false})
    else
    this.setState({visibleModalCreation:false})
}

createPin(){
    this.setState({ markers: [...this.state.markers, { coordinate: this.state.temporalCoordinate, index: this.state.markers.length, color: this.manageMarkersInfo(this.state.markers.length)[0], title: this.manageMarkersInfo(this.state.markers.length)[1] + " " + (this.state.markers.length + 1) }], visibleModalCreation : false })
}


    manageMarkers() {
        return (
            this.state.markers.map((marker, index) => (


                /* revisar metodo que se llama al pulsar en el pin */
                <Marker
                    anchor={ANCHOR}
                    coordinate={marker.coordinate}
                    title={marker.title}
                    pinColor={marker.color}
                    onSelect={()=>this.setState({visibleModalDetails:true})}
                    ref={_marker => {this.marker = _marker;}}
                >
                    {/*cambiar aqui el texto por las imagenes asociadas */}
                    <View style={{ flex: 1, shadowRadius: 2, shadowOpacity: 0.4, shadowOffset: { height: 1 }, marginTop: "-140%" }}>
                        <View style={{ flex: 1, alignSelf: "center", borderWidth: 3.5, borderColor: "#fff", justifyContent: "center", width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS[marker.index % 3], justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "#fff", fontSize: 14, fontWeight: "900", textAlign: "center", alignSelf: "center" }}>
                                !
                </Text>
                            <View style={{ height: "70%", width: "18%", position: "absolute", alignSelf: "center", bottom: "-70%", backgroundColor: "#fff", borderRadius: 5 }}></View>
                            <View style={{ height: "14%", width: "30%", position: "absolute", alignSelf: "center", bottom: "-86%", backgroundColor: "#000", opacity: 0.2, borderRadius: 10 }}></View>

                        </View>
                    </View>
                </Marker>
            ))
        )
    }


    manageMarkersInfo(index) {
        var calc = index % 3;
        var color = COLORS[calc];
        var text = TEXTS[calc];
        return [color, text]

    }

    //TODO:show initial screen
    manageIntroducePhone() {
        return(
            <View style={{flex:1,backgroundColor:"#fff"}}>
                <Text style={{position:"absolute",top:"15%",fontSize:40,color:"#303030",fontWeight:"500",alignSelf:"center"}}>
                    Bienvenido
                </Text>
                <TextInput 
                style={{width:"80%",backgroundColor:"#EDEDED",position:"absolute",alignSelf:"center",top:"28%",height:"8%",borderRadius:80,fontSize:24 ,shadowOpacity:0,shadowColor:"#E0E0E0",shadowRadius:4,shadowOffset:{height:1},textAlign:"center"}}
                selectionColor={"#303030"}
                onChangeText={(identifier) => this.setState({identifier})}
                value={this.state.identifier}
                autoFocus
                />
                <Text style={{position:"absolute",top:"39%",fontSize:16,color:"#8E8E8E",fontWeight:"500",alignSelf:"center",width:"80%",textAlign:"center"}}>
                    Introduce tu dirección de correo electrónico o tu número de teléfono para continuar.
                </Text>

            <Wave
        ref={ref=>this._waveRect = ref}
        style={{ width: "100%",
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
    position: "absolute",
    bottom: 0,
    zIndex: 0,

    shadowOpacity: 0,
    shadowRadius: 30,
    shadowOffset: { width: 3, height: 0 }}}
        H={160}
        waveParams={[
            {A: 20, T: 480, fill: 'rgba(27,181,52,0.1)'},
            {A: 40, T: 440, fill: 'rgba(27,181,52,0.1)'},
            {A: 25, T: 400, fill: 'rgba(27,181,52,0.2)'},
            {A: 10, T: 600, fill: 'rgba(27,181,52,0.2)'},
            {A: 45, T: 720, fill: 'rgba(27,181,52,0.4)'},
            {A: 65, T: 400, fill: 'rgba(27,181,52,0.05)'},
        ]}
        animated={true}
    />

            {!!this.state.identifier &&
                <Button style={{position:"absolute",bottom:"3%",width:"90%",height:"10%",borderWidth:0,alignSelf:"center",}} onPress={()=>this.setState({userCreated:true})}>
                    <Text style={{color:"#fff",fontWeight:"600",fontSize:45}}>
                        →
                    </Text>
                </Button>
            }

            </View>
        )

    }

    //TODO:show map screen
    manageContent() {
        if(this.state.userCreated)
        return (
            <View style={styles.container}>
               
                <MapView
                    initialRegion={{
                        latitude: 41.390205,
                        longitude: 2.154007,
                        latitudeDelta: 0.722,
                        longitudeDelta: 0.2421,
                    }}
                    paddingAdjustmentBehavior={"always"}
                    maxZoomLevel={30}
                    style={{ width: "100%", height: "100%" }}
                    showsUserLocation
                    location={this.state.locationResult}
                    onLongPress={(e) => this.setState({ visibleModalCreation: true, temporalCoordinate: e.nativeEvent.coordinate })}
                    userLocationAnnotationTitle={"Mi posición"}
                    showsCompass={false}

                >
                    {this.manageMarkers()}
                </MapView>

                <View style={{ position: "absolute", bottom: "0%", width: "100%", height: "10%", shadowOpacity: 0, shadowRadius: 1, backgroundColor: "#fff", flexDirection: "row" }}>
                    <Button style={{ width: "50%", height: "100%", backgroundColor: "#fff", borderWidth: 0, borderRadius: 0, justifyContent: "center" }}>
                        <Text style={{  fontSize: 16 }}>
                            Mapa
</Text>
                    </Button>
                    <Button style={{ width: "50%", height: "100%", backgroundColor: "#fff", borderWidth: 0, borderRadius: 0, justifyContent: "center" }}>
                        <Text style={{  fontSize: 16 }}>
                            Incidencia
</Text>
                    </Button>
                </View>

            </View>
        );

    else
        return this.manageIntroducePhone();


    }




    render() {
        var content = this.manageContent();
        return(
            <View style={{flex:1,width:"100%",height:"100%"}}>
              {content}  
              <ModalCreation isVisible={this.state.visibleModalCreation} closeModalVisible={this.closeModalVisible} createPin={this.createPin}/>
              <ModalDetails isVisible={this.state.visibleModalDetails} closeModalVisible={this.closeModalVisible}></ModalDetails>
            </View>
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
