import { faker } from "@faker-js/faker";
faker.locale = 'en';

export function generateUserData() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
        userRole: 'ESS',
        status: 'Enabled',
        inputText: 'Thuy',
        expectText: 'Chung Thuy',
        username: faker.internet.username({ firstName, lastName }) + Date.now(),
        password: faker.internet.password({
            length: 10, memorable: false,     // false để có ký tự đặc biệt
            pattern: /[A-Za-z0-9!@#$%^&*()_+]/
        })
    }
}

function randomTime() {
    const hour = String(Math.floor((Math.random() * 13))).padStart(2, '0')
    const time = String(Math.floor((Math.random() * 60))).padStart(2, '0')
    return { hour, time }
}
function randomTimeGreaterThan(from) {
    let to;

    do {
        to = randomTime();
    } while (to.hour < from.hour || (to.hour === from.hour && to.minute <= from.minute))
    return to;
}

export function generateWorkShiftData() {
    const from = randomTime();
    const to = randomTimeGreaterThan(from);
    const employees = ['Bethel James Bartell'];
    const employeeName = employees[Math.floor((Math.random() * employees.length))]
    return {
        shiftName: `Shift Name ${Date.now()}`,
        startHour: from.hour,
        startMinute: from.time,
        toHour: to.hour,
        toMinute: to.time,
        employeeName: employeeName
    }
}
