import React, { useCallback, useEffect, useRef, useState } from 'react'
import debounce from "lodash.debounce"
import './App.css'
import { AiOutlineClose } from 'react-icons/ai'

const App: React.FC = () => {

  const [inputValue,setInputValue] = useState('')
  const [search,setSearch] = useState('')
  const [responseCity,setResponseCity] = useState('')
  const [temp,setTemp] = useState('')
  const [localTime,setLocalTime] = useState()
  const [weatherImg,setWeatherImg] = useState()
  const [error,setError] = useState('')
  const firstRender = useRef(true)

  const debounceFunc = useCallback(
    debounce((str:string)=>{
      setSearch(str)
    }, 1200),[])

  const onChangeInputValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    debounceFunc(e.target.value)
  },[])

  const onResetInput = () => {
    setInputValue('')
    setSearch('')
  }

  useEffect(()=>{
    setResponseCity('')
    setError('')
    if(!firstRender.current && search !== ''){
      fetch(`https://api.weatherapi.com/v1/current.json?key=5279003b192d475ab1b210641230503&q=${search}`)
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
    <input
    className={`inputField ${error && search !== '' && 'errorInput'} ${responseCity !== '' && 'okInput'}`}
    value={inputValue}
    placeholder='Enter a location...'
    onChange={onChangeInputValue}
    />
    {inputValue !== '' && <AiOutlineClose onClick={onResetInput}/>}

    {error !== '' && <div className='errorContainer'>{error}</div>}
    {search && error === '' && <div className='infoContainer'>
      In <span className='searchText'>{responseCity}</span> <span className='tempText'>{temp} °C</span> by the local time <span className='timeText'>{localTime}</span>
      <img src={'https:' + weatherImg} alt='img'></img>
      </div>}
    </div>
    
  )
}

export default App