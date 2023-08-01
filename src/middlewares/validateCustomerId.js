import { db } from "../database/database.connection.js"

export async function validateCustomerId(req, res, next) {
    const { id } = req.params

    const response = await db.query(`SELECT * FROM customers WHERE id=$1;`, [id])
    if (response.rowCount === 0) return res.status(404).send({ message: "Usuario não encontrado!" })

    res.locals.customerData = response.rows[0]

    next()
}