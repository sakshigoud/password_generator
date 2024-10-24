import React, { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(16);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordgenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += "01234567890";
    if (character) str += "!@#$%^&*<>?/:;";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, character]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password]);

  useEffect(() => {
    passwordgenerator()
  }, [length, number, character, passwordgenerator])
  return (
    <>
      <div className='container my-3'>
        <div className='container-sm' style={{ backgroundColor: 'grey', borderRadius: '20px', height: '150px', width: '500px' }}>
          <h2 className='text-black text-center'>Password Generator</h2>
          <div className="input-group mb-3">
            <input type="text" value={password} className="form-control" ref={passwordRef} placeholder="Password" aria-label="Password" aria-describedby="button-addon2" />
            <button className="btn btn-primary text-white" type="button" id="button-addon2" onClick={copyPassword}>Copy</button>
          </div>
          <div className='input-group my-3'>
            <input type="range" value={length} onChange={(e) => { setLength(e.target.value) }} className="form-range " style={{ width: '120px' }} min="6" max="100" step="0.5" id="customRange3" />
            <label className='px-2 mx-4' htmlFor=""><b>Length:</b>{length}</label>
            <input className="form-check-input my-1" type="checkbox" defaultChecked={number} onChange={() => { setNumber((prev) => !prev) }} aria-label="Checkbox for following text input " />
            <label className='px-2' htmlFor="number"> <b>Number</b></label>
            <input className="form-check-input my-1" type="checkbox" defaultChecked={character} onChange={() => { setCharacter((prev) => !prev) }} value="" aria-label="Checkbox for following text input" />
            <label className='px-2' htmlFor="{character}"><b>Character </b></label>
          </div>
        </div>
      </div >
    </>
  )
}

export default App
