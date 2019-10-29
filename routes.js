import React, { Component } from 'react'
import { Router, Scene } from 'react-native-router-flux'
import { Actions } from 'react-native-router-flux';

import Demo from './form';



const Routes = () => (
    <Router>
        <Scene key="root">

            <Scene key="dd" initial={true} component={Demo} hideNavBar={true} /> 

     
            


            </Scene>


    </Router>
)

export default Routes;