import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Button } from '../components/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function UserIdentification() {
  const [isFocused, setIsFocused] = useState(false)
  const [name, setName] = useState('')
  const navigation = useNavigation()

  function handleInputFocus() {
    setIsFocused(!isFocused || !!name)
  }

  function handleInputChange(value: string) {
    setName(value)
  }

  async function handleSubmit() {
    if (!name)
      return Alert.alert('Me diz como chamar você 😥')

    try {
      await AsyncStorage.setItem('@plantmanager:user', name)
      navigation.navigate('Confirmation', {
        title: 'Prontinho!',
        subtitle: 'Agora vamos começar a cuidar de suas plantinhas com muito carinho.',
        buttonTitle: 'Começar',
        icon: 'smile',
        nextScreen: 'PlantSelect'
      })

    } catch {
      Alert.alert('Não foi possivel salvar o teu nome. 😥')
    }
  }

  return(
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={ Platform.OS === 'android' ? 'height' : 'padding' }
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>
                  { !!name ? '😄️' : '😃️'}
                </Text>
                <Text style={styles.title}>
                  Como podemos{'\n'}chamar você?
                </Text>
              </View>
              <TextInput
                style={[styles.input, isFocused && {borderColor: colors.green}]}
                placeholder='Digite um nome'
                onBlur={handleInputFocus}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />
              <View style={styles.footer}>
                <Button
                  title='Confirmar'
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around', 
    paddingTop: Platform.OS === 'android' ? 20 : 0
  },

  content: {
    flex: 1,
    width: '100%',
  },

  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center',
  },

  header: {
    alignItems: 'center'
  },

  emoji: {
    fontSize: 44,
  },

  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
  },

  footer: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20,
  }
})