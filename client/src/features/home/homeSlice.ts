import { createSlice } from "@reduxjs/toolkit"

export const homeSlice = createSlice({
    name: 'screen',
    initialState: {
      fullscreen: true
    },
    reducers: {
      setscreen: (state) => {
        state.fullscreen = !state.fullscreen
      },
    }
  })
  
  export const { setscreen } = homeSlice.actions