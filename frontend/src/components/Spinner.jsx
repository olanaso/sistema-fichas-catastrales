import React from 'react'
import styled, { useTheme } from 'styled-components'
import Loader from 'react-loader-spinner'

const LoaderCustom = styled(Loader)`
  width: 140px;
  height: 100px;
  text-align: center;
  position: absolute;
  top: calc(50vh - (/* height */ 100px / 2));
  left: calc(50vw - (/* width */ 140px / 2));
  z-index: 99999;
`
export default function Spinner ({ displaySppiner }) {
  const theme = useTheme()
  return (
    <div>
      {displaySppiner ? (
        <LoaderCustom
          type='Bars'
          color={theme.colors.primary}
          height={70}
          width={200}
          timeout={20000}
        />
      ) : (
        <></>
      )}
    </div>
  )
}
