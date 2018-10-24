const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const employeeSchema = mongoose.Schema({
  name: {
    type: Object,
    required: true,
    text: true
  },
  phone: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  imagePath: { type: String, required: true },
  baseSalary: { type: Number, required: true },
  marital_status: { type: String, required: true },
  fedral_allowances: { type: Number, required: true },
  health_insurance: { type: Number, required: true },
  vision_insurance: { type: Number, required: true },
  retirement_401k: { type: Number, required: true }
},{
  timestamps: true
});

employeeSchema.plugin(uniqueValidator);

employeeSchema.virtual('fullName').get(function () {
  return this.name.first + ' ' + this.name.last;
}).set(function (v) {
  this.name.first = v.substr(0, v.indexOf(' '));
  this.name.last = v.substr(v.indexOf(' ') + 1);
});;
employeeSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});
employeeSchema.index({
  name: 'text'
});
// Configure the 'employeeSchema' to use getters and virtuals when transforming to JSON
employeeSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

module.exports = mongoose.model("Employee", employeeSchema);
