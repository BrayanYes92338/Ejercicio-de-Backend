import  express  from "express"
import 'dotenv/config'
import dbConexion from "./database/cnxmongoose.js"
import categorias from "./routes/categorias.js"
import articulos from "./routes/articulos.js"
import ventas from "./routes/ventas.js"
import clientes from "./routes/clientes.js"
import usuarios from "./routes/usuario.js"
import proveedor from "./routes/proveedor.js"
import compras from "./routes/compras.js"

const app = express()
app.use(express.json())
app.use("/api/categorias",categorias)
app.use("/api/articulos",articulos)
app.use("/api/ventas",ventas)
app.use("/api/clientes",clientes)
app.use("/api/usuarios",usuarios)
app.use("/api/proveedores",proveedor)
app.use("/api/compras",compras)

app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    dbConexion()
}) 

