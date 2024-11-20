export const calculateConversion = (amount:number, exchangeRate:number) => {
    return  roundOff(amount * exchangeRate)
}

export const roundOff = (value:number) => {
    return Math.round(value * 100)/100
}