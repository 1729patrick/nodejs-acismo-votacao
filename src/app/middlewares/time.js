export default (req, res, next) => {
  const date = new Date().getTime();

  const startDate = new Date().setHours(
    process.env.START_HOUR,
    process.env.START_MINUTE
  );
  const endDate = new Date().setHours(
    process.env.END_HOUR,
    process.env.END_MINUTE
  );

  // console.log(new Date(date), new Date(startDate), new Date(endDate));

  if (date > startDate && date < endDate) {
    return next();
  }

  return res.json({
    error:
      'Aconteceu algum problema, horário de votação é das 19:00hrs às 21:30hrs',
  });
};
