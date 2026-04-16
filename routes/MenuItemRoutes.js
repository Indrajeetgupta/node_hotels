const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

//post menuItem
router.post('/', async (req, res) => {
  try {
    const menuData  = req.body;

    const newMenu = new MenuItem(menuData );

    const response = await newMenu.save();
    res.status(200).json(response) 

  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'internal server error'})


  }
});

//get menuitem

router.get('/', async (req, res) => {
  try {
   const menuData = await MenuItem.find()
   res.status(200).json(menuData);
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'internal server error'});

  }
});


router.get('/:tasteType', async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){
      const response = await MenuItem.find({taste: tasteType});
      console.log('response fetched');
      res.status(200).json(response);

    } else {
       res.status(404).json({error: 'Invalid taste  type'});

    }
  }catch(err){
    console.log(err);
     res.status(500).json({error: 'internal server error'});

  }
});

router.put('/:id', async (req, res) => {
  try{
    const menuItem = req.params.id;

    const updatedMenuItem = req.body;

    const response = await MenuItem.findByIdAndUpdate(menuItem, updatedMenuItem, {
      new: true,
      runValidators: true,
    })

    if(!response){
      res.status(404).json({error: 'menuItem not found'})
    }
    console.log('data updated');
    res.status(200).json(response);

  } catch(err){
    console.log(err);
     res.status(500).json({error: 'internal server error'});
  }
})

router.delete('/:id', async (req, res) => {
  try{
     const menuItemId = req.params.id;

  const response = await MenuItem.findByIdAndDelete(menuItemId);
  if(!response){
      res.status(404).json({error: 'menuItem not found'})
    }
    console.log('dalete successfully');
    res.status(500).json({error: 'menuItemDelete successefully'});
    

  }catch(err){
     console.log(err);
     res.status(500).json({error: 'internal server error'});

  }
 
})
// comment added for testing purpuse

module.exports = router;
