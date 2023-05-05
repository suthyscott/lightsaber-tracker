require('dotenv').config()
const express = require('express')
const cors = require('cors')

const {SERVER_PORT} = process.env
const {sequelize} = require('./util/database')
const {Jedi} = require('./models/jedi')
const {Lightsabers} = require('./models/lightsabers')
const {SaberColors} = require('./models/saberColors')

const app = express()

app.use(express.json())
app.use(cors())

Jedi.hasOne(Lightsabers)
Lightsabers.belongsTo(Jedi)

SaberColors.hasMany(Lightsabers)
Lightsabers.belongsTo(SaberColors)

app.post('/jedi', async (req, res) => {
    const {firstName, lastName, desc, dualBlade, colorId} = req.body 

    const newJedi = await Jedi.create({firstName, lastName})

    const newSaber = await Lightsabers.create({desc, dualBlade, saberColorId: colorId, jediId: newJedi.id})

    console.log(newJedi, newSaber)
})

app.post('/seed', async (req, res) => {
    const {colorName} = req.body

    await SaberColors.create({colorName})

    res.sendStatus(200)
})

app.get('/jedi/:jediId', async (req, res) => {
    const {jediId} = req.params

    const jediInfo = await Jedi.findOne({
        where: {id: jediId},
        include: [{
            model: Lightsabers,
            attributes: ["desc"],
            include: [{
                model: SaberColors
            }]
        }]
    })

    res.status(200).send(jediInfo)
})

// sequelize.sync({force: true})
sequelize.sync()
    .then(() => app.listen(SERVER_PORT, () => console.log(`Take us to warp ${SERVER_PORT}!`)))
    .catch(err => console.log(err))