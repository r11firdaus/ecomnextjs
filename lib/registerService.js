const registerService = (name, initFn) => {
    if(process.env.MODE_TYPE === 'production') {
        if (!(name in global)) {
            global[name] = initFn();
        }
        return global[name];
    }
    return initFn();
}

export default registerService;