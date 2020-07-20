const router = require("express").Router()
const Act = require('./helpers/actionModel')
const Pro = require('./helpers/projectModel')

//Routes
router.get("/", (req, res) => {
    Act.get().then(action => {
        res.status(200).json(action);
    })
    .catch((err) => {
        res.status(500).json({ message: "Oops! There was an error processing your request."});
    });
});

router.post("/", (req, res) => {
     Act
      .insert(req.body)
      .then(action => {
        res.status(200).json(action);
      })
      .catch((err) => {
        res.status(500).json({ message: "Oh no. Request failed." });
      });
  });

  router.put("/:id", (req, res) => {
    const changes = req.body;
    Act.update(req.params.id, changes)
    .then(action => {
        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({ message: 'Oops! We could not locate the requested action!' });
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'Update Failed!',
        });
    });
});

router.delete('/:id', (req, res) => {
    Act.remove(req.params.id)
        .then(action => {
            if (action > 0) {
                res.status(200).json({ message: 'Action Deleted' });
            } else {
                res.status(404).json({ message: 'Oops! We could not locate the requested action' });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Deletion Failed',
            });
        });
});


module.exports = router;