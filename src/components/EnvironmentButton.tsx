import React, { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnviromentButtonProps extends RectButtonProps {
  title: ReactNode;
  active?: boolean;
}

export function EnvironmentButton({ title, active = false, ...rest }: EnviromentButtonProps) {
  return(
    <RectButton 
      style={[
        styles.container,
        rest.style,
        active && styles.containerActive,
      ]}
      {...rest}
    >
      <Text 
        style={[
          styles.text,
          active && styles.textActive,
        ]}
      >
        {title}        
      </Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 76,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: colors.shape,
    marginRight: 4, 
  },

  containerActive: {
    backgroundColor: colors.green_light, 
  },

  text: {
    color: colors.heading,
    fontFamily: fonts.text,
  },

  textActive: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
  }
})