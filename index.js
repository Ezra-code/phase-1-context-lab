function createEmployeeRecord(array){
    let employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord
}

function createEmployeeRecords(employeeRecord){
    return employeeRecord.map(function(row){
        return createEmployeeRecord(row)
    })
}
function createTimeInEvent(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this

}

function createTimeOutEvent(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

function hoursWorkedOnDate(workDate){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === workDate
    })

    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === workDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(dateWork){
    let rawWage = hoursWorkedOnDate.call(this, dateWork)
        * this.payPerHour
    return parseFloat(rawWage.toString())
}

function allWagesFor(){
    let eligibleDates = this.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)

    return payable
}

let findEmployeeByFirstName = function(nameArray, fName) {
  return nameArray.find(function(rec){
    return rec.firstName === fName
  })
}

function calculatePayroll(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}