var express = require('express');
var router = express.Router();
const tablesModel = require('../../db/models/tables');
const usersModel = require('../../db/models/users');
const tryCatch = require('../utils/tryCatch');

// router.use(jwtChecker.checkToken);
router.get('/', async (req, res) => {
  //query string like ?userId=123
  const { userId } = req.query;
  //if req.user
  try {
    const tables = await tablesModel.getByUserId(userId);
    res.status(200).send(tables);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/:id/users', async (req, res) => {
  tryCatch(async () => {
    const tableId = req.params.id;
    const users = await usersModel.getUsersByTableId(tableId);
    res.status(200).send(users);
  }, res);
});

router.post('/', (req, res) => {
  const table = req.body;
  //if req.user
  //post table
  res.status(200).send(JSON.stringify(table));
});

<<<<<<< HEAD
router.post('/', async (req, res) => {
  const userEmail = req.body.email;
  const { rows: dbResults } = await db.getUserInfoByEmail(userEmail);
  if (dbResults[0]) {
    res.status(200).json({ ok: 'found user' });
  } else {
    res.status(404).json({ bad: "couldn't find user" });
  }
});
=======
router.post('/invite', async (req, res) => {
    const userEmail = req.body.email;
    const tableId = req.body.tableId;
    try{
        const {rows: dbResults} = await db.getUserInfoByEmail(userEmail);
        const user = await dbResults[0];
        if (!user){
            res.status(404).json({error: 'not found'})
            return;
        }else {
            const result = await tablesModel.addUserToTable(tableId, user.id);
            await console.log('result: ', result)
            res.status(200).json({ok: `added user ${user.id} to table ${tableId}`});
        }
    } catch (error){
        res.status(500).send({message: "Internal server error"})
    }
})
>>>>>>> b4a06b7ac8d416de5e6ae8e2b7c2537e4e123d87

router.put('/:id', (req, res) => {
  const table = req.body;
  const id = req.params.id;
  table.id = id;
  //if req.user && user owns table
  //update table
  res.status(200).send(JSON.stringify(table));
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  //if req.user && user owns table
  //delete table
  res.status(200).send(`Deleted table ${id}`);
});

module.exports = router;
