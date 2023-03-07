import React, {  useEffect, useRef, useState } from 'react'
import Search from '../Search/Search'


const App: React.FC = () => {

  const [search,setSearch] = useState('')
  const [responseCity,setResponseCity] = useState('')
  const [temp,setTemp] = useState('')
  const [localTime,setLocalTime] = useState()
  const [weatherImg,setWeatherImg] = useState()
  const [error,setError] = useState('')
  const firstRender = useRef(true)

  

  useEffect(()=>{
    setResponseCity('')
    setError('')
    if(!firstRender.current && search !== ''){
      fetch(`https://api.weatherapi.com/v1/current.json?key=5279003b192d475ab1b210641230503&q=${search}&lang=ru`)
      .then(res => {if(!res.ok){
            setError('No matching location found')
          }else {
            return res.json()
          }
        }
      )
    .then(res => {
      setTemp(res.current.temp_c)
      setLocalTime(res.location.localtime)
      setWeatherImg(res.current.condition.icon)
      setResponseCity(res.location.name)
    })
    }
    firstRender.current = false 
  },[search])

  return (
    <div className='appContainer'>
    <Search error={error} search={search} responseCity={responseCity} setSearch={setSearch} />

    {error !== '' && <div className='errorContainer'>{error}</div>}
    {search && error === '' && <div className='infoContainer'>
      In <span className='searchText'>{responseCity}</span> <span className='tempText'>{temp} °C</span> by the local time <span className='timeText'>{localTime}</span>
      <img src={'https:' + weatherImg} alt='img'></img>
      </div>}
    </div>
    
  )
}

export default App