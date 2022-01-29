const char_pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

function shorten_url(url_length){
    let new_url = ""

    for (let i = 0; i < url_length; i++){
        const index = Math.floor(Math.random() * char_pool.length)
        new_url += char_pool[index]
    }

    return new_url
}

module.exports = shorten_url