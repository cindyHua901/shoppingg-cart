import React, { Component , Fragment } from 'react'
import { BrowserRouter, Switch,Route,Redirect } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { SideNav, Header } from './components'
import routes from './routes'
import themes, { overrides } from './themes';

const theme = createMuiTheme({...themes.default, ...overrides});

const navRoutes = routes.filter((route)=>{
    return route.isMenu ===true
})
export default class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    {/* 菜单做成component */}
                    <Header links={navRoutes}/>
                    <Switch>
                        {
                            routes.map((route)=>{
                                return (<Route 
                                            path={route.path} 
                                            key={route.path} 
                                            component={route.component}
                                            exact = {route.exact}
                                        />)
                            })
                        }
                    <Redirect to="/home" from="/" exact/>
                    </Switch>
                </BrowserRouter>
            </MuiThemeProvider>
        )
    }
}
