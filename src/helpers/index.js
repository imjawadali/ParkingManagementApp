function getFormattedDate(date) {
    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    const d = (new Date(Date.parse(date))).toLocaleDateString("en-US", options)
    return d
}

function getDuration(runTime) {
    const hours = Math.floor(runTime / 60)
    const minutes = runTime % 60
    return `${hours}h ${minutes}m`
}

function getFormattedCurrency(number) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    return formatter.format(number)
}
module.exports = {
    getFormattedDate,
    getDuration,
    getFormattedCurrency
}