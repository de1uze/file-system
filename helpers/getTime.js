module.exports = (ptime) => {
  let myDate = new Date(ptime);
  let year = myDate.getFullYear();
  let month = myDate.getMonth();
  let localeMonth;
  switch(month){
    case 0:
      localeMonth = 'января';
    break;
    case 1:
      localeMonth = 'февраля';
    break;
    case 2:
      localeMonth = 'марта';
    break;
    case 3:
      localeMonth = 'апреля';
    break;
    case 4:
      localeMonth = 'мая';
    break;
    case 5:
      localeMonth = 'июня';
    break;
    case 6:
      localeMonth = 'июля';
    break;
    case 7:
      localeMonth = 'августа';
    break;
    case 8:
      localeMonth = 'сентября';
    break;
    case 9:
      localeMonth = 'октября';
    break;
    case 10:
      localeMonth = 'ноября';
    break;
    case 11:
      localeMonth = 'декабря';
    break;
  }
  let date = myDate.getDate();
  return `${date} ${localeMonth} ${year}`;
}
