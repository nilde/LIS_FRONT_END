/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React, { Component} from 'react';
import App from '../App';
import renderer from 'react-test-renderer';


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

  // Comprobar que la funcio manageGetPhone retorna un telefon
  it('should manageGetPhone', () => {
    app.manageGetPhone();
    expect(app.state.phone).toBeGreaterThan(0);
  });

  // Comprobar que el modal es tenca correctament
  it('should closModalVisible', () => {
    app.closeModalVisible("Details", null, null);
    expect(app.state.visibleModalDetails).toBeFalsy();
  });

})




