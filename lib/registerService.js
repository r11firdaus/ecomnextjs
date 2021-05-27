const registerService = (name, initFn) => {
    if(process.env.NODE_ENV === 'production') {
        if (!(name in global)) {
            global[name] = initFn();
        }
        return global[name];
    }
    return initFn();
}

export default registerService;