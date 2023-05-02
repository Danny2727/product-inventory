const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({include: [Product]});
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json.apply(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
     const categoryData = await Category.findByPk(req.params.id, {
    include:[Product] 
  });
  if(!categoryData){
    res.status(404).json({message: 'No category found with this id!'});
    return;
  }
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
// be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try{ 
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
   // const categoryData = await Category.findByPk(req.params.id)
   // if(!categoryData){
   //   res.status(404).json(err)
   // }
   
   // categoryData.save()
   
   const categoryData = await Category.update(req.body, {
     where: {
       id: req.params.id
      }
    });
    if(!categoryData){
       res.status(404).json(err)
    }
    res.status(200).json({ message: "Record Updated Successfully" });
   // res.status(200).json(dataObj);
  } catch(error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({message: 'No category was found wiht this id!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
