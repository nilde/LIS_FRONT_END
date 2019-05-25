import 'react-native';
import React, { Component} from 'react';
import ModalDetails from '../components/Modals/ModalDetails';
import renderer from 'react-test-renderer';


describe('ModalDetails', () => {
  const modalDetails = new ModalDetails()

  it('renders correctly', () => {
    renderer.create(<App />);
  });

  it('should init variables correctly', () => {
    expect(modalDetails.state.heart).toBeFalsy();
    expect(modalDetails.state.likes).toBeEqual(177);
    expect(modalDetails.state.actualState).toBeEqual(0);
    expect(modalDetails.state.idIncidence).ToBe("122ff364");
    expect(modalDetails.state.flagStatus).toBeFalsy();
  });

  // Comprobar la funcionalitat de la funcio manageLike
  it('should manageLike', () => {
    modalDetails.state.heart = true;
    modalDetails.state.likes = 12;
    modalDetails.manageLike();
    expect(modalDetails.state.heart).toBeFalsy();
    expect(modalDetails.state.likes).toBeLessThan(12);

    modalDetails.state.heart = false;
    modalDetails.manageLike();
    expect(modalDetails.state.heart).toBeTruthy();
    expect(modalDetails.state.likes).toBeGreaterThan(12);
  });
});

