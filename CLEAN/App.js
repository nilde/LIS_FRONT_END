/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Location, TouchableOpacity,Alert, Icon,Image, AsyncStorage,TextInput,Animated } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Button from 'apsl-react-native-button'
import Wave from 'react-native-waveview';
import ModalDetails from './components/Modals/ModalDetails';
import ModalCreation from './components/Modals/ModalCreation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RNCamera } from 'react-native-camera';
import * as Animatable from 'react-native-animatable';
import TabBar from "fluidbottomnavigation-rn";

import { Hoshi } from 'react-native-textinput-effects';

import RotatingText from 'react-native-rotating-text'

const COLORS = ["#CE0202", "#00BF6C", "#0077E8","#E5BD1D"]
const TEXTS = ["Destrozo", "Mejora", "Limpieza","Avería"]
//limipeza azul
//rojo destrozo
//averias amarillo,
//mejoras verde


const NIGHT_MODE=[
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#cdd9f0"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 20
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#1d1d1d"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#888585"
            },
            {
                "weight": "1.00"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffcd11"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#eb9132"
            },
            {
                "lightness": "0"
            },
            {
                "weight": "1.00"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#fef6f6"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 18
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fcaa27"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#363023"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#f9eeee"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "weight": "2.93"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#63646d"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#fffefe"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#124469"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#bfcae5"
            }
        ]
    }
];


const relations={
    "Destrozo":"#CE0202",
    "Mejora":"#3CB500",
    "Limpieza":"#0077E8",
    "Avería":"#E5BD1D"
}


//GET
const MARKERS_DIRECTION = 'https://better-world-api.herokuapp.com/incidences';

//POST
const MARKER_CREATION_DIRECTION= 'https://better-world-api.herokuapp.com/incidence';
const REGISTER_DIRECTION='https://better-world-api.herokuapp.com/register';
const SMS_VERIFICATION_DIRECTION='https://better-world-api.herokuapp.com/verify';


const PendingView = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{position:"absolute",color:"#fff",fontSize:22,fontWeight:"500"}}>Cargando cámara</Text>
    </View>
  );
  

export default class App extends Component {
    constructor(props) {
        super(props);
        this.manageMarkers = this.manageMarkers.bind(this);
        this.manageMarkersInfo = this.manageMarkersInfo.bind(this);
        this.manageGetPhone = this.manageGetPhone.bind(this);
        this.loadDataFromServer = this.loadDataFromServer.bind(this);
        this.closeModalVisible=this.closeModalVisible.bind(this);
        this.createPin=this.createPin.bind(this);
        this.showWelcomeMessage=this.showWelcomeMessage.bind(this);
        this.manageText=this.manageText.bind(this);
        this.manageIntroduceVerificationCode=this.manageIntroduceVerificationCode.bind(this);
        this.manageRegister=this.manageRegister.bind(this);
        this.manageIntroduceVerificationCode=this.manageIntroduceVerificationCode.bind(this);
        this.intermediateUser=this.intermediateUser.bind(this);
        this.intermediateVerification=this.intermediateVerification.bind(this);
        this.manageIndexMenu=this.manageIndexMenu.bind(this);
        this.takePicture=this.takePicture.bind(this);
        this.flip=this.flip.bind(this);
  
   
    

        this.state = {
            markers: [],
            visibleModalCreation: false,
            userCreated:0,
            visibleModalDetails:false,
            positionInScreen: new Animated.ValueXY({ x: wp("15%"), y: hp("-8%") }),
            phone:"",
            name:"",
            termsAccepted:false,
            temporalDescription:"",
            temporalType:"",
            token:"",
            type:"",
            indexMenu:1,
            cameraVisible:false,
            arrayImages:[],
            expanded:false,
            latitude:0,
            longitude:0,


        }
    }


    //Function that manages the recover of the number saved on device
    async manageGetPhone() {
        var phone = await AsyncStorage.getItem("phone")
        if (phone == null) {
            phone = this.state.phone
            AsyncStorage.setItem("phone", phone)
        }
        //this.setState({phone:phone})

    }

    //Function that get the data of the markers from an API
    loadDataFromServer() {
        var allData= new FormData();

    allData.append("x",this.state.temporalCoordinate.latitude.toString())
    allData.append("y",this.state.temporalCoordinate.longitude.toString())
    allData.append("token",this.state.token)
    allData.append("radius",0.10)
        fetch(MARKERS_DIRECTION, {
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body:allData
    
          }).then((response) => {
                return response.json()
            })
            .then((data) => {
                var markers = []
                for (var i = 0; i < data.incidences.length; i++) {
                    var latitude = data.incidences[i].x
                    var longitude = data.incidences[i].y
                    var color = COLORS[0]
                    var title = data.incidences[i].info
                    var type=data.incidences[i].type
                    markers.push({ coordinate: { latitude, longitude }, index: i, color: color, title: title,type:type })
                }

                this.setState({ markers: markers })
            })
    }

    async componentDidMount() {
        this.manageGetPhone();
        this.loadDataFromServer();
        this.manageText("WB")

        var token=await AsyncStorage.getItem("token")
        if(token!=null){

            this.setState({userCreated:2})
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
              });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
          );
            

    }


    //not working yet
    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            position => {

                this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
            },
            error => Alert.alert(error.message)
        );


    }




closeModalVisible(type,active,temporalDescription){
    if(type=="DETAILS")
    this.setState({visibleModalDetails:false})
    else
    this.setState({visibleModalCreation:false})
}

createPin(active,description){

    var allData= new FormData();
    allData.append("info","PRUEBA_T")
    allData.append("type",TEXTS[active])
    //allData.append("x",(41.38879).toString())
    //allData.append("y",(2.15899).toString())
    allData.append("x",this.state.temporalCoordinate.latitude.toString())
    allData.append("y",this.state.temporalCoordinate.longitude.toString())
    allData.append("images","")
    allData.append("token",this.state.token)
    fetch(MARKER_CREATION_DIRECTION, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body:allData

      }).then((response) => response.json())
          .then((responseJson) => {
            return responseJson;
          })
          .catch((error) => {
            console.log(error);
          });
    console.log(TEXTS[active])
    this.setState({ markers: [...this.state.markers, { coordinate: this.state.temporalCoordinate, index: this.state.markers.length, color: this.manageMarkersInfo(this.state.markers.length)[0], title: this.manageMarkersInfo(this.state.markers.length)[1] + " " + (this.state.markers.length + 1),type:TEXTS[active]}], visibleModalCreation : false })
}


manageText(type){
    //if(type=="WB" && `Bienvenido de nuevo, ${this.state.name}`!=this.state.textBox)

       // this.setState({textBox:`Bienvenido de nuevo, ${this.state.name}`})
}


    manageMarkers() {
        return (
            this.state.markers.map((marker, index) => (
               
                
                /* revisar metodo que se llama al pulsar en el pin */
                <Marker
        
                    coordinate={marker.coordinate}
                    pinColor={marker.color}
                    onSelect={()=>this.setState({visibleModalDetails:true,type:marker.type})}
                    ref={_marker => {this.marker = _marker;}}
                >
                    {/*cambiar aqui el texto por las imagenes asociadas */}
                    <View style={{ flex: 1, shadowRadius: 4, shadowOpacity: 0.7, shadowOffset: { height: 1 },shadowColor:relations[marker.type], }}>
                        <View style={{ flex: 1, alignSelf: "center", borderWidth: 3, borderColor: "#fff", justifyContent: "center", width: 35, height: 35, borderRadius: 18, backgroundColor: relations[marker.type], justifyContent: "center", alignItems: "center" }}>
                            {marker.type=="Avería" &&
                            <Text style={{ color: "#fff", fontSize: 22, fontWeight: "900", textAlign: "center", alignSelf: "center" }}>
                                !
                </Text>
                            }
                            { marker.type=="Mejora" &&
                            <Text style={{position:"absolute",alignSelf:"center", color: "#fff", fontSize: 22, fontWeight: "800", textAlign: "center", alignSelf: "center" }}>
                                +
                </Text>
                            }
                            { marker.type=="Limpieza" &&
                            <Image style={{position:"absolute",alignSelf:"center",width:"60%",height:"60%",resizeMode:"contain",tintColor:"#fff"}} source={require("./images/clean.png")}></Image>
                            }
                            { marker.type=="Destrozo" &&
                            <Image style={{position:"absolute",alignSelf:"center",width:"55%",height:"55%",resizeMode:"contain",tintColor:"#fff"}} source={require("./images/error.png")}></Image>
                            }

                        </View>
                    </View>
                </Marker>
            ))
        )
    }


    manageMarkersInfo(index) {
        var calc = index % 4;
        var color = COLORS[calc];
        var text = TEXTS[calc];
        return [color, text]

    }


    //This functions allows the user to make an API call that
    //will send a unique code.
    //Called: OnPress button in first screen of register process.
    //Modifies state: NO

    manageRegister(){
        fetch(REGISTER_DIRECTION, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
    'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                user:{
                username:this.state.name,
                phone:this.state.phone

                }
            })
    
          }).then((response) => response.json())
              .then((responseJson) => {

                console.warn(responseJson)
              })
              .catch((error) => {
                console.log(error);
              });

    }

    //This functions allows the user to make an API call that
    //will send a unique code.
    //Called: OnPress button in first screen of register process.
    //Modifies state: NO

    manageVerificationCode(){
        fetch(SMS_VERIFICATION_DIRECTION, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
    'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                user:{
                smsCode:this.state.verification,
                phone:this.state.phone
                }
            })
    
          }).then((response) => response.json())
              .then((responseJson) => {
                AsyncStorage.setItem("token",responseJson.token)
                console.warn(responseJson)
              })
              .catch((error) => {
                console.log(error);
              });
              
    }

    //TODO:show initial screen
    manageIntroducePhone() {
        return(
            <Animated.View animation={"slideOutLeft"} duration={2000} style={{flex:1,backgroundColor:"#fff",justifyContent:"center"}}>


                <Text style={{position:"absolute",top:"10%",left:"10%",fontSize:40,color:"#303030",fontWeight:"500",alignSelf:"center"}}>
                    Bienvenido
                </Text>
                <Animatable.Text animation={"swing"} iterationCount="infinite" easing="ease-out" duration={2000} style={{position:"absolute",top:"10%",right:"27%",fontSize:40,color:"#303030",fontWeight:"500",alignSelf:"center"}}>
                    👋
                </Animatable.Text>
                <Text style={{position:"absolute",top:"17%",left:"10%",fontSize:28,color:"gray",fontWeight:"500",alignSelf:"center"}}>
                    regístrate para continuar
                </Text>

                <Hoshi
    label={'Nombre de usuario'}
    // this is used as active border color
    borderColor={'#303030'}
    // active border height
    borderHeight={3}
    inputPadding={30}
    labelStyle={{color:"#303030",fontSize:22,fontWeight:"500",padding:-130}}
    labelContainerStyle={{shadowOpacity:0,shadowRadius:0,overflow:"hidden",color:"#303030",padding:-130}}
    inputStyle={{ color: 'gray',shadowOpacity:0 ,overflow:"hidden",fontWeight:"500",fontSize:22}}
    style={{ overflow:"hidden",borderBottomColor:"#303030",borderBottomWidth:2 ,width:"90%",position:"absolute",alignSelf:"center",top:"28%",right:0,height:"7%",borderRadius:0,fontSize:24,padding:-130}}
                
    // this is used to set backgroundColor of label mask.
    // please pass the backgroundColor of your TextInput container.
    onChangeText={(name) => this.setState({name})}
                value={this.state.name}
  />
                

  <Hoshi
    label={'Número de teléfono'}
    // this is used as active border color
    borderColor={'#303030'}
    // active border height
    borderHeight={3}
    inputPadding={30}
    labelStyle={{color:"#303030",fontSize:22,fontWeight:"500",padding:-130}}
    labelContainerStyle={{shadowOpacity:0,shadowRadius:0,overflow:"hidden",color:"#303030",padding:-130}}
    inputStyle={{ color: 'gray',shadowOpacity:0 ,overflow:"hidden",fontWeight:"500",fontSize:22}}
    style={{ overflow:"hidden",borderBottomColor:"#303030",borderBottomWidth:2 ,width:"90%",position:"absolute",alignSelf:"center",top:"48%",right:0,height:"7%",borderRadius:0,fontSize:24,padding:-130}}
                           
    // this is used to set backgroundColor of label mask.
    // please pass the backgroundColor of your TextInput container.
    onChangeText={(phone) => this.setState({phone})}
                value={this.state.phone}
  />




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
        H={hp("17%")}
        waveParams={[
            {A: 20, T: 480, fill: 'rgba(0,0,0,0.01)'},
            {A: 40, T: 440, fill: 'rgba(0,0,0,0.01)'},
            {A: 25, T: 400, fill: 'rgba(0,0,0,0.02)'},
            {A: 10, T: 600, fill: 'rgba(0,0,0,0.02)'},
            {A: 45, T: 720, fill: 'rgba(0,0,0,0.02)'},
            {A: 65, T: 400, fill: 'rgba(0,0,0,0.02)'},
        ]}
        animated={true}
    />



            {!!this.state.name && !!this.state.phone &&
                <Button style={{position:"absolute",bottom:"2%",width:"90%",height:"10%",borderWidth:0,alignSelf:"center",justifyContent:"center"}} onPress={()=>this.intermediateUser()}>
                <Text style={{position:"absolute",bottom:"30%",alignSelf:"center",fontSize:25,fontWeight:"500",color:"#303030"}}>
                    Siguiente
                </Text>
                </Button>
            }
            <View style={{width:"80%",alignSelf:"center",position:"absolute",bottom:"28%",height:"5%",justifyContent:"center",alignItems:"center",flexDirection:"row"}}>

                <Text style={{position:"absolute",left:0,fontSize:14,color:"gray",width:"100%",textAlign:"left",height:"80%"}}>
                    Al registrarte aceptas los términos y condiciones.
                </Text>
                </View>

            </Animated.View>
        )

    }

intermediateUser(){
    this.manageRegister();
    this.setState({userCreated:1})

}

intermediateVerification(){
    this.manageVerificationCode();
    this.setState({userCreated:2})
}

    manageIntroduceVerificationCode() {
        return(
            <View style={{flex:1,backgroundColor:"#fff"}}>
            <Text style={{position:"absolute",top:"10%",left:"10%",fontSize:40,color:"#303030",fontWeight:"500",alignSelf:"center"}}>
                    Ahora
                </Text>
            <Text style={{position:"absolute",top:"17%",left:"10%",fontSize:26,color:"gray",fontWeight:"500",alignSelf:"center",width:"85%"}}>
                    introduce el número de 6 dígitos que te va a llegar por SMS
                </Text>
                <RotatingText
                cursor={false}
                typingInterval ={35}
                style={{position:"absolute",bottom:"34%",left:"10%",alignSelf:"center",fontSize:26,fontWeight:"500",color:"gray"}}
                  
  items={['a tu ciudad, ',"y a todos los que viven en ella."]}
/>
                <Text style={{position:"absolute",bottom:"40%",left:"10%",alignSelf:"center",fontSize:26,fontWeight:"500",color:"#303030"}}>
                  Gracias, ahora podrás ayudar
                </Text>

                <Hoshi
    label={' Código de verificación'}
    // this is used as active border color
    borderColor={'#303030'}
    // active border height
    borderHeight={3}
    inputPadding={30}
    labelStyle={{color:"#303030",fontSize:22,fontWeight:"500",padding:-130}}
    labelContainerStyle={{shadowOpacity:0,shadowRadius:0,overflow:"hidden",color:"#303030",padding:-130}}
    inputStyle={{ color: 'gray',shadowOpacity:0 ,overflow:"hidden",fontWeight:"500",fontSize:22}}
    style={{ overflow:"hidden",borderBottomColor:"#303030",borderBottomWidth:2 ,width:"90%",position:"absolute",alignSelf:"center",top:"34%",right:0,height:"7%",borderRadius:0,fontSize:24,padding:-130}}
                           
    // this is used to set backgroundColor of label mask.
    // please pass the backgroundColor of your TextInput container.
    onChangeText={(verification) => this.setState({verification})}
                value={this.state.verification}
  />
               
       
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
    H={hp("17%")}
        waveParams={[
            {A: 20, T: 480, fill: 'rgba(0,0,0,0.01)'},
            {A: 40, T: 440, fill: 'rgba(0,0,0,0.01)'},
            {A: 25, T: 400, fill: 'rgba(0,0,0,0.02)'},
            {A: 10, T: 600, fill: 'rgba(0,0,0,0.02)'},
            {A: 45, T: 720, fill: 'rgba(0,0,0,0.02)'},
            {A: 65, T: 400, fill: 'rgba(0,0,0,0.02)'},
        ]}
        animated={true}
    />


            {!!this.state.name && !!this.state.verification &&
                <Button style={{position:"absolute",bottom:"2%",width:"90%",height:"10%",borderWidth:0,alignSelf:"center",justifyContent:"center"}} onPress={()=>this.intermediateVerification()}>
                <Text style={{position:"absolute",bottom:"30%",alignSelf:"center",fontSize:25,fontWeight:"500",color:"#303030"}}>
                    Empezar
                </Text>
                </Button>
            }

            </View>
        )

    }


    manageIndexMenu(index){
        this.setState({indexMenu:index})
        if(index==1)
        this.setState({cameraVisible:true})
    }

    //TODO:show map screen
    manageContent() {
        if(this.state.userCreated==2){
           // this.showWelcomeMessage()
        return (
            <View style={styles.container}>
               
                <MapView
                //customMapStyle={NIGHT_MODE}
                //provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude:(this.state.location!=0 && this.state.latitude!=0)? this.state.latitude :41.390205,
                        longitude:(this.state.location!=0 && this.state.latitude!=0) ? this.state.longitude: 2.154007,
                        latitudeDelta: 0.008,
                        longitudeDelta: 0.008,
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

                <View style={{position:"absolute",right:"3%",top:"2%",alignSelf:"center",width:wp("12%"),height:wp("12.1%"),borderRadius:wp("7.1%"),backgroundColor:"#fff",shadowOpacity:0.5,shadowRadius:4,shadowOffset:{height:1},justifyContent:"center",alignItems:"center"}}>

                <Image source={require("./images/check-mark.png")} style={{resizeMode:"contain",width:"40%",height:"40%",tintColor:"gray"}}/>
                </View>
                
        {/** 
                <View style={{ position: "absolute", bottom: "0%", width: "100%", height: "10%", shadowOpacity: 0, shadowRadius: 1, backgroundColor: "#fff", flexDirection: "row",borderTopLeftRadius:30,borderTopRightRadius:30,shadowOpacity:0.08,shadowRadius:8 }}>

                <Button style={{ width: "33%", height: "100%", backgroundColor: "#fff", borderWidth: 0, borderRadius: 0, justifyContent: "center",borderRadius:30 }} onPress={()=>this.manageIndexMenu(1)}>
                <Image source={require("./images/menu.png")} style={{resizeMode:"contain",width:(this.state.indexMenu==1) ? "28%":"23.5%",height:(this.state.indexMenu==1) ? "28%":"23.5%",tintColor:(this.state.indexMenu==1) ? "#303030":"gray",position:"absolute",top:(this.state.indexMenu==1) ? "17%":"20%"}}/>
                        <Text style={{position:"absolute",alignSelf:"center",bottom:"26%",fontWeight:"400",  fontSize:(this.state.indexMenu==1) ? 17: 16,color:(this.state.indexMenu==1) ? "#303030":"gray" }}>
                            Menú
</Text>
                    </Button>
                    <Button style={{ width: "33%", height: "100%", backgroundColor: "#fff", borderWidth: 0, borderRadius: 0, justifyContent: "center",borderRadius:30 }} onPress={()=>this.manageIndexMenu(2)}>
                    <Image source={require("./images/map.png")} style={{resizeMode:"contain",width:(this.state.indexMenu==2) ? "28%":"23.5%",height:(this.state.indexMenu==2) ? "28%":"23.5%",tintColor:(this.state.indexMenu==2) ? "#303030":"gray",position:"absolute",top:(this.state.indexMenu==2) ? "17%":"20%"}}/>
                        <Text style={{ position:"absolute",alignSelf:"center",bottom:"26%",fontWeight:"400",  fontSize:(this.state.indexMenu==2) ? 17: 16,color:(this.state.indexMenu==2) ? "#303030":"gray" }}>
                            Mapa
</Text>
                    </Button>
                    <Button style={{ width: "33%", height: "100%", backgroundColor: "#fff", borderWidth: 0, borderRadius: 0, justifyContent: "center",borderRadius:30 }} onPress={()=>this.manageIndexMenu(3)}>
                    <Image source={require("./images/warning.png")} style={{resizeMode:"contain",width:(this.state.indexMenu==3) ? "28%":"23.5%",height:(this.state.indexMenu==3) ? "28%":"23.5%",tintColor:(this.state.indexMenu==3) ? "#303030":"gray",position:"absolute",top:(this.state.indexMenu==3) ? "17%":"20%"}}/>
                        <Text style={{position:"absolute",alignSelf:"center",bottom:"26%",fontWeight:"400",  fontSize:(this.state.indexMenu==3) ? 17: 16,color:(this.state.indexMenu==3) ? "#303030":"gray" }}>
                            Incidencia
</Text>
                    </Button>
                </View>
                */}



            </View>
        );
                }
    else
    if(this.state.userCreated==1)
    return this.manageIntroduceVerificationCode();
    else
    return this.manageIntroducePhone();
    }


//Funcion que se encarga de gestionar la animacion de aparece una vez el mapa este puesto
    async showWelcomeMessage(){
     
        Animated.sequence([Animated.timing(this.state.positionInScreen, {
    
          toValue: { x: wp("15%") , y:hp("6%") },
        }),
        Animated.timing(this.state.positionInScreen, {
          duration: 2500,
          toValue: { x: wp("15%"), y:hp("6%")  },
        }),
        Animated.timing(this.state.positionInScreen, {
            duration:2000,
          toValue: { x: wp("15%"), y: hp("-8%") },
        })]).start(()=>{
        this.setState({welcomeMessage:false})})

        

    }
    async takePicture(camera) {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);

        var actualArrayImages=this.state.arrayImages;
        actualArrayImages.push(data)

        this.setState({arrayImages:actualArrayImages})
    }

    manageBottomBar(index){
        if(index==1)
        this.setState

    }


    flip() {
        this.setState({
          expanded: !this.state.expanded,
        });
      }
    
      renderFrontface() {
        return (
          <View style={{backgroundColor:"#fff",width:"90%",height:100}} >
          <View style={{backgroundColor:"red",width:"90%",height:100}} />
          <View style={{backgroundColor:"red",width:"90%",height:100}} />
          <View style={{backgroundColor:"red",width:"90%",height:100}} />
              </View>
          
        );
      }
    
      renderBackface() {
        /**
         * You can nest <FoldView>s here to achieve the folding effect shown in the GIF above.
         * A reference implementation can be found in examples/Simple.
         */
        return (
          <View style={{backgroundColor:"#fff",width:"90%",height:100}} >
          <View style={{backgroundColor:"red",width:"90%",height:100}} />
          <View style={{backgroundColor:"red",width:"90%",height:100}} />
          <View style={{backgroundColor:"red",width:"90%",height:100}} />
              </View>
          
        );
      }
    
    

    render() {
        var content = this.manageContent();
 
        return(
            <View style={{flex:1,width:"100%",height:"100%"}}>
                
              {content}  
              <ModalCreation type={this.state.type} arrayImages={this.state.arrayImages} isVisible={this.state.visibleModalCreation} closeModalVisible={this.closeModalVisible} createPin={this.createPin}/>
              <ModalDetails isAdmin={false} type={this.state.type} isVisible={this.state.visibleModalDetails} closeModalVisible={this.closeModalVisible}></ModalDetails>

            { this.state.cameraVisible &&
            <Animatable.View animation="slideInUp" duration={1000} useNativeDriver style={{position:"absolute",width:wp("100%"),height:hp("100%")}}>
                <Button style={{position:"absolute",top:"2%",left:0,width:"25%",height:"8%",zIndex:2}} onPress={()=>{this.setState({cameraVisible:false})}}>
                <Image style={{position:"absolute",alignSelf:"center",width:"40%",height:"40%",resizeMode:"contain",tintColor:"#fff"}} source={require("./images/close.png")}></Image>
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
                <TouchableOpacity onPress={() =>{this.takePicture(camera); this.setState({cameraVisible:false,visibleModalCreation:true})}} style={stylesCamera.capture}>
                <View style={{position:"absolute",alignSelf:"center",width:wp("14%"),height:wp("14%"),borderRadius:wp("7%"),shadowOpacity:0.4,shadowRadius:3,shadowOffset:{"height":2},backgroundColor:"#fff"}}>

                </View>
                </TouchableOpacity>
              </View>

            );
          }}

        </RNCamera>
</Animatable.View>
            }
            {(this.state.userCreated==2) &&this.state.cameraVisible==false &&
            <View style={{
                    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    zIndex:2,
    position:"absolute",
    bottom:0,
    width:"100%",
    height:"8%",
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
    shadowOpacity:0.1,
    shadowRadius:4
                }}>
                <TabBar
          onPress={tabIndex => {
            this.manageIndexMenu(tabIndex)
          }}
          tintColor={"#303030"}
          values={[
            { title: "MENÚ", icon: require("./images/menu.png"),style:{width:"10%"} },
            { title: "", icon: null },
            { title: "MAPA", icon: require("./images/map.png") }
          ]}
        />
        </View>
    }
    {(this.state.userCreated==2) && this.state.cameraVisible==false &&
        <View style={{position:"absolute",bottom:0,width:"100%",height:"2%",backgroundColor:"#fff",zIndex:3}}></View>
    }
    {(this.state.userCreated==2) && this.state.cameraVisible==false &&
        <View style={{justifyContent:"center", position:"absolute",bottom:0,width:120,height:100,borderRadius:60,borderWidth:5,borderColor:"#fff",borderBottomEndRadius:0,borderBottomLeftRadius:0,borderBottomWidth:0, alignSelf:"center",backgroundColor:"#fff", zIndex:5,shadowOpacity:0.2,shadowRadius:3,shadowOffset:{height:1}}}>
        <Button style={{flex:1,borderWidth:0}}>
        <Text style={{position:"absolute",top:"1%",alignSelf:"center",color:"#303030",fontSize:48,fontWeight:"400"}}>
            +
        </Text>
        <Text style={{position:"absolute",bottom:"15%",alignSelf:"center",color:"#303030",fontSize:14,fontWeight:"500"}}>
            NUEVA
        </Text>

        </Button>
        </View>
    }
    {/**PANTALLA DE PERFIL A PASAR A OTRO LADO */}
    { false &&
    <View style={{position:"absolute",flex:1,width:"100%",height:"100%",backgroundColor:"#fff"}}>
    <Text style={{position:"absolute",top:"10%",left:"5%",fontWeight:"500",fontSize:40}}>
        Perfil
    </Text>

    </View>
    }
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
      width:wp("18%"),
      height:wp("18%"),
      borderRadius:wp("9%"),
      justifyContent:"center",
      position:"absolute",
      bottom:"6%"
    },
  });