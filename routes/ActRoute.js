const router = require("express").Router()
const Act = require('../data/helpers/actionModel')
const Pro = require('../data/helpers/projectModel')

//Routes
router.get("/", (req, res) => {
    Act.get().then((acts1) => {
        res.status(200).json({ actions: acts1 });
    })
    .catch((err) => {
        res.status(500).json({ message: "Oops! There was an error processing your request."});
    });
});

router.get("/:id", validateProId, (req, res) => {
    const id = req.params.id;
    Act.get(Number(id)).then((acts2) => {
        res.status(200).json({ action: acts2});
    })
    .catch((err) => {
        res.status(500).json({ message: "Oops! Request could not be processed."});
    });
});

router.post("/:id", validateProId, validateAct, (req, res) => {
    const id = req.params.id;
    const newAct = {
      pro_id: id,
      description: req.body.description,
      notes: req.body.notes,
    };
    Act
      .insert(newAct)
      .then((res) => {
        res.status(200).json({ message: "Yay! Success!" });
      })
      .catch((error) => {
        res.status(500).json({ err: "Oh no. Request failed.", err });
      });
  });

  router.put("/:id", validateProId, validateBasicAct, (req, res) => {
    const id = req.params.id;
    const updateAct = {
      description: req.body.description,
      notes: req.body.notes,
    };
    Act
      .update(id, updateAct)
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ err: "Update Failed" });
      });
  });

  router.delete("/:id", validateProId, (req, res) => {
    const id = req.params.id;
    Act.remove(id).then((res) => {
        res.status(200).json(`Deleted id: ${id}`);
      })
      .catch((err) => {
        res.status(500).json({ message: "Oops! Deletion incomplete!" });
      });
  });


//Functions
function validateProId(req, res, next) {
    Act.get(req.params.id).then((user) => {
        if (user) {
            req.user = user;
            next();
        } else {
            res.status(404).json({ message: "Something went wrong. Please check the action ID and try again." });
        }
    });
}

function validateAct(req, res, next) {
    Pro.get(req.params.id).then((pro) => {
        if (pro) {
            if (Obj.keys(req.body).length === 0) {
                res.status(400).json({ message: "Hmm something seems to be missing" });
            } else if (!req.body.description || !req.body.notes) {
                res.status(400).json({ message: "Please check again and be sure to enter all required information" }).end();
            } else {
                next();
            }
        } else {
            res.status(404).json({ message: "Something went wrong. Please check the Project ID and try again."});
        }
    });
}

function validateBasicAct(req, res, next) {
    if (Obj.keys(req.body).length === 0) {
        res.status(400).json({ message: "Hmm something seems to be missing" });
    } else if (!req.body.description || !req.body.notes) {
        res.status(400).json({ message: "Please check again and be sure to enter all required information" }).end();
    } else {
        next();
    }
}

module.exports = router;