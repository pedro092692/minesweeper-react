import { useEffect, useState } from "react";

export default function Time() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
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