

module.exports = {
  dragonTreasure: async (req, res) => {
    let db = req.app.get('db')

    let treasureOne = await db.get_dragon_treasure(1)

    res.status(200).send(treasureOne)
  },
  getUserTreasure: async (req, res) => {
    let { id } = req.session.user
    let db = req.app.get('db')

    let userTreasure = await db.get_user_treasure(id)

    res.status(200).send(userTreasure)
  },
  addUserTreasure: async (req, res) => {
    let { id } = req.session.user
    let { treasureURL } = req.body
    let db = req.app.get('db')

    let newTreasure = await db.add_user_treasure(treasureURL, id)

    res.status(200).send(newTreasure)
  }
}
