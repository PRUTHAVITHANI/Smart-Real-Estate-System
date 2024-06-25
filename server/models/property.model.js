import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    id: { 
        type: String, 
        default: () => Math.random().toString(36).substring(2, 8).toUpperCase(),
        required: true 
      },
    propertyFor: {
        type: String, 
        // required: true,
    },
    propertyType: {
        type: String, 
        required: true,
    },
    state: {
        type: String, 
        required: true,
    },
    city: {
        type: String, 
        required: true,
    },
    locality: {
        type: String, 
        required: true,
    },
    society: {
        type: String, 
        required: true,
    },
    address: {
        type: String, 
        required: true,
    },

    // Fields for Transaction Type
    saleType: {
        type: String, 
        required: true,
    },
    ownership: {
        type: String, 
        required: true,
    },
    floor: {
        type: String, 
        required: true,
    },
    availability: {
        type: String, 
        required: true,
    },
    propertyFloor: {
        type: String, 
        required: true,
    },

   // Fields for Property Features & Price
   builtUpArea: {
    type: Number, 
    required: true,
},
    carpetArea: {
        type: Number, 
    required: true,
},
    superArea: {
        type: Number, 
    required: true,
},
    expectedPrice: {
        type: Number, 
    required: true,
},
    bookingAmount: {
        type: Number, 
    required: true,
},
    maintenanceCharges: {
        type: Number, 
    required: true,
},

  
 
   // Fields for Bedrooms, Bathrooms, Balconies

bedrooms: {
    type: Number, 
    required: true,
},

bathrooms: {
    type: Number, 
    required: true,
},

balconies: {
    type: Number ,
    required: true,
},

   // Field for Property Descriptions
   description: {
    type: String, 
    required: true,
},
userRef: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'User',
        required: true,
},


carParking: Boolean,
furnished: Boolean,
powerBackup: Boolean,
security: Boolean,
lift: Boolean,
maintenanceStaff: Boolean,
fireAlarm: Boolean,
pipedGas: Boolean,
park: Boolean,
swimmingPool: Boolean,

other: {
    type: String, 
},
imageUrls:{
  type: Array,
},
approved: {
    type: Boolean,
    default: false 
},
status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending' // Default status is set to 'pending'
},
}, {timestamps: true });

const Property = mongoose.model('Property', propertySchema);

export default Property;
