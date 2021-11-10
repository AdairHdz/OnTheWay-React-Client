const weekdayMapper = (weekday: number): string => {
  let weekdayName = "";
  switch (weekday) {
    case 1:
      weekdayName = "Lunes";
      break;
    case 2:
      weekdayName = "Martes";
      break;
    case 3:
      weekdayName = "Miércoles";
      break;
    case 4:
      weekdayName = "Jueves";
      break;
    case 5:
      weekdayName = "Viernes";
      break;
    case 6:
      weekdayName = "Sábado";
      break;
    case 7:
      weekdayName = "Domingo";
      break;
    default:
      weekdayName = "Desconocido";
  }
  return weekdayName
};

export default weekdayMapper;
