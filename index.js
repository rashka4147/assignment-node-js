const calculateTotalTarget = (startDate, endDate, totalAnnualTarget, excludedDay = 5) => {
    // Parse the start and end dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Helper function to calculate the number of working days excluding specific days
    const getWorkingDaysExcludingDay = (date, excludeDay) => {
        const month = date.getMonth();
        const year = date.getFullYear();
        let daysCount = 0;

        // Get the number of days in the month
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month, day);
            const dayOfWeek = currentDate.getDay();

            if (dayOfWeek !== excludeDay) { // Exclude the specified day (e.g., Friday)
                daysCount++;
            }
        }
        return daysCount;
    };

    // Helper function to get all months between two dates
    const getMonthsInRange = (start, end) => {
        const months = [];
        let date = new Date(start);

        while (date <= end) {
            months.push(new Date(date.getFullYear(), date.getMonth(), 1));
            date.setMonth(date.getMonth() + 1);
        }
        return months;
    };

    const months = getMonthsInRange(start, end);
    const daysExcludingFridays = [];
    const daysWorkedExcludingFridays = [];
    const monthlyTargets = [];
    let totalTarget = 0;

    // Calculate days excluding Fridays for each month and total targets
    months.forEach((monthStartDate) => {
        const monthEndDate = new Date(monthStartDate.getFullYear(), monthStartDate.getMonth() + 1, 0);

        // Get total working days for the month, excluding the specified day
        const totalDays = getWorkingDaysExcludingDay(monthStartDate, excludedDay);
        daysExcludingFridays.push(totalDays);

        // Calculate days worked in the specific range within this month
        let daysWorked = 0;
        for (let day = 1; day <= monthEndDate.getDate(); day++) {
            const currentDate = new Date(monthStartDate.getFullYear(), monthStartDate.getMonth(), day);

            if (currentDate >= start && currentDate <= end && currentDate.getDay() !== excludedDay) {
                daysWorked++;
            }
        }
        daysWorkedExcludingFridays.push(daysWorked);

        // Calculate monthly target proportionally based on days worked
        const monthTarget = (totalAnnualTarget / 12) * (daysWorked / totalDays);
        monthlyTargets.push(monthTarget);
        totalTarget += monthTarget;
    });

    // Return the result object
    return {
        daysExcludingFridays,
        daysWorkedExcludingFridays,
        monthlyTargets,
        totalTarget
    };
};

// Example usage
console.log(calculateTotalTarget('2024-03-01', '2024-04-31', 5220));