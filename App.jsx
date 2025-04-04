import {useState} from "react";
import axios from 'axios'; //module js
import { LoaderCircle } from "lucide-react";
function App(){
  const [textInput, setTextInput] = useState("") //value which will be hold in textbox
  const [selectValue, setSelectValue] = useState("") //value which will be select
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false) //initially false
 console.log(textInput);
 console.log(selectValue);
  const handleTextTranslation = async () =>{
    setLoading(true)
    try{

const options = {
  method: 'POST',
  url: 'https://google-translator9.p.rapidapi.com/v2',
  headers: {
    'x-rapidapi-key': '6a16abb6f7msh0843b21fd5e7cb6p18f5cdjsn0eb5e5255899',
    'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    q: `${textInput}`,
    source: 'en',
    target: `${selectValue}`,
    format: 'text'
  }
};


	const response = await axios.request(options);
  setLoading(false)
	console.log(response.data?.data?.translations?.[Number(0)].translatedText);
  setResult(response.data?.data?.translations?.[Number(0)].translatedText);
} catch (error) {
  setLoading(false)
	console.error(error);
}

}
   return(
    <div className="h-screen w-screen bg-slate-200 flex align-center justify-center">
      <div className="flex items-center 
      justify-center flex-col gap-y-10 ">
          <h1 className=" text-3xl text-zinc-700 font-bold">Text Translator</h1>
          <div className="flex items-center justify-center flex-col gap-y-5">
            <textarea name="inpur-text" className="bg-white h-30 w-[500px] 
            border border-slate-700 outline-none rounded-lg text-lg px-5 py-2" onChange={(e) =>setTextInput(e.target.value)}></textarea>
            <textarea name="inpur-text" className="bg-white h-30 w-[500px]
             border border-slate-700 outline-none rounded-lg text-lg px-5 py-2" value={result} readOnly ></textarea>
          </div>
          <div>
            <label  htmlFor="options">Converted Into : </label>
            <select name="value" id="options" className="bg-white px-2 py-1 rounded-lg border
             border-zinc-700 outline-none cursor-pointer" onChange={(e) => setSelectValue(e.target.value)}>
              <option value="">Select</option>
              <option value="hi">Hindi</option>
            </select>
          </div>
          <button className="bg-slate-700 text-slate-100
           mx-auto w-[500px] py-2 rounded-lg cursor-pointer flex items-center justify-center" onClick={handleTextTranslation}>
            {
              loading? (<LoaderCircle className="animate-spin"/>) : "Translate"
            }
           </button>
      </div>
        </div>
    
    
    
  )

}




export default App