const pool = require("../db");

/////////WICHTIG! Orders Routes vorher anpassen!
const getAllOrders = async (req, res) => {
  try {
    const { rows: orders } = await pool.query("SELECT * FROM orders");
    //console.log(orders);
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(404).send("Oops, something went wrong");
  }
};

const getSingleOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows: orders } = await pool.query(
      "SELECT * FROM orders WHERE id=$1",
      [id]
    );
    if (orders.length) res.status(200).json(orders[0]);
    else res.status(404).send(`No order with id ${id} found.`);
  } catch (err) {
    console.log(err);
    res.status(404).send("Oops, something went wrong");
  }
};

const createNewOrder = async (req, res) => {
  const { price, date, user_id } = req.body;
  console.log(
    "NEW ORDER! Price: ",
    price,
    " Date: ",
    date,
    " User_id: ",
    user_id
  );
  try {
    const { rows: newOrder } = await pool.query(
      "INSERT INTO orders(price,date,user_id) VALUES ($1,$2,$3) RETURNING *;",
      [price, date, user_id]
    );
    res.status(201).send(`Created new order ${newOrder[0].id}`);
  } catch (err) {
    console.log(err);
    res.status(404).send("Oops, something went wrong");
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { price, date, user_id } = req.body;
  try {
    const db_res = await pool.query(
      "UPDATE orders SET price=$1, date=$2, user_id=$3 WHERE id=$4 RETURNING *;",
      [price, date, user_id, id]
    );
    res
      .status(200)
      .send(
        `Updated userNr ${user_id}'s order #${id} to be ${price}$ on ${date}`
      );
  } catch (err) {
    console.log(err);
    res.status(404).send("Oops, something went wrong");
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const db_res = await pool.query("DELETE FROM orders WHERE id=$1", [id]);
    res.status(204).send(`Order ${id} deleted`);
  } catch (err) {
    console.log(err);
    res.status(404).send("Oops, something went wrong");
  }
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  createNewOrder,
  updateOrder,
  deleteOrder,
};
