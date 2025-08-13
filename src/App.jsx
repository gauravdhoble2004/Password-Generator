import { useState, useCallback, useMemo } from 'react'

function App() {
  const [length, setLength] = useState(10)
  const [num, setNum] = useState(false)
  const [char, setChar] = useState(false)
  const [pass, setPass] = useState("")
  const [copied, setCopied] = useState(false)

  const passGenerator = useCallback(() => {
    let password = ""
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (num) chars += "0123456789"
    if (char) chars += "@$&*+-~"

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length)
      password += chars.charAt(randomIndex)
    }
    setPass(password)
    setCopied(false)
  }, [length, num, char])

  const handleCopy = async () => {
    if (!pass) return
    try {
      await navigator.clipboard.writeText(pass)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      alert("Copy failed")
    }
  }

  const strength = useMemo(() => {
    let score = 0
    if (length >= 8) score++
    if (length >= 12) score++
    if (num) score++
    if (char) score++

    if (score <= 1) return { label: "Weak", color: "bg-red-500", width: "25%" }
    if (score === 2) return { label: "Medium", color: "bg-yellow-500", width: "50%" }
    if (score === 3) return { label: "Strong", color: "bg-green-500", width: "75%" }
    return { label: "Very Strong", color: "bg-blue-500", width: "100%" }
  }, [length, num, char])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br p-4 border-4 border-black"
     style={{
    backgroundImage: `url("https://images.pexels.com/photos/8721341/pexels-photo-8721341.jpeg")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}>
      {/* <div className="bg-box p-6 sm:p-8 rounded-sm shadow-lg w-full max-w-md 
       border-sky-300 hover:shadow-[0_0_25px_rgba(0,255,255,0.7)]
       transition-all duration-1000 absolute  border-4 
        border-t-cyan-500 border-b-cyan-500  animate-rotateColor
"
> */}
<div className="rotating-border bg-box p-6 sm:p-8 rounded-sm shadow-lg w-full max-w-md 
                hover:shadow-[0_0_25px_rgba(0,255,255,0.7)] transition-all duration-1000 absolute">

        <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-6">
          Password Generator
        </h2>

        {/* Password Display */}
        <div className="flex flex-col sm:flex-row items-stretch gap-2 mb-6">
          <input
            readOnly
            value={pass}
            placeholder="Your password will appear here"
            className="flex-1 px-4 py-2 sm:py-3 rounded-lg bg-black/30 text-white text-base sm:text-lg font-mono border border-white/20 focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 sm:py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            {copied ? "✔" : "📋"}
          </button>
        </div>

        {/* Strength Meter */}
        <div className="mb-6">
          <div className="flex justify-between text-xs sm:text-sm text-white mb-1">
            <span>Strength: {strength.label}</span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded overflow-hidden">
            <div
              className={`${strength.color} h-full transition-all`}
              style={{ width: strength.width }}
            ></div>
          </div>
        </div>

        {/* Length Slider */}
        <label className="block text-white mb-2 text-sm sm:text-base">
          Length: {length}
        </label>
        <input
          type="range"
          min={4}
          max={100}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full mb-6 accent-blue-500"
        />

        {/* Checkboxes */}
        <div className="space-y-3 mb-6 text-sm sm:text-base">
          <label className="flex items-center gap-3 text-white">
            <input type="checkbox" checked={num} onChange={(e) => setNum(e.target.checked)} /> Include Numbers (0-9)
          </label>
          <label className="flex items-center gap-3 text-white">
            <input type="checkbox" checked={char} onChange={(e) => setChar(e.target.checked)} /> Include Symbols (!@#...)
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={passGenerator}
            className="flex-1 py-2 sm:py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
          >
            Generate
          </button>
          <button
            onClick={() => setPass("")}
            className="flex-1 py-2 sm:py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
