const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const postDog = require("./controllers/postDog");
const getTemperaments = require("./controllers/getTemperaments");
const getDogs = require("./controllers/getDogs");
const getDogById = require("./controllers/getDogById");
const getDogByName = require("./controllers/getDogByName")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post("/dogs", postDog);
router.get("/temperaments", getTemperaments);
router.get("/dogs", getDogs);
router.get("/dogs/detail/:id", getDogById);
router.get("/dogs/name", getDogByName);

module.exports = router;
