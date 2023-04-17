function runNian(year:number):boolean {
  if (
    year % 400 === 0
    || (year % 4 === 0 && year % 100 !== 0)
  ) {
    return true;
  }
  return false;
}

function getMonthFirstDayWeek(year:number, month:number):number {
  const first:number = 1;
  const truthMonth = month - 1;
  const date:Date = new Date(year, truthMonth, first);
  const week:number = date.getDay();
  return week;
}

function getMonthAllDays(year:number, month:number) {
  const days28:number = 28;
  const days29:number = 29;
  const days30:number = 30;
  const days31:number = 31;
  interface TypeDaysMap{
      [propName:string]: number;
  }
  const daysMap:TypeDaysMap = {
    1: days31,
    3: days31,
    5: days31,
    7: days31,
    8: days31,
    10: days31,
    12: days31,
    4: days30,
    6: days30,
    9: days30,
    11: days30,
    2: runNian(year) ? days29 : days28,
  };
  return daysMap[month];
}

const wrapper = document.querySelector('#calendar');

function insertElement(ele:string):void{
  if (wrapper) {
    wrapper.innerHTML = ele;
  }
}

const weeksMap = ['日', '一', '二', '三', '四', '五', '六'];

// function getWeek({ year, month, day }) {
// return weeksMap[new Date(year, month, day).getDay()];
// }

function showCalendar(
  year:number,
  month:number,
):void {
  const firstDayWeek = getMonthFirstDayWeek(year, month);
  const allDays = getMonthAllDays(year, month);
  let calendarStr = '';
  for (let i = 1; i < allDays; i += 1) {
    if (i < firstDayWeek) {
      calendarStr += '<td class="calendar-cell"></td>';
    }
    calendarStr += `<td class="calendar-cell">${i}</td>`;
    if (i % 7 === 0) {
      calendarStr += '</tr><tr>';
    }
  }
  calendarStr = `<table>
    <tr>${weeksMap.reduce(
    (pre, cur, ind) => (ind > 1
      ? `${pre}<td>${cur}</td>`
      : `<td>${pre}</td><td>${cur}</td>`),
  )}</tr>
    <tr>${calendarStr}</tr>
  </table>`;
  insertElement(calendarStr);
}

function getCurrentDate() {
  const todayDate = new Date();
  const currentYear = todayDate.getFullYear();
  const currentMonth = todayDate.getMonth();
  const currentDate = todayDate.getDate();
  const currentTime = todayDate.getTime();
  return {
    currentYear,
    currentMonth,
    currentDate,
    currentTime,
  };
}

function init():void{
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  showCalendar(currentYear, currentMonth + 1);
  document
    .addEventListener('click', (e: MouseEvent) => {
      const { target } = e;
      if (target) {
        console.log(target, (target as HTMLElement).textContent);
      }
    }, false);
}

init();
