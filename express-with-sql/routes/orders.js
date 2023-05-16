const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  getSingleOrder,
  createNewOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orders");

router.route("/orders").get(getAllOrders).post(createNewOrder);

router
  .route("/orders/:id")
  .get(getSingleOrder)
  .put(updateOrder)
  .delete(deleteOrder);

module.exports = router;
