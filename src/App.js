import React from 'react'
import { ColorModeContext, useMode, themeSettings } from "./theme"; // Import useMode and themeSettings
import RootNav from './RootNav';
const defaultTheme = createTheme();

const rootNav = () => {
    const [theme, colorMode] = useMode();
  return (
    <div>
      <ThemeProvider theme={createTheme(themeSettings(colorMode.mode))}>
<ColorModeContext.Provider value={colorMode}>
  <RootNav/>
</ColorModeContext.Provider>
    </ThemeProvider>
    </div>
  )
}

export default rootNav
