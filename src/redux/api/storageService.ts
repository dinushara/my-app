export const readFromLocalStorage = (): Promotion[] => {
    const dataFromLocalStorage = localStorage.getItem('promotions');
    if (dataFromLocalStorage) {
        try {
            return JSON.parse(dataFromLocalStorage)
        }
        catch (e) {
            localStorage.removeItem('promotions')
            return [];
        }
    } else {
        return [];
    }
}

export const writeToLocalStorage = (data: Promotion[]): void => {
    if (data == null || data == undefined) return
    localStorage.setItem('promotions', JSON.stringify(data))
}