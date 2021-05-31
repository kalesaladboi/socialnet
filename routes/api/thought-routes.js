const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  removeThought,
  updateThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

router.route('/:userId').post(addThought);

router
  .route('/')
  .get(getAllThoughts);

router
  .route('/:userId/:thoughtId')
  .get(getThoughtById)
  .put(updateThought);

router
  .route('/:thoughtId')
  .delete(removeThought);

router
  .route('/:thoughtId/reactions/')
  .post(addReaction);
  

  router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;