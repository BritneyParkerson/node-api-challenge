const express = require("express")
const router = express.Router()
const Pro = require('./helpers/projectModel')

//Routes
router.get("/", (req, res) => {
    Pro.get().then((pro1) => {
        res.status(200).json({ projects: pro1 });
    })
    .catch((err) => {
        res.status(500).json({ message: "Oops! There was an error processing your request."});
    });
});

router.get("/:id", validateProId, (req, res) => {
    const id = req.params.id;
    Pro.get(Number(id)).then((pro2) => {
        res.status(200).json({ project: pro2});
    })
    .catch((err) => {
        res.status(500).json({ message: "Oops! Request could not be processed."});
    });
});

router.post("/:id", validatePro, (req, res) => {
    Act
      .insert(req.body)
      .then((res) => {
        res.status(200).json({ message: "Yay! Success!" });
      })
      .catch((error) => {
        res.status(500).json({ err: "Oh no. Request failed.", err });
      });
  });

  router.put("/:id", validateProId, (req, res) => {
    const id = req.params.id;
    const updatePro = {
        name: req.body.name,
        description: req.body.description,
    };
    Pro
      .update(id, updatePro)
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
    Pro.remove(id).then((res) => {
        res.status(200).json(`Deleted id: ${id}`);
      })
      .catch((err) => {
        res.status(500).json({ message: "Oops! Deletion incomplete!" });
      });
  });

  //Functions
  function validateProId(req, res, next) {
    Pro.get(req.params.id).then((user) => {
        if (user) {
            req.user = user;
            next();
        } else {
            res.status(404).json({ message: "Something went wrong. Please check the Project ID and try again." });
        }
    });
}

function validatePro(req, res, next) {
    if (Obj.keys(req.body).length === 0) {
        res.status(400).json({ message: "Hmm something seems to be missing" });
    } else if (!req.body.name || !req.body.description) {
        res.status(400).json({ message: "Please check again and be sure to enter all required information" }).end();
    } else {
        next();
    }
}

module.exports = router;