export const sort = (key) => {
    return new Promise((resolve, reject) => {
        const pisah = key.split('+sort')
        let sort = pisah[1] ? pisah[1] : ''
        
        let sortReq = ['','',pisah[0]]
        
        if (sort === '') sortReq = ['rating_barang', 'desc']
        if (sort === 'lowest') sortReq = ['harga_barang', 'asc']
        if (sort === 'highest') sortReq = ['harga_barang', 'desc']
        return resolve({sortReq})
    })
}