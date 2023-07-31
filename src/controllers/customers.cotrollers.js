import dayjs from "dayjs"
import { db } from "../database/database.connection.js"

export async function getCustomers(req, res) {
    try {
        const response = await db.query(`SELECT * FROM customers;`)
        const customers = response.rows

        const newCustomers = customers.map(c => {
            return { ...c, birthday: dayjs(c.birthday).format("YYYY-MM-DD") }
        })

        res.send(newCustomers)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getCustomerById(req, res) {
    const { id } = req.params
    try {
        const response = await db.query(`SELECT * FROM customers WHERE id=$1;`, [id])
        if (response.rowCount === 0) return res.status(404).send({ message: "Usuario não encontrado!" })

        const customer = { ...response.rows[0], birthday: dayjs(response.rows[0].birthday).format("YYYY-MM-DD") }
        res.send(customer)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createCustomer(req, res) {
    const { name, cpf, birthday, phone } = req.body
    try {
        const response = await db.query(`SELECT * FROM customers WHERE cpf=$1;`, [cpf])
        if (response.rowCount > 0) return res.status(409).send({ message: "Esse CPF já foi cadastrado!" })

        await db.query(`
            INSERT INTO customers (name, cpf, birthday, phone)
                VALUES ($1, $2, $3, $4);
        `, [name, cpf, birthday, phone])

        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function updateCustomer(req, res) {
    try {

    } catch (err) {
        res.status(500).send(err.message)
    }
} 