import { useState, useCallback, useEffect, useRef } from "react";
import './App.css'
export default function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed){
      str += "0123456789"
    }
    if(charAllowed){
      str += "!@#$%^&*_"
    }

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClip = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="main-password-box">
        <h1>Password Generator</h1>
        <div className="password-field">
          <input
            type="text"
            value={password} 
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClip}>copy</button>
        </div>

        <div className="">
            <div className="range-box">
              <input
                type="range"
                min = {6}
                max = {20}
                value={length}
                onChange={(e) => {setLength(e.target.value)}}
              />
              <label>Length :{length} </label>
            </div>

            <div className="number-check-box">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={(e) => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>

            <div className="char-check-box">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={(e) => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
        </div>

      </div>
    </>
  )
}

