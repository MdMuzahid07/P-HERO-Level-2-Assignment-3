const startEndTimeToHoursCalculate = (startTime: string, endTime: string) => {
  // we splitting the time string in hour and minutes
  const startT = startTime?.split(":");
  const endT = endTime?.split(":");

  // converting startT, and endT hours to minutes
  const startM = parseInt(startT[0]) * 60 + parseInt(startT[1]);
  const endM = parseInt(endT[0]) * 60 + parseInt(endT[1]);

  // calculating minutes difference of startT, and endT after hours to minutes conversion
  const difference = endM - startM;

  // converting minutes to hours after calculate the difference
  const hours = difference / 60;

  return hours;
};

export default startEndTimeToHoursCalculate;
