
const pagination = (limit, total) => {
    let page = total / limit
    return Math.ceil(page)
}
export default pagination

