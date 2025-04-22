import { useEffect, useState } from "react";

export default function Time({ isGameStarted, isGameOver }) {
    const [seconds, setSeconds] = useState(0); // Initialize seconds to 0
    
    useEffect(() => {
        // reset the timer when the game is reset
        if (!isGameStarted) {
          setSeconds(0);
          return () => {}; 
        }
        // Stop timer when the game is not started
        if (isGameOver) {
          return () => {};
        }
        // Start the timer when the game starts
        const intervalId = setInterval(() => {
          setSeconds(seconds => seconds + 1); 
        }, 1000)
        return () => clearInterval(intervalId);
      }, [isGameStarted, isGameOver]); 

     
    return (
        <div className="time-game d-flex justify-content-center align-items-center text-danger">
            {seconds.toString().padStart(3, '0')}
        </div>
    );
}

