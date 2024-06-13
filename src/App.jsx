import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass= ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+-[]{}:`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)      
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard =  useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg mt-10 p-4 text-orange-500 bg-gray-700">
      <div className="flex justify-center text-3xl mb-2 font-bold p-4 text-white ">- Password Generator -</div>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
           type="text"
           value={password}
           className='outline-none w-full py-1 px-3'
           placeholder='password'
           readOnly
           ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 hover:bg-blue-500 text-white font-semibold px-3 py-0.5 shrink-0'>Copy</button>
        </div>

        <div className="flex text-sm gap-x-4">
          <div className="flex items-center gap-x-1">
            <input
             type="range"
             min={8}
             max={100}
             value={length}
             className='cursor-pointer ml-4'
             onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
             type="checkbox"
             defaultChecked={numberAllowed}
             id='numberInput'
             onChange={() => setNumberAllowed((prev) => !prev)} 
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
             type="checkbox"
             defaultChecked={charAllowed}
             id='charInput'
             onChange={() => setCharAllowed((prev) => !prev)} 
            />
            <label htmlFor="charInput">Charaters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
