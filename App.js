import React, { Component } from 'react'

import RegisterPartner from './src/screens/RegisterPartner'
import HomePartner from './src/screens/HomePartner'
import RegisterUser from './src/screens/RegisterUser'

export default class App extends Component {
    render() {
        return (
            // <RegisterUser/>
            <RegisterPartner/>
            // <HomePartner/>
        )
    }
}
