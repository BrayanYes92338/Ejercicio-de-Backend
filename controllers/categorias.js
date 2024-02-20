import Categoria from "../models/categorias.js";

const httpCategorias = {
  getCategorias: async (req, res) => {
    const { busqueda } = req.query;
    const categoria = await Categoria.find({
      $or: [{ descripcion: new RegExp(busqueda, "i") }],
    });
    res.json({ categoria });
  },
  getCategoriasID: async (req, res) => {
    const { id } = req.params;
    const categorias = await Categoria.findById(id);
    res.json({ categorias });
  },
  postCategorias: async (req, res) => {
    try {
      const { descripcion } = req.body;
      const categoria = new Categoria({ descripcion });
      await categoria.save();
      res.json({ categoria });
    } catch (error) {
      res.status(400).json({ err: "No se pudo crear el resgistro" });
    }
  },
  putCategorias: async (req, res) => {
    const { id } = req.params;
    const { _id, estado, createAt, ...resto } = req.body;
    const categoria = await Categoria.findByIdAndUpdate(id, resto, {new: true});
    res.json({ categoria });
  },
  putCategoriasActivar: async (req, res) => {
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(
      id,
      { estado: 1 },
      { new: true }
    );
    res.json({ categoria });
  },
  putCategoriasDesactivar: async (req, res) => {
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(
      id,
      { estado: 0 },
      { new: true }
    );
    res.json({ categoria });
  },
  deleteCategorias: async (req, res) => {
    const { id } = req.params;
    const result = await Categoria.findByIdAndDelete(id);
    res.json({ result });
  },
};

export default httpCategorias;
