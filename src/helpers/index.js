function getDuration(runTime) {
    const hours = Math.floor(runTime / 60)
    const minutes = runTime % 60
    return `${hours}h ${minutes}m`
}

module.exports = {
    getDuration
}