import 'react-native';
import React, { Component} from 'react';
import screenOne from '../components/screensRegister/screenOne';
import renderer from 'react-test-renderer';

describe('ModalDetails', () => {
  const screenOne = new screenOne()

  it('renders correctly', () => {
    renderer.create(<screenOne />);
  });

  // Comprovar la inicialització de variables
  it('should init variables correctly', () => {
    expect(screenOne.state.heart).toBeFalsy();
    expect(screenOne.state.likes).toBeEqual(322);
    expect(screenOne.state.actualState).toBeEqual(0);
    expect(screenOne.state.idIncidence).ToBe("122ff364");
  });

  // Comprovar la funcionalitat de la funcio manageLike
  it('should manageLike', () => {
    screenOne.state.heart = true;
    screenOne.state.likes = 12;
    screenOne.manageLike();
    expect(screenOne.state.heart).toBeFalsy();
    expect(screenOne.state.likes).toBeLessThan(12);

    screenOne.state.heart = false;
    screenOne.manageLike();
    expect(screenOne.state.heart).toBeTruthy();
    expect(screenOne.state.likes).toBeGreaterThan(12);
  });
});