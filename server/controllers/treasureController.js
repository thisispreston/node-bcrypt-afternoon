

module.exports = {
  dragonTreasure: async (req, res) => {
    let db = req.app.get('db')

    let treasureOne = await db.get_dragon_treasure(1)

    res.status(200).send(treasureOne)
  },

}
