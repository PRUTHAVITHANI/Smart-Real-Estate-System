import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  id: { 
    type: String, 
    default: () => Math.random().toString(36).substring(2, 8).toUpperCase(),
    required: true 
  },
  fullname: { type: String, required: true },
  birthDate: { type: String, required: true },
  email: { type: String, required: true },
  mobileno: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  placeOfWork: { type: String, required: true },
  jobTitle: { type: String, required: true },
  jobAddress: { type: String, required: true },
  jobState: { type: String, required: true },
  jobCity: { type: String, required: true },
  jobZipCode: { type: String, required: true },
  monthlyNetIncome: { type: String, required: true },
  creditScore: { type: String, required: true },
  terms: { type: String, required: true },
  requestedLoanAmount: { type: String, required: true },
  interestAmount: { type: String, required: true },
  userRef: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'User',
    required: true,
},
remark: { type: String, default: '' }, // Add remark field
status: { type: String, default: 'Not Update Yet' }, // Add status field

},  {timestamps: true });

const Loan = mongoose.model('Loan', loanSchema);

export default Loan;
