import { useEffect, useState } from "react";

export default function Time({ isGameStarted, time }) {
    const [seconds, setSeconds] = useState(0); // Initialize seconds to 0
    
    useEffect(() => {
        // Start the timer when the game starts
        if (!isGameStarted) {
          setSeconds(0); 
          return;
        }
        const intervalId = setInterval(() => {
          setSeconds(seconds => seconds + 1); 
        }, 1000)
        return () => clearInterval(intervalId);
      }, [isGameStarted]); 

     
    return (
        <div className="time-game d-flex justify-content-center align-items-center text-danger">
            {seconds.toString().padStart(3, '0')}
        </div>
    );
}

