module.exports = {
  //create product, function
  create: (req, res) => {
    let { name, price, img, product_id:id } = req.body;
    console.log(req.body);

    req.app
      .get("db")
      .create_product({ id, name, img, price })
      .then(() => {
        res.status(200).send("Created product");
      })
      .catch((error) => {
        res.status(500).send("Failed at creating, try again", error);
        console.log(error);
      });
  },
  //Delete Product, function
  delete: (req, res) => {
    let {id} = req.params;

    req.app
      .get("db")
      .delete_product({id})
      .then(() => {
        res.status(200).send("Deleted product");
      })
      .catch(() => {
        res.status(500).send("Failed at deleting product");
      });
  },
  //Update Product, function
  update: (req, res) => {
    let { id } = req.params;
    let { name } = req.query;

    req.app
      .get("db")
      .update_product({name, id})
      .then(() => {
        res.status(200).send("Updated content");
      })
      .catch(() => {
        res.status(500).send("Failed To Edit");
      });
  },
  // READ one
  getOne: (req, res) => {
    let { id } = req.params;

    req.app
      .get("db")
      .get_product({id})
      .then(product => {
        res.status(200).send(product);
      })
      .catch(error => {
        res.status(500).send("Could not get inventory", error);
        console.log(error);
      });
  },
  //READ all
  getAll: (req, res) => {
    req.app
      .get("db")
      .get_products()
      .then(products => {
        res.status(200).send(products);
      })
      .catch(error => {
        res.status(500).send("Could not get inventory", error);
        console.log(error);
      });
  }
};
