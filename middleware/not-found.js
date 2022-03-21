const notFound = (req, res) => {
    res.status(404).json({ msg: 'URL path does not exist' })
}
module.exports = notFound;