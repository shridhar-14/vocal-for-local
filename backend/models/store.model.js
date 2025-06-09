const mongoose = require('mongoose');
const storeSchema = new mongoose.Schema({
    StoreName: {
        type: String,
        required: true,
    },
    Category:{
        type:String,
        required:true,
        enum:["FOOD","GROOMING","ENTERTAINMENT","FASHION","GROCERIES"]
    },
    Contact: {
        type: Number,
        required: true,
        unique: true,
    },
    StoreImage:{
        type: String,
        required:true,
    },
    StoreLocality: {
        type: String,
        required: true,
    },
    StoreCity:{
        type: String,
        required: true,
        
    },
    StoreState:{
        type: String,
        required: true,
    },
    StorePin:{
        type:String,
        required:true,
    },
    WorkingHour:{
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});
const store = mongoose.model('store', storeSchema);
module.exports = store;