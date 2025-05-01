import { useEffect, useState } from "react";

export default function Time({ isGameStarted, isGameOver }) {
    const [seconds, setSeconds] = useState(0); // Initialize seconds to 1
    
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
        setSeconds(1) // set timer 1 when user start game
        const intervalId = setInterval(() => {
          setSeconds(seconds => seconds + 1); 
        }, 1000)
        return () => clearInterval(intervalId);
      }, [isGameStarted, isGameOver]); 

     
    return (
        <div className="time-game d-flex justify-content-center align-items-center text-danger" id="time">
            {seconds.toString().padStart(3, '0') }
        </div>
    );
}
