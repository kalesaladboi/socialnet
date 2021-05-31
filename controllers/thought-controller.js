const {
    User,
    Thought
  } = require('../models');
  
  
  const thoughtController = {
  
    getAllThoughts(req, res) {
      Thought.find({})
  
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    getThoughtById({
      params
    }, res) {
      Thought.findById({
          _id: params.thoughtId
        })
  
        .select('-__v')
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            return res.status(404).json({
              message: 'Nothing found with this id'
            });
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
  
    addThought({
      params,
      body
    }, res) {
      console.log(body);
  
      Thought.create(body)
        .then(({
          _id
        }) => {
          return User.findOneAndUpdate({
            _id: params.userId
          }, {
            $push: {
              thoughts: _id
            }
          }, {
            new: true
          });
        })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({
              message: 'Nothing found with this id'
            });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
  
    updateThought({
      params,
      body
    }, res) {
  
      Thought.findOneAndUpdate(body)
        .then(({
          _id
        }) => {
          return User.findOneAndUpdate({
            _id: params.userId
          }, {
            new: true
          });
        })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({
              message: 'Nothing found with this id!'
            });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
  
    removeThought({
      params
    }, res) {
      Thought.findOneAndDelete({
          _id: params.thoughtId
        })
        .then(deleteThought => {
          if (!deleteThought) {
            return res.status(404).json({
              message: 'Nothing found with this id'
            });
          }
          return User.findOneAndUpdate({
            _id: params.userId
          }, {
            $pull: {
              thoughts: params.thoughtId
            }
          }, {
            new: true
          });
        })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({
              message: 'Nothing found with this id!'
            });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    addReaction({
      params,
      body
    }, res) {
      Thought.findOneAndUpdate({
          _id: params.thoughtId
        }, {
          $push: {
            reactions: body
          }
        }, {
          new: true,
          runValidators: true
        })
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({
              message: 'No thoughts with this Id!'
            });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    removeReaction({params}, res) {
      Thought.findOneAndUpdate(
        {_id: params.thoughtId}, 
        { $pull: { reactions: { reactionId: params.reactionId } } }, 
        { new: true}
        )
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({
              message: 'No thoughts with this Id!'
            });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    }
  };
  
  module.exports = thoughtController;