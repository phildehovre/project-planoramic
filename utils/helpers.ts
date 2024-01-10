import dayjs from "dayjs";

export const capitalize = (s: string) => {
    if (typeof s !== 'string') return s
    return s.charAt(0).toUpperCase() + s.slice(1)
}


export const formatDate = (units: string, range: number) => {
    let date
    const [timeUnits, beforeOrAfter] = units.split('-')
    console.log(timeUnits, beforeOrAfter)

        return date;
};

export const dayjsFormat = (date: Date) => {
    return dayjs(date).format("ddd DD/MM/YYYY")
}