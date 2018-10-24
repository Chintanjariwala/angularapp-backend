const Employee = require("../models/employee");

exports.creatEemployee = (req, res, next) => {
  const newEmployee = req.body;
  newEmployee.created = new Date();

  const employer = new Employee(newEmployee);
  employer
    .save()
    .then(savedEemployee => {
      res.status(201).json({
        message: "Employee added successfully",
        employee: {
          ...savedEemployee,
          id: savedEemployee._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a employee failed!"
      });
    });
};

exports.getPosts = (req, res, next) => {
  Employee.find()
  .then(document => {
      res.status(201).json({
        post:document
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a employee failed!"
      });
    });

};

exports.getPost = (req, res, next) => {
  Employee.findById(req.params.id)
  .then(employee => {
    if(employee){
      res.status(201).json(employee);
    } else {
      res.status(404).json({message: "Employee not found!"});
    }
    })
    .catch(error => {
      res.status(500).json({
        message: "Employee not found!"
      });
    });

};

exports.updateEmployee = (req, res, next) => {

  const employer = new Employee(
    {
      _id:req.body.id,
      name: {
        first: req.body.name.first,
        last: req.body.name.last
      },
      phone: req.body.phone,
      email: req.body.email,
      age: req.body.age,
      imagePath: req.body.imagePath,
      baseSalary: req.body.baseSalary,
      marital_status: req.body.marital_status,
      fedral_allowances: req.body.fedral_allowances,
      health_insurance: req.body.health_insurance,
      vision_insurance: req.body.vision_insurance,
      retirement_401k: req.body.retirement_401k
  });
  Employee.updateOne({ _id: req.params.id }, employer)
  .then(document => {
      res.status(201).json({
        message:"Update Sucecessfully"
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Updating an employee failed!"
      });
    });

};

exports.deletePost = (req, res, next) => {
  Employee.deleteOne({ _id: req.params.id })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting posts failed!"
      });
    });
};
