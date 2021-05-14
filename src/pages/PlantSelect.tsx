import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { Header } from '../components/Header'
import { EnvironmentButton } from '../components/EnvironmentButton';

import { api } from '../services/api';
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function PlantSelect() {
  const [environments, setEnvironments] = useState()

  useEffect(() => {
    async function fetchEnvironmet(){
      const { data } = await api.get('plants_environments')
    }

    fetchEnvironmet()
  },[])
  return (
    <SafeAreaView style={styles.constainer}>
      <Header />

      <View style={styles.content}>
        <Text
          style={styles.title}
        >
          Em qual ambiente
        </Text>
        <Text
          style={styles.subtitle}
        >
          você quer colocar sua planta?
        </Text>
      </View>

      <View>
        <FlatList 
          data={[1,2,3,4,5,6]}
          renderItem={() => (
            <EnvironmentButton
              title="Cozinha"
              active
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
    backgroundColor: colors.background
  },

  content: {
    marginTop: 40,
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },

  subtitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    lineHeight: 20,
    color: colors.heading,
  },

 environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginTop: 32
  }
})