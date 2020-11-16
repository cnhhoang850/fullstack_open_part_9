import express from 'express'
import toNewEntry from '../utils/toNewEntry';
import entryService from '../services/getEntries'

const entriesRouter = express.Router();

entriesRouter.post('/:id/entries', (req, res) => {
  const objectToSend = req.body;
  try {
    const newEntryEntry = toNewEntry(objectToSend);

    const addedEntry = entryService.addEntriesEntry(newEntryEntry, req.params.id);
    res.json(addedEntry)
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default entriesRouter;