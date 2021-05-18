import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { api } from '../services/api';
import { Header } from '../components/Header'
import { EnvironmentButton } from '../components/EnvironmentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load'


import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnviromentProps {
  key: string;
  title: string;
}

interface PlantProps {
  id: number,
  name: string,
  about: string,
  water_tips: string,
  photo: string,
  environments: string[],
  frequency: {
    times: number,
    repeat_every: string,
  }
}


export function PlantSelect() {
  const [environments, setEnvironments] = useState<EnviromentProps[]>([])
  const [environmentSelected, setEnvironmentSelected] = useState('all')
  const [plants, setPlants] = useState<PlantProps[]>([])
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const [loadedAll, serLoadedAll] = useState(false)


  function handleEnvironmentSelected(environment: string) {
    setEnvironmentSelected(environment)

    if (environment === 'all') {
      return setFilteredPlants(plants);
    }

    const filtered = plants.filter(plant => (
      plant.environments.includes(environment)
    ))
    setFilteredPlants(filtered)
  }

  async function fetchPlants() {
    //const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}`)
    const { data } = await api.get(`plants`,{
      params: {
        _sort: 'name',
        _order: 'asc',
        _page: page,
        _limit: 6,
      }
    })
    if (!data)
      return setLoading(true)

    if (page > 1) {
      setPlants(oldValues => [...oldValues, ...data])
      setFilteredPlants(oldValues => [...oldValues, ...data])

    } else {
      setPlants(data)
      setFilteredPlants(data)
    }
   
    setLoading(false)
    setLoadingMore(false)
  }

  function handleFetchMore(distance: number) {
    if(distance < 1)
      return;

    setLoadingMore(true)
    setPage(oldValue => oldValue + 1)
    fetchPlants()
  }

  useEffect(() => {
    async function fetchEnvironmet(){
      const { data } = await api.get('plants_environments?_sort=title&_order=asc')
      setEnvironments([
        { key: 'all', title: 'Todos'},
        ...data
      ])
    }

    fetchEnvironmet()
  },[])

  useEffect(() =>{
    

    fetchPlants()
  },[])
  
  if (loading)
    return <Load />
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
          data={environments}
          renderItem={({ item }) => (
            <EnvironmentButton
              title={item.title}
              active={item.key === environmentSelected}
              onPress={() => handleEnvironmentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plantsContainer}>
        <FlatList 
          data={filteredPlants}
          renderItem={ ({ item }) => (
            <PlantCardPrimary data={item} />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => 
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore
            ? <ActivityIndicator color={colors.green}/>
            : <></>
          }
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
    marginLeft: 30,
    marginTop: 32
  },

  plantsContainer: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },

})