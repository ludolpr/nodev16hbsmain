
const { MODE } = process.env

// Render moduler pour les test 
// (Object req, Object res, String page, Object data)

exports.RndProdOrJson = (res, code, page, data) => {
    if (MODE === 'test') {
        delete data.layout
        res.status(code).json({ ...data })
    }
    else if (page.charAt(0).includes('/')) res.status(code).redirect(page)
    else res.status(code).render(page, { ...data })
}
