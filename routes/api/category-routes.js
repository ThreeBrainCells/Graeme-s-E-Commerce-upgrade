const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include: [
        Product
      ]
    })
   
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        Product
      ]
    })
   
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  //
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then(
    res.status(200).json({message: "New Category Created!"})
  ).catch(err => {
    res.status(500).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then(
    res.status(200).json({message: "Category Updated!"})
  ).catch(err => {
    res.status(500).json(err)
  })
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const CategorytoDelete = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!CategorytoDelete) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(CategorytoDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
