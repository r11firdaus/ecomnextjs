export const sort = (key) => {
    return new Promise((resolve, reject) => {
        const pisah = key.split('+sort')
        let sort = pisah[1] ? pisah[1] : ''
        
        let sortReq = ['','']
        
        if (sort === 'rating') sortReq = ['rating_barang', 'desc']
        else if (sort === 'lowest') sortReq = ['harga_barang', 'asc']
        else if (sort === 'highest') sortReq = ['harga_barang', 'desc']
        else if (sort === 'newest') sortReq = ['id_barang', 'desc']
        else if (sort === 'relevance') sortReq = [null]
        return resolve({sortReq})
    })
}