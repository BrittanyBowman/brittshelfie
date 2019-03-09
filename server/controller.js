module.exports = {
  //create product, function
  create: (req, res) => {
    let { name, img, price } = req.body;

    req.app
      .get("db")
      .create_product([name, img, price])
      .then(() => {
        res.status(200).send();
      })
      .catch(error => {
        console.log({ error });
        res.status(500).send(error);
      });
  },
  //Delete Product, function
  delete: (req, res) => {
    let { id } = req.params;

    req.app
      .get("db")
      .delete_product([id])
      .then(() => {
        res.status(200).send();
      })
      .catch(err => {
        console.log({ err });
        res.status(500).send(err);
      });
  },
  //Update Product, function
  update: (req, res) => {
    let { name, img, price } = req.body;
    const { id } = req.params;

    req.app
      .get("db")
      .update_product([id, name, img, price])
      .then(product => {
        res.status(200).send(product);
      })
      .catch(err => {
        console.log({ err });
        res.status(500).send(err);
      });
  },
  // READ one
  getOne: (req, res) => {
    let { id } = req.params;

    req.app
      .get("db")
      .get_product([id])
      .then(product => {
        res.status(200).send(product);
      })
      .catch(error => {
        res.status(500).send(error);
        console.log({ error });
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
        res.status(500).send(error);
        console.log({ error });
      });
  }
};
