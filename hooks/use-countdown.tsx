import { useState, useEffect } from "react";

// Function to calculate the remaining time
const useCountdown = (targetDate: Date) => {
  const calculateTimeLeft = (targetDate: Date) => {
    const currentTime = new Date();
    const timeDifference = Math.max(
      Number(targetDate) - Number(currentTime),
      0
    );

    return {
      days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
    };
  };

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const { days, hours, minutes, seconds } = calculateTimeLeft(targetDate);
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [targetDate]);

  return { days, hours, minutes, seconds };
};

export default useCountdown;
