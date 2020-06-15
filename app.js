const morgan = require('morgan');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const sequalize = require('./database')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fileUpload = require('express-fileupload')

// Models
const Libro = require('./models/libro')
const Categoria = require('./models/categoria')
const Prestamo = require('./models/prestamo')
const Usuario = require('./models/usuario')




const app = express();


// Enviroment Variables
app.set('port', 3000);
app.set('view engine','ejs');
app.set('views','views');


// Middleware
app.use(session({
    secret:'salt',
    resave: true,
    saveUninitialized: true
}))

app.use(fileUpload());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'/public')));


// Routes
const registerRoutes = require('./routes/register')
const bibliotecaRoutes = require('./routes/biblioteca')
const adminRoutes = require('./routes/admin')
const prestamosRoutes = require('./routes/prestamo')
const notFound404 = require('./routes/404')

app.use(registerRoutes);
app.use('/biblioteca', bibliotecaRoutes);
app.use('/admin',adminRoutes)
app.use('/prestamo', prestamosRoutes)
app.use(notFound404);



Usuario.belongsToMany(Libro, {through: Prestamo, foreignKey: 'rut'})
Libro.belongsToMany(Usuario, {through: Prestamo, foreignKey: 'idLibro'})

Libro.belongsTo(Categoria, { constraints: true, onDelete: false})
Categoria.hasMany(Libro);



// sequalize.sync({force: true})
sequalize.sync()
    .then( () => {
        console.log('database On')
    })
    .catch( err => {
        console.log('Error starting database: ' + err )
    })



// Start app
app.listen(app.get('port'), ()=>{
    console.log('server on port 3000')
})