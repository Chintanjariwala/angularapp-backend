const express = require("express");

const EmployeeController = require("../controllers/employee");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", EmployeeController.creatEemployee);

router.put("/:id", EmployeeController.updateEmployee);

router.get("", EmployeeController.getPosts);

router.get("/:id", EmployeeController.getPost);

router.delete("/:id", EmployeeController.deletePost);

module.exports = router;
