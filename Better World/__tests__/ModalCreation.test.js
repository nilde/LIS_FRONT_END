import 'react-native';
import React, { Component} from 'react';
import ModalCreation from '../components/Modals/ModalCreation';
import renderer from 'react-test-renderer';


describe('ModelCreation', () => {
  const modalCreation = new ModalCreation();

  //Comprobar que es rendereja correctament el component
  it('renders correctly', () => {
    renderer.create(<ModalCreation />);
  });
  
  // Comprobar que les variables s'inicien correctament
  it('should init variables correctly', () => {
    expect(modalCreation.state.heart).toBeFalsy();
    expect(modalCreation.state.active).toBeEqual(-1);
    expect(modalCreation.state.likes).toBeEqual(322);
    expect(modalCreation.state.description).toBe("");
  });

});
