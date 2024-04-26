import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { io } from 'socket.io-client'
import Input from './components/Input'


function App() {
 const [score,setScore] = useState({})
 const [scores,setAllScores] = useState([])
 const socket = io('http://localhost:3000');

 function connectSocket(){
    socket.on("connection", (socket)=>{
      console.log(socket);



    });
 }

 useEffect(() => {
   connectSocket();
 }, [])



 function handleInput(event){
  let {name,value} = event.target;
  console.log(event)
  console.log({[name]:value});

  let currentObj = {[name]:value};

  setScore((prev)=> ({...prev,...currentObj}));

 }



 function sendScore(){
 
  socket.emit('scores',score);

  
  socket.on("playerScores", (playerScores)=> {
    console.log(playerScores);
    setAllScores(playerScores);
  });
 }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React Multiplayer Dashboard</h1>
      <Input name='name' className="input-field" placeholder="Enter your name"  handleInput={handleInput}/>
      <Input name='score'className="input-field" placeholder="Enter your score" handleInput={handleInput}/>

      <button className='send-score' onClick={sendScore}> Send Score</button>
      {scores.length>0 ? 
      <table>
      <tbody>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Score</th>

        </tr>
       
       
      {scores.map((score)=>(
          <tr key={score?.id}>
            <td>{score?.id}</td>
            <td>{score.name}</td>
            <td>{score.score}</td>

          </tr>
      ))}
      </tbody>
      
      </table>
      :<></>}
    </>
  )
}

export default App
