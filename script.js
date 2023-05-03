const monthDays = document.querySelector('.number-days')
const month = document.querySelector('.month')
const year = document.querySelector('.year')
const arrows = document.querySelectorAll('svg')

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

let date = new Date(),
currentYear = date.getFullYear(),
currentMonth = date.getMonth()

const generateDate = () => {
    let lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(),
    lastDateOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate(),
    firstDateOfMonth = new Date(currentYear, currentMonth, 1).getDay(),
    lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay()
    
    month.innerHTML = months[currentMonth]
    year.innerHTML = currentYear
    
    function getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }
    
    let html = `
    <li>S</li>
    <li>M</li>
    <li>T</li>
    <li>W</li>
    <li>T</li>
    <li>F</li>
    <li>S</li>
    `
    
    for (let i = firstDateOfMonth; i > 0 ; i--) {
        html += `<li class='prev'>${lastDateOfPrevMonth - i + 1}</li>`
    }
    
    for (let i = 1; i < lastDateOfMonth + 1; i++) {
        let isToday = i == date.getDate() && currentMonth == new Date().getMonth() && currentYear == new Date().getFullYear() ? 'active' : ''
        html += `<li class=${isToday}><span>${i}</span></li>`
    }
    
    for (let i = 0; i < 6 - lastDayOfMonth; i++) {
        html += `<li class='next'>${i + 1}</li>`
    }

    monthDays.innerHTML = html
}

generateDate()

arrows.forEach(arrow => {
    arrow.addEventListener('click', (e) => {
        if(e.target.id == 'left'){
            currentMonth -= 1
        }
        else if(e.target.id == 'right'){
            currentMonth += 1
        }

        if(currentMonth < 0 || currentMonth > 11){
            date = new Date(currentYear, currentMonth)
            currentYear = date.getFullYear()
            currentMonth = date.getMonth()
        }
        generateDate()
    })
});