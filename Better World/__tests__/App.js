/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React, { Component} from 'react';
import App from '../App';
import renderer from 'react-test-renderer';
import { RNCamera } from 'react-native-camera/types';


// Test per comprobar totes les funcionalitats implicades en el fitxer App.js
describe('App.js', () =>{
  const app = new App();

  // Comprobar que l'app.js es rendereja correctament
  it('renders correctly', () => {
    renderer.create(<App />);
  });

  // Comprobar que s'han creat correctament les variables en el constructor
  it('should init variables correctly', () => {
    expect(app.state.cameraVisible).toBeFalsy();
    expect(app.state.phone).toEqual("");
    expect(app.state.name).toEqual("");
  });

  it('should loadDataFromServer', () => {
    app.loadDataFromServer();
    expect(app.state.markers.length).toBeGreaterThan(1);x
  })
  // Comprobar que la funcio manageGetPhone retorna un telefon
  it('should manageGetPhone', () => {
    app.manageGetPhone();
    expect(app.state.phone).toBeGreaterThan(0);
  });

  // Comprobar que el modal es tanca correctament
  it('should closModalVisible', () => {
    app.closeModalVisible("Details", null, null);
    expect(app.state.visibleModalDetails).toBeFalsy();
  });
  
  // Comprobar que es rendereja el missatge de benvinguda
  it('should showWelcomeMessage', () => {
    app.showWelcomeMessage()
    expect(app.state.showWelcomeMessage).toBeFalsy();
  });

  // Comprobar que s'activa la camera al fer una foto
  it('should takePicture', () => {
    const camera = new RNCamera();
    app.takePicture(camera);
    expect(camera).toHaveBeenCalled();
  });

  // Comprobar que la funció manageIndexMenu funciona correctament
  it('shoulde manageIndexMenu', () => {
    app.manageIndexMenu(3);
    expect(app.state.cameraVisible).toBeTruthy();
    expect(app.state.indexMenu).ToBeEqual(3);
  });

  // Comprobar els canvis d'estat a l'hora de crear els usuaris
  it('should intermediateUser & intermediateVerification', () => {
    app.intermediateUser();
    expect(app.state.userCreated).ToBeEqual(1);
    app.intermediateVerification();
    expect(app.state.userCreated).ToBeEqual(2);
  });

});




