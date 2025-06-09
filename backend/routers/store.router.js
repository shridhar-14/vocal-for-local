const express = require('express')
const verifyToken=require('./../middlewares/auth.middleware.js')
const {
   
    addStore,
    allStore,
    getStoreById,
    updateDetailsById,
    searchByCategory,
    searchLocation,
    updateStoreImage,
    deleteStore,
    myStore
} = require('../controllers/store.controller.js')
const upload = require('../middlewares/fileupload.middlewares.js')
const storeRouter = express.Router()
storeRouter.post("",verifyToken,upload.single('StoreImage'), addStore)
storeRouter.get("/", allStore)
storeRouter.get('/owner',verifyToken,myStore)
storeRouter.get('/:id',getStoreById)
storeRouter.get('/find/:key',searchByCategory)
storeRouter.put('/store/:id',verifyToken,updateDetailsById)
storeRouter.get("/search/:key",searchLocation)
storeRouter.put("/:id", verifyToken,upload.single('StoreImage'), updateStoreImage)
storeRouter.delete('/:id', verifyToken,deleteStore)

module.exports = storeRouter