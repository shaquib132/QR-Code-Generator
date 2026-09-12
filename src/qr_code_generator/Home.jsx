import React, { useState } from "react";
import QRCode from 'qrcode'
import jsQR from 'jsqr'
function Home() {
  const [text, setText]=useState("")
  const [qrDataUrl, setQrDataUrl] = useState("")

  const [ScannedResult, setScannedResult] = useState("")

  const generateQR = async()=>{
    try{
      const url =await QRCode.toDataURL(text)
      setQrDataUrl(url)
    }catch(err){
      console.log(err)
    }
  }

  const handleFileUpload=(e)=>{
    const file = e.target.files[0]
    if(!file) return

    const img=new Image()
    img.src = URL.createObjectURL(file)

    img.onload=()=>{
        const canvas = document.createElement("canvas")
        canvas.witdh=img.width
        canvas.height=img.height
        const ctx=canvas.getContext("2d")
        ctx.drawImage(img,0,0)
         
        const imgData = ctx.getImageData(0,0,canvas.width,canvas.height)
        const code = jsQR(imgData.data,canvas.width,canvas.height)
        if(code) setScannedResult(code.data)
          else setScannedResult("np qr code found")
      }
    
  }

  const downloadQR =()=>{
    if(!qrDataUrl) return
    const link = document.createElement("a")
    link.href=qrDataUrl
    link.download="QR-Code.png"
    link.click()
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-3">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 ">
        QR Code Generator
      </h1>
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mb-8 text-center">
        <h2 className="text-xl font-bold mb-4">Generate QR code</h2>
        
        <input
          className="border border-blue-600 rounded-xl p-2 w-full mb-4"
          placeholder="Enter text or url" type="text" value={text}
          onChange={(e)=>setText(e.target.value)}
        ></input>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 " 
        onClick={generateQR}
        >
          Generate QR
        </button>
        <img src={qrDataUrl} className="mx-auto mb-2"></img>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={downloadQR}>Download QR</button>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-4">Scan QR code</h2>
        <input
          className="border border-gray-300 rounded-lg p-2 w-full mb-4"
          type="file" accept="image/*"
          onChange={handleFileUpload}
        ></input>
        <p className="text-green-600 font-bold braek-words">Scanned Result:-<a href="{ScannedResult}" className="text-red-600 font-bold">"{ScannedResult}"</a></p>
      </div>
    </div>
  );
}

export default Home;
