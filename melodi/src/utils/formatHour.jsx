export const formatHour = (songs) => {
  const totalSeconds = songs.reduce((total, song) => {
    const [minutes, seconds] = song.duration.split(":").map(Number);
    return total + minutes * 60 + seconds;
  }, 0);

  let totalHours = Math.floor(totalSeconds / 3600);
  let totalMinutes = Math.floor((totalSeconds % 3600) / 60);
  let remainingSeconds = totalSeconds % 60;

  if (remainingSeconds >= 30) {
    totalMinutes += 1;
  }

  if (totalMinutes >= 60) {
    totalMinutes -= 60;
    totalHours += 1;
  }

  if (totalHours === 0) {
    return `${totalMinutes.toString()} minute`;
  }

  const formattedTotalDuration = `${totalHours
    .toString()
    .padStart(2, "0")}:${totalMinutes.toString().padStart(2, "0")}`;

  return formattedTotalDuration;
};
