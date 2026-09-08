import Item from '../models/Item.js';

// GET /api/items
export async function getItems(req, res) {
  const items = await Item.find().sort({ createdAt: -1 });
  res.json(items);
}

// GET /api/items/:id
export async function getItem(req, res) {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  res.json(item);
}

// POST /api/items
export async function createItem(req, res) {
  const { title, description, completed } = req.body;

  const item = await Item.create({ title, description, completed });
  res.status(201).json(item);
}

// PUT /api/items/:id
export async function updateItem(req, res) {
  const { title, description, completed } = req.body;

  const item = await Item.findByIdAndUpdate(
    req.params.id,
    { title, description, completed },
    { new: true, runValidators: true }
  );

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  res.json(item);
}

// DELETE /api/items/:id
export async function deleteItem(req, res) {
  const item = await Item.findByIdAndDelete(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  res.json({ id: req.params.id });
}
