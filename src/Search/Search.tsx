import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import debounce from "lodash.debounce"
import { useCallback } from 'react'

interface ISearchProps{
    error:string,
    search:string,
    responseCity:string,
    setSearch:Function
}

const Search: React.FC<ISearchProps> = ({error,search,responseCity,setSearch}) => {
    const [inputValue,setInputValue] = useState('')

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

  return (
    <div className='searchContainer'>
        <input
        className={`inputField ${error && search !== '' && 'errorInput'} ${responseCity !== '' && 'okInput'}`}
        value={inputValue}
        placeholder='Enter a location...'
        onChange={onChangeInputValue}
        />
        {inputValue !== '' && <AiOutlineClose className='resetInput' onClick={onResetInput}/>}
    </div >
    
  )
}

export default Search