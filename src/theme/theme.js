import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    typography:{
        useNextVariants:true
    },
    palette:{
        primary:{
            main:'#10A75F'
        },
        common:{
            white:'#FFFFFF'
        },
        secondary:{
            main:'#e53935'
        }
    },
    spacing:10
})

export default theme;