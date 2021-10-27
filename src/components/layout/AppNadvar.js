import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import { BarSession } from './bar/BarSession'

export const AppNadvar = () => {
    return (
        <div>
            <AppBar position="static">
              <BarSession></BarSession>
            </AppBar>
        </div>
    )
}
