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
import AppIntroSlider from 'react-native-app-intro-slider';
import ClusteredMapView from 'react-native-maps-super-cluster';
import { Hoshi } from 'react-native-textinput-effects';

import RotatingText from 'react-native-rotating-text'

const COLORS = ["#FF1500", "#00BF6C", "#0074F9","#F9C107"]
const TEXTS = ["Destrozo", "Mejora", "Limpieza","Avería"]
//limipeza azul
//rojo destrozo
//averias amarillo,
//mejoras verde

const slides = [
    {
      key: 'somethun-dos',
      title: 'Paso 1',
      text: 'Descubre problemas',
      image: require('./images/diapo2.png'),
      backgroundColor: '#00BF6C',
    },
    {
      key: 'somethun1',
      title: 'Paso 2',
      text: 'Toma una foto',
        image: require('./images/phone.png'),
      backgroundColor: '#00BF6C',
    },
    {
        key: 'somethun2',
        title: 'Paso 3',
        text: '¡Mejora tu ciudad!',
          image: require('./images/diapo1.png'),
        backgroundColor: '#00BF6C',
      }
  ];

const DAY_MODE=[
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#7c93a3"
            },
            {
                "lightness": "-10"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#a0a4a5"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#62838e"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#dde3e3"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#3f4a51"
            },
            {
                "weight": "0.30"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#bbcacf"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "lightness": "0"
            },
            {
                "color": "#bbcacf"
            },
            {
                "weight": "0.50"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#a9b4b8"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "invert_lightness": true
            },
            {
                "saturation": "-7"
            },
            {
                "lightness": "3"
            },
            {
                "gamma": "1.80"
            },
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#a3c7df"
            }
        ]
    }
]
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

["#FF1500", "#00BF6C", "#0074F9","#F9C107"]

const relations={
    "Destrozo":"#FF1500",
    "Mejora":"#00BF6C",
    "Limpieza":"#0074F9",
    "Avería":"#F9C107"
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
            indexMenu:2,
            cameraVisible:false,
            arrayImages:[],
            expanded:false,
            latitude:0,
            longitude:0,
            showRealApp: true,
            showMap:true


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

    allData.append("x",this.state.latitude.toString())
    allData.append("y",this.state.longitude.toString())
    allData.append("token",this.state.token)
    allData.append("radius",0.10)
        fetch(MARKERS_DIRECTION, {
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
           // body:allData
    
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
                    markers.push({ location: { latitude, longitude }, id: i, color: color, title: title,type:type })
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

 
          navigator.geolocation.watchPosition(
            (position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
              });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }

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

async createPin(active,description){

    var allData= new FormData();
    allData.append("info","PRUEBA_T")
    allData.append("type",TEXTS[active])
    //allData.append("x",(41.38879).toString())
    //allData.append("y",(2.15899).toString())
    allData.append("x",this.state.latitude.toString())
    allData.append("y",this.state.longitude.toString())
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
    const latitude=this.state.latitude;
    const longitude=this.state.longitude;
    await this.setState({ markers: [...this.state.markers, { location:{latitude,longitude}, id: this.state.markers.length, color: this.manageMarkersInfo(this.state.markers.length)[0], title: this.manageMarkersInfo(this.state.markers.length)[1] + " " + (this.state.markers.length + 1),type:TEXTS[active]}], visibleModalCreation : false })
}


manageText(type){
    //if(type=="WB" && `Bienvenido de nuevo, ${this.state.name}`!=this.state.textBox)

       // this.setState({textBox:`Bienvenido de nuevo, ${this.state.name}`})
}


    renderMarker = (marker) => 

                
                /* revisar metodo que se llama al pulsar en el pin */
                <Marker
                    centerOffset={{x:0,y:-8}}
                    coordinate={marker.location}
                    pinColor={marker.color}
                    onSelect={()=>this.setState({visibleModalDetails:true,type:marker.type})}
                    ref={_marker => {this.marker = _marker}}
                >
                <View style={{width:"20%",height:"50%",borderRadius:4,backgroundColor:relations[marker.type],position:"absolute",bottom:"-15%",alignSelf:"center", shadowRadius: 3, shadowOpacity: 0.2, shadowOffset: { height: 1 },shadowColor:relations[marker.type]}}>

</View>

                    {/*cambiar aqui el texto por las imagenes asociadas */}
                    <View style={{ flex: 1, shadowRadius: 3, shadowOpacity: 0.2, shadowOffset: { height: 1 },shadowColor:relations[marker.type], }}>
                        <View style={{ flex: 1, alignSelf: "center", justifyContent: "center", width: 35, height: 28, borderRadius: 40, backgroundColor:relations[marker.type], justifyContent: "center", alignItems: "center" }}>
                            {marker.type=="Avería" &&
                            <Text style={{ color: "#fff", fontSize: 22, fontWeight: "900", textAlign: "center", alignSelf: "center" }}>
                                !
                </Text>
                            }
                            { marker.type=="Mejora" &&
                            <Text style={{position:"absolute",top:"-20%",alignSelf:"center", color: "#fff", fontSize: 30, fontWeight: "700", textAlign: "center", alignSelf: "center" }}>
                                +
                </Text>
                            }
                            { marker.type=="Limpieza" &&
                            <Image style={{position:"absolute",alignSelf:"center",width:"55%",height:"55%",resizeMode:"contain",tintColor:"#fff"}} source={require("./images/clean.png")}></Image>
                            }
                            { marker.type=="Destrozo" &&
                            <Image style={{position:"absolute",alignSelf:"center",width:"50%",height:"50%",resizeMode:"contain",tintColor:"#fff"}} source={require("./images/error.png")}></Image>
                            }

                        </View>
                       
                    </View>
                </Marker>


    


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
                <Button style={{position:"absolute",bottom:"2%",width:"90%",height:"10%",borderWidth:0,alignSelf:"center",justifyContent:"center"}} onPress={()=>{this.setState({showRealApp:false}); this.intermediateVerification()}}>
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
        if(index==2)
        this.setState({cameraVisible:true})
    }


  renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount,
          coordinate = cluster.coordinate,
          clusterId = cluster.clusterId

    const clusteringEngine = this.map.getClusteringEngine(),
          clusteredPoints = clusteringEngine.getLeaves(clusterId, 400)

    return (
      <Marker coordinate={coordinate} centerOffset={{x:0,y:0}} onPress={onPress}>
      

                    {/*cambiar aqui el texto por las imagenes asociadas */}
                    <View style={{ flex: 1, shadowRadius: 3, shadowOpacity: 0.3, shadowOffset: { height: 1 }, }}>
                        <View style={{ flex: 1, alignSelf: "center", justifyContent: "center", width: 35, height: 35, borderRadius: 40, backgroundColor:"#fff", justifyContent: "center", alignItems: "center" }}>


                            <Text style={{position:"absolute",alignSelf:"center", color: "#303030", fontSize: 20, fontWeight: "700", textAlign: "center", alignSelf: "center" }}>
                                {pointCount}
                </Text>
      

                        </View>
                       
                    </View>
      </Marker>
    )
  }

    //TODO:show map screen
    manageContent() {
        if(this.state.userCreated==2){
           // this.showWelcomeMessage()
        return (
            <View style={styles.container}>
               
                <ClusteredMapView
                customMapStyle={(new Date().getHours()>14 ||new Date().getHours()<7)? NIGHT_MODE: DAY_MODE}
               // provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude:(this.state.location!=0 && this.state.latitude!=0)? this.state.latitude :41.390205,
                        longitude:(this.state.location!=0 && this.state.latitude!=0) ? this.state.longitude: 2.154007,
                        latitudeDelta: 0.008,
                        longitudeDelta: 0.008,
                    }}
                    paddingAdjustmentBehavior={"always"}
                    maxZoomLevel={30}
                    data={this.state.markers}
                    style={{ width: "100%", height: "100%" }}
                    showsUserLocation
                    userLocationAnnotationTitle={"Mi posición"}
                    showsCompass={false}
                    ref={(r) => { this.map = r }}
                    renderMarker={this.renderMarker}
                    renderCluster={this.renderCluster}
                    edgePadding={{ top: 10, left: 10, bottom: 10, right: 10} }
                >
                </ClusteredMapView>

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
    
      _renderItem = (item) => {
        return (
          <View style={{flex:1,justifyContent:"center",backgroundColor:item.backgroundColor}} >
            <Text style={{position:"absolute",top:"10%",alignSelf:"center",color:"#fff",fontWeight:"500",fontSize:40,width:"80%",textAlign:"center"}} >{item.title}</Text>
           <View style={{width:wp("70%"),height:wp("70%"),borderRadius:wp("40%"),backgroundColor:"rgba(255,255,255,0.2)",position:"absolute",top:"25%",alignSelf:"center",justifyContent:"center",alignItems:"center"}}>
            <Image style={{width:"70%",height:"70%",resizeMode:"contain",alignSelf:"center"}} source={item.image} />
            </View>
            <Text style={{position:"absolute",top:"70%",alignSelf:"center",textAlign:"center",color:"#fff",fontWeight:"500",fontSize:28}} >{item.text}</Text>

          </View>
        );
      }
      _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        this.setState({ showRealApp: true });
      }

    render() {
        var content = this.manageContent();
        if(this.state.showRealApp)
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
    shadowRadius:4,
    flexDirection:"row",
                }}>
                <View style={{width:"100%",height:"100%",overflow:"hidden",
    borderTopLeftRadius:25,
    borderTopRightRadius:25,flexDirection:"row",justifyContent:"space-between"}}> 
                <Button style={{width:"30%",height:"100%",borderWidth:0}} onPress={()=>this.setState({showMap:false})}> 
                <Image style={{position:"absolute",top:(!this.state.showMap) ? "25%":"30%",width:"30%",height:"30%",resizeMode:"contain",tintColor:(!this.state.showMap) ? "#303030":"gray"}} source={require("./images/menu.png")}/>
               <View style={{position:"absolute",bottom:"22%",alignSelf:"center",width:wp("1.51%"),height:wp("1.52%"),borderRadius:wp("1%"),opacity:(this.state.showMap) ? 0:1,backgroundColor:"#303030"}}/>
                </Button>
                <Button style={{top:0,width:"30%",height:"80%",borderWidth:0}} onPress={()=>this.setState({visibleModalCreation:true})}> 
                    <View style={{width:wp("10%"),height:wp("10%"),borderRadius:wp("5%"),justifyContent:"center",alignItems:"center",}}>
                <Text style={{position:"absolute",alignSelf:"center",color:"#303030",fontSize:36,fontWeight:"500"}}>
            +
        </Text>
        </View>
                </Button>
                <Button style={{width:"30%",height:"100%",borderWidth:0}} onPress={()=>this.setState({showMap:true})}> 
                <Image style={{position:"absolute",top:(this.state.showMap) ? "25%":"30%",width:"30%",height:"30%",resizeMode:"contain",tintColor:(this.state.showMap) ? "#303030":"gray" }} source={require("./images/map.png")}/>
                <View style={{position:"absolute",bottom:"22%",alignSelf:"center",width:wp("1.5%"),height:wp("1.51%"),borderRadius:wp("1.7%"),opacity:(this.state.showMap) ? 1:0,backgroundColor:"#303030"}}/>
                </Button>
                </View>
                
        </View>
    }

    <View style={{width:"100%"}}></View>
    {/**PANTALLA DE PERFIL A PASAR A OTRO LADO */}
    { false &&
    <View style={{position:"absolute",flex:1,width:"100%",height:"100%",backgroundColor:"#fff"}}>
    <Text style={{position:"absolute",top:"10%",left:"8%",fontWeight:"500",fontSize:40}}>
        Perfil
    </Text>

    </View>
    }
    {!this.state.showMap && 
    <View style={{position:"absolute",top:0,width:"100%",height:"100%",backgroundColor:"#fff"}}>
    <Text style={{position:"absolute",top:"7%",left:"8%",fontSize:20,fontWeight:"500",alignSelf:"center",color:"#303030"}}>
    Incidencias reportadas a nivel global
    </Text>
    <Text style={{position:"absolute",top:"12%",left:"8%",fontSize:35,fontWeight:"600",alignSelf:"center",color:"#303030"}}>
    133239
    </Text>
    <Text style={{position:"absolute",top:"19%",left:"8%",fontSize:20,fontWeight:"500",alignSelf:"center",color:"#303030"}}>
    Incidencias solucionadas a nivel global
    </Text>
    <Text style={{position:"absolute",top:"24%",left:"8%",fontSize:32,fontWeight:"600",alignSelf:"center",color:"#303030"}}>
    17320
    </Text>
    <Text style={{position:"absolute",top:"31%",left:"8%",fontSize:20,fontWeight:"500",alignSelf:"center",color:"#303030"}}>
    Incidencias reportadas por tí
    </Text>
    <Text style={{position:"absolute",top:"36%",left:"8%",fontSize:32,fontWeight:"600",alignSelf:"center",color:"#303030"}}>
    11
    </Text>
    <Text style={{position:"absolute",top:"43%",left:"8%",fontSize:20,fontWeight:"500",alignSelf:"center",color:"#303030"}}>
    Incidencias solucionadas gracias a tí
    </Text>
    <Text style={{position:"absolute",top:"48%",left:"8%",fontSize:32,fontWeight:"600",alignSelf:"center",color:"#303030"}}>
    5
    </Text>
    <Text style={{position:"absolute",top:"55%",left:"8%",fontSize:20,fontWeight:"500",alignSelf:"center",color:"#303030"}}>
    Nombre de usuario
    </Text>
    <Text style={{position:"absolute",top:"60%",left:"8%",fontSize:20,fontWeight:"500",alignSelf:"center",color:"gray"}}>
   {this.state.name}
    </Text>
    <Text style={{position:"absolute",top:"67%",left:"8%",fontSize:20,fontWeight:"500",alignSelf:"center",color:"#303030"}}>
    Número de teléfono
    </Text>
    <Text style={{position:"absolute",top:"72%",left:"8%",fontSize:20,fontWeight:"500",alignSelf:"center",color:"gray"}}>
   {this.state.phone}
    </Text>
    <Text style={{position:"absolute",top:"85%",left:"8%",fontSize:14,fontWeight:"500",alignSelf:"center",color:"gray"}}>
   BetterWorld Beta 2019 🗺
    </Text>
    </View>
}
            </View>

        )
        else 
        return  <AppIntroSlider nextLabel={"Siguiente"} doneLabel={"Vamos"} showSkipButton skipLabel={"Saltar"} renderItem={this._renderItem} slides={slides} onDone={this._onDone}/>
        
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