import React, { useEffect, useState } from 'react'
import './Timer.css'
const Timer = () => {
    const [time, setTime] = useState('0:0:0');
    const [starttime, setStarttime] = useState(false);

    const parsetime = (TimeString) => {
        const [hour, minutes, seconds] = TimeString.split(':').map((part)=> parseInt(part, 10));
        return{hour : isNaN(hour) ? 0 : hour, minutes : isNaN(minutes) ? 0 : minutes, seconds: isNaN(seconds) ? 0 : seconds};
    }
    const handlestartbtn = () => {
        const {hour, minutes, seconds} = parsetime(time);
        if (hour > 0 ||minutes > 0 || seconds > 0){
            setStarttime(true);
        }
    }
    const handleinputchange = (e) => {
        setTime(e.target.value);
    }
    const handleclearbtn = () => {
        setStarttime(false);
        setTime('0:0:0');
    } 
    useEffect(() => {
        const {hour, minutes, seconds} = parsetime(time);
            if (starttime && (hour > 0 ||minutes > 0 || seconds > 0)){
                const interval = setInterval(() => {
                    setTime((prevTime) =>{
                        let {hour,  minutes, seconds } = parsetime(prevTime);
                        if (seconds=== 0) {
                            if (minutes===0){
                                if (hour === 0){
                                    setStarttime(false);
                                    return('0:0')
                                }
                                hour -= 1;
                                minutes = 59;
                            }
                            minutes -= 1;
                            seconds = 59;
                    }else{
                        seconds -= 1;
                    }
                    return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                });
                },1000)
                return () => clearInterval(interval);
            }
        }, [starttime, time]);
  return (
    <div className='timer'>
        <div className="head">
            <h1>Timer</h1>
            <h2>Start Your Time</h2>
        </div>
        <div className="watch">
            <input 
                value={time} 
                onChange={handleinputchange}
                type="text"         
                placeholder='HH:MM:SS'
                pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
            />
            <h1>{time !== '' ? time : '0:0:0'}</h1>
            <div className="btns">
                {starttime ? (
                    <button onClick={() => setStarttime(false)}>Stop</button>
                ) : (
                    <button onClick={handlestartbtn}>Start</button>

                )
                }
            
            <button onClick={handleclearbtn} >Clear</button>
            </div>
        </div>
    </div>
  )
}

export default Timer
