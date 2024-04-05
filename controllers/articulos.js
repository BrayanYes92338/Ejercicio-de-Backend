import Articulo from "../models/articulos.js";

const httpArticulos = {
  getArticulos: async (req, res) => {
    const { busqueda } = req.query;
    const articulo = await Articulo.find({
      $or: [{ nombre: new RegExp(busqueda, "i") }],
    });
    res.json({ articulo }); 
  },
  getArticulosID: async (req, res) => {
    const { id } = req.params;
    const articulos = await Articulo.findById(id);
    res.json({ articulos });
  },
  postArticulos: async (req, res) => {
    try {
      const { idcategoria, nombre, precio, stock, estado } = req.body;
      const articulo = new Articulo({ idcategoria, nombre, precio, stock, estado });
      await articulo.save();
      res.json({ articulo });
    } catch (error) {
      res.status(400).json({ err: "No se pudo crear el articulo" });
    }
  },
  putArticulos: async (req, res) => {
    const { id } = req.params;
    const { idcategoria, precio, stock,estado,createAt, ...resto } = req.body;
    const articulo = await Articulo.findByIdAndUpdate(id, resto, {new: true});
    res.json({ articulo }); 

  }, putArticulosActivar: async (req, res) => {
    const { id } = req.params;
    const articulo = await Articulo.findByIdAndUpdate(
      id,
      { estado: 1 },
      { new: true }
    );
    res.json({ articulo }); 
  },
  putArticulosDesactivar: async (req, res) => {
    const { id } = req.params;
    const articulo = await Articulo.findByIdAndUpdate(
      id,
      { estado: 0 },
      { new: true }
    );
    res.json({ articulo });
  },deleteArticulos: async (req, res) => {
    const { id } = req.params;
    const result = await Articulo.findByIdAndDelete(id);
    res.json({ result });
  },
};

export default httpArticulos;
