exports.addNewFood = async (req, res, next) => {
  try {
    // Creat new food
    const food = await Food.create(req.body);
    // Test if food was created
    if (food) {
      return res.status(201).json({
        status: "Succes",
        data: {
          food,
        },
      });
    }
  } catch (err) {
    return res.status(404).json({
      status: "Echec",
      data: err,
    });
  }
};

exports.prepareFood = async (req, res, next) => {
  try {
    // Prepare new food
    const food = await prepareFood.create(req.body);
    // Test if food model was created
    if (food) {
      // Push the id of current client in food model
      await prepareFood.findByIdAndUpdate(prepareFood.id, {
        $push: { userID: req.user.id },
      });
      //Add the id of food in the profile of current client
      await User.findByIdAndUpdate(req.user.id, {
        $push: { RequestSend: prepareFood.id },
      });
      return res.status(201).json({
        status: "Succes",
        data: {
          prepareFood,
        },
      });
    }
  } catch (err) {
    return res.status(404).json({
      status: "Echec",
      data: err,
    });
  }
};

exports.getAllDoneFoods = async (req, res) => {
  try {
    // Test if there is a food
    const foods = await prepareFood.find({ Done: false });
    // Test if food's requests is an empty array
    if (foods.length == 0) {
      return res.status(400).send({ message: "There is no done foods !! " });
    }
    return res.status(200).json({
      status: "Succes",
      foods,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Echec",
      err,
    });
  }
};

exports.findAllrequestPrepareFood = async (req, res) => {
  try {
    // Test if there is a food
    const foods = await prepareFood.find({ Done: true });
    // Test if food's requests is an empty array
    if (foods.length == 0) {
      return res.status(400).send({ message: "There is no request !! " });
    }
    return res.status(200).json({
      status: "Succes",
      foods,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Echec",
      err,
    });
  }
};

exports.findAllFoodsReseved = async (req, res) => {
  try {
    // Test if there is a food
    const food = await Food.findById(req.params.idFood);
    let requests = food.clientID;
    // Test if food's requests s an empty array
    if (requests.length == 0) {
      return res.status(400).send({ message: "There is no request !! " });
    }
    return res.status(200).json({
      status: "Succes",
      requests,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Echec",
      err,
    });
  }
};

exports.deleteOneFood = async (req, res, next) => {
  try {
    // Find food and delete it
    const doc = await Food.findByIdAndDelete(req.params.idFood);
    if (!doc)
      return res.status(400).json({
        status: "No doc with that id !!",
      });
    return res.status(200).json({
      status: "Succes",
      data: null,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Echec",
      data: err,
    });
  }
};

exports.findAll = async (req, res, next) => {
  try {
    // Test if there is a document
    const doc = await Food.find({});
    return res.status(200).json({
      status: "Succes",
      result: doc.length,
      data: {
        doc,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: "Echec",
      data: err,
    });
  }
};

exports.findAllFoodsReseved = async (req, res) => {
  try {
    // Test if there is foods
    const foods = await prepareFood.find({ Done: false });
    // Test if food's requests is an empty array
    if (foods.length == 0) {
      return res.status(400).send({ message: "There is no done foods !! " });
    }
    return res.status(200).json({
      status: "Succes",
      foods,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Echec",
      err,
    });
  }
};

exports.ReserveOneFood = async (req, res) => {
  try {
    currentUser = req.user;
    // Test if there is a commande
    let commande = await Commande.findById(req.params.idCommande);
    if (!commande) {
      return res.status(400).send({
        message: "Aucune commande avec cette id !! ",
      });
    }
    // Test if the commande was open
    if (commande.Statut == "ouvert") {
      // Test if the current employee send a request
      if (commande.ListeDemmandeLivreurs.includes(currentUser.id)) {
        return res.status(400).send({
          message: "vous envoyez déjà une demande à cette commande !! ",
        });
      }
      // Create an offre
      const offre = await Offre.create(req.body);
      // Push information of Employee , Commande , Client on the offre
      await Offre.findByIdAndUpdate(offre.id, {
        $push: {
          LivreurID: req.user.id,
          CommandeID: req.params.idCommande,
          ClientID: commande.utilisateurID,
        },
      });
      //Add th id of offre in the specific commande
      await Commande.findByIdAndUpdate(req.params.idCommande, {
        $push: { offres: offre.id, ListeDemmandeLivreurs: currentUser.id },
      });
      //Add the id of offre and the id of commande in the profile current employee
      await User.findByIdAndUpdate(currentUser.id, {
        $push: {
          DemmandesEnvoyees: req.params.idCommande,
          OffreEnvoyees: offre.id,
        },
      }).populate("OffreEnvoyees");
      return res.status(200).json({
        status: "succès",
        data: {
          currentUser,
        },
      });
    }
    return res.status(404).json({
      status: "cette commande reservé !! ",
      err,
    });
  } catch (err) {
    return res.status(404).json({
      status: "échouer",
      message: err,
    });
  }
};

exports.UpdateOneFood = async (req, res, next) => {
  try {
    // Update new changes
    let doc = await Food.findByIdAndUpdate(req.params.idFood, req.body, {
      new: true,
      runValidators: true,
    });
    if (doc) {
      return res.status(200).json({
        status: "succès",
        data: {
          doc,
        },
      });
    }
    return res.status(400).json({
      status: "Echec",
      message: "There is no food with that id !! ",
    });
  } catch (err) {
    return res.status(404).json({
      status: "échouer",
      data: err,
    });
  }
};

exports.findAllFoodsPrepared = async (req, res) => {
  try {
    // Test if there is foods
    const foods = await prepareFood.find({ Done: false });
    // Test if food's requests is an empty array
    if (foods.length == 0) {
      return res.status(400).send({ message: "There is no done foods !! " });
    }
    return res.status(200).json({
      status: "Succes",
      foods,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Echec",
      err,
    });
  }
};

exports.deleteOneRequestFood = async (req, res, next) => {
  try {
    // Find food and delete it
    const food = await prepareFoodSchema.findByIdAndDelete(req.params.idFood);
    if (food)
      return res.status(200).json({
        status: "Succes",
        data: null,
      });
    return res.status(400).json({
      status: "No doc with that id !!",
    });
  } catch (err) {
    return res.status(404).json({
      status: "Echec",
      data: err,
    });
  }
};

// change the food's condition by an admin
exports.changeFoodCondition = async (req, res) => {
  try {
    currentUser = req.user;
    // Test if there is a food
    let food = await prepareFoodSchema.findById(req.params.idRequest);
    if (!food) {
      return res.status(400).send({
        message: "No food with that id !!",
      });
    }
    if (food.Done == true) {
      return res.status(400).send({
        message: "You already prepare this food !! ",
      });
    }
    // change the  food's condition to be an done food
    food.Done = true;
    //save the last changes
    food.save();
    return res.status(200).json({
      status: "Food condition change succesfuly !!",
      food,
    });
  } catch (err) {
    return res.status(404).json({
      status: "échouer",
      message: err,
    });
  }
};
