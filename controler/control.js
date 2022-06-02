 const Employee = require("../model/user")
  //    Show the list of employee
  
  const index = (req, res, next) => {
      Employee.find()
          .then(response => {
              res.json({
                  response
              })
          })
          .catch(erroe => {
              req.json({
                  message: "An error occured!"
                })
                return false
          })
  }
  
  //  show single Employee
  const show = (req, res, next) => {
      let employeeID = req.body.employeeID
      Employee.findById(employeeID)
          .then(response => {
              res.json({
                  response
              })
          })
          .catch(error => {
              res.json({
                  message: "An error occured!"
              })
              return false
          })
  }
  
  //  STORE EMPLOYEE database
  
  const store = (req, res, next) => {
      let employee = new Employee({
          name: req.body.name,
          designation:req.body.designation,
          email: req.body.email,
          phone: req.body.phone,
          age:req.body.age
          
      })
      if(req.file){
          employee.image = req.file.path
      }
      employee.save().then(response => {
          res.json({
              message: "Employee added successfully !"
          })
      })
          .catch(error => {
              res.json({
                  message: "An error occured!"
              })
              return false
          })
  }
  
  // update an Employee By employee iD
  
  const update = (req, res, next) => {
      if (!req.body) {
          return res.status(400).send({
              message: "Data to update can not be Empty"
          });
      }
      const id = req.params.id;
      Employee.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
          .then(user => {
              if (!user) {
                  res.status(404).send({
                      message: "Cannot update EMployee"
                  })
              } else res.send({ message: "Employee Was successfully update" })
          })
          .catch(err => {
              res.status(500).send({
                  message: "Error updating Tutorial with id=" + id
              });
              return false
          });
      // let employeeID = req.body.employeeID
      // let updateData= {
      //     name:req.body.name,
      //     designation:req.body.designation,
      //     email:req.body.email,
      //     phone:req.body.phone,
      //     age:req.body.age
      // }
      // Employee.findByIdAndUpdate(employeeID,{$set:updateData})
      // .then(()=>{
      //     res.json({
      //         message:"Update Data successfully !"
      //     })
      // })
      // .catch(error =>{
      //     res.json({
      //         message:"An error occured!"
      //     })
      // })
  }
  
  // Delete an employee 
  const Destroye = (req, res, next) => {
      const id = req.params.id;
      Employee.findByIdAndRemove(id)
          .then(user => {
              if (!user) {
                  res.status(404).send({
                      message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
                  });
              } else {
                  res.send({
                      message: "Employee was deleted successfully!"
                  });
              }
          })
          .catch(err => {
              res.status(500).send({
                  message: "Could not delete Tutorial with id=" + id
              });
              return false
          });
      // let employeeID = req.body.employeeID
      // Employee.findByIdAndRemove(employeeID)
      //     .then(() => {
      //         res.json({
      //             message: "Employee deleted successfully !"
      //         })
      //     })
      //     .catch(error => {
      //         res.json({
      //             message: "An error occured!"
      //         })
      //     })
  }
  
  module.exports = {
      index, store, show, update, Destroye
  }