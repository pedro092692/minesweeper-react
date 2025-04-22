import { useEffect, useState } from "react";

export default function Time({isGameStarted}) {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (!isGameStarted){
          setSeconds(0);
          return
        }
        const intervalId = setInterval(() => {
          setSeconds(seconds => seconds + 1); 
        }, 1000)
        return () => clearInterval(intervalId);
      }, [seconds]); 

     
    return (
        <div className="time-game d-flex justify-content-center align-items-center text-danger">
            {seconds.toString().padStart(3, '0')}
        </div>
    );
}