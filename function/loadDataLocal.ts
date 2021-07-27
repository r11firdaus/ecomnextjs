export const loadLocalMsg = (): Promise<any> => {
    return new Promise(async(resolve, reject) => {
        let msg: any[];
        const localChats = localStorage.getItem('chats');

        if (localChats){
            msg = JSON.parse(localChats)
            resolve({msg})
        } else reject({msg: localChats})
    })
}

export const loadLocalNotif = (): Promise<any> => {
    return new Promise(async(resolve, reject) => {
        let notif: any[];
        const locaNotif = localStorage.getItem('notification');

        if (locaNotif) {
            notif = JSON.parse(locaNotif)
            resolve({notif})
        } else reject({notif: locaNotif})
    })
}