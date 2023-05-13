'use strict';

/*
 *  Bartoloni
 */

let productos = [
    {
        id: 1,
        nombre: 'Lapicera Ecologica',
        descripcion: 'Lapicera Ecologica de carton reciclado (NO INCLUYE ESTAMPADO DE LOGO)',
        precio: 124,
        imagen: 'lapicera',
        categoría: 'Merchandising',
    },
    {
        id: 2,
        nombre: 'Papel Reciclado',
        descripcion: 'Papel plantable con semillas de rucula y perejil en su interior 3 unidades tamaño A4',
        precio: 483,
        imagen: 'papel',
        categoría: 'Merchandising',
    },
    {
        id: 3,
        nombre: 'Boligrafos Ecologicos',
        descripcion: 'Boligrafos ecologicos personalizados, grado con laser. ideales para souvenir de cumpleaños, comunion, etc.',
        precio: 143,
        imagen: 'boligrafos',
        categoría: 'Merchandising',
    },
    {
        id: 4,
        nombre: 'Pañal de tela',
        descripcion: 'Pañal de Pileta ecológico talle unico ajustable.',
        precio: 3290,
        imagen: 'panal',
        categoría: 'Higiene personal',
    },
    {
        id: 5,
        nombre: 'Cepillo de dientes de bambu',
        descripcion: 'Tan efectivo como el plástico, un cepillo de dientes de bambú tiene un mango de bambú y fibras de nylon',
        precio: 227,
        imagen: 'cepillo',
        categoría: 'Higiene personal',
    },
    {
        id: 6,
        nombre: 'Dentífrico Sin Fluor',
        descripcion: 'Bits Meraki Dentífrico Sin Fluor Comprimidos Sólidos Natural',
        precio: 740,
        imagen: 'dentrifico',
        categoría: 'Higiene personal',
    },
    {
        id: 7,
        nombre: 'Baul reciclado',
        descripcion: 'Baul reciclado para guardar cosas',
        precio: 740,
        imagen: 'baul',
        categoría: 'Decoracion',
    },
    {
        id: 8,
        nombre: 'Bombilla',
        descripcion: 'Bombilla convertida en un terrario',
        precio: 575,
        imagen: 'terrario',
        categoría: 'Decoracion',
    },
    {
        id: 9,
        nombre: 'Lapicero',
        descripcion: 'Tarro reciclado con teclas pegadas ideal para cumplir la funcion de lapicero',
        precio: 243,
        imagen: 'lapicero',
        categoría: 'Decoracion',
    },
];


const contenedoProductos = document.getElementById('productos');
const minicarrito = document.getElementById('minicarrito')
const body = document.querySelector('body')
const items = minicarrito.firstElementChild.firstElementChild;
const precioTotal = minicarrito.firstElementChild.nextElementSibling.firstElementChild;
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let acumulador =  JSON.parse(localStorage.getItem('precioTotal')) || 0;

const funcionAcumular = ()=>{
    localStorage.setItem('precioTotal',JSON.stringify(acumulador));
};
const mostrarPrecioDesdeElInicio = ()=>{
    precioTotal.innerText = acumulador;
}
mostrarPrecioDesdeElInicio()
const categorias = document.querySelector('h2');


const categoria1 = minicarrito.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild;//Merchandising
categoria1.addEventListener('click',()=>{
    eventoCategorias('Merchandising');
    oferta(productos[2])
})
const categoria2 = minicarrito.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling;//Higiene personal
categoria2.addEventListener('click',()=>{
    eventoCategorias('Higiene personal');
    oferta(productos[4])
})
const categoria3 = minicarrito.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling;//Decoracion
categoria3.addEventListener('click',()=>{
    eventoCategorias('Decoracion');
    oferta(productos[7])
})
const todo = minicarrito.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling;//todo
todo.addEventListener('click',()=>{
    categorias.innerText = 'Productos'
    catalogoDeProductos(productos)
    oferta(productos[7])
    
})



const eventoCategorias = (catalogo) =>{
    categorias.innerText = catalogo
    let categoria = []
    for (const producto of productos) {
        if (producto.categoría == catalogo) {
            categoria.push(producto)
        }
    }
    catalogoDeProductos(categoria)
}

const catalogoDeProductos = (catalogo)=>{
    contenedoProductos.innerHTML = '';
    catalogo.forEach((producto) => {
        const div = document.createElement('div');
        contenedoProductos.appendChild(div)
    
        const img = document.createElement('img')
        img.src = `img/${producto.imagen}.jpg`;
        img.alt = producto.nombre;
        img.style.height = '300px'
        img.style.width = 'auto'
        img.addEventListener('click',()=>{//aca creo la ventana modal del producto
            modalProducto(producto)
        })
        img.addEventListener('mouseover',()=>{//cambio el estado de la flechita
            img.style.cursor = 'pointer'
            img.style.filter = 'brightness(0.5) contrast(120%)'
        })
        img.addEventListener('mouseout',()=>{//cambio el estado de la flechita
            img.style.filter = 'inherit'
        })
        div.appendChild(img);
    
        const divHijo = document.createElement('div');
        div.append(divHijo)
    
        const h3 = document.createElement('h3')
        h3.innerText = producto.nombre
        divHijo.appendChild(h3)
    
        const precio = document.createElement('p');
        precio.innerText = '$'
        const span = document.createElement('span')
        span.innerText = producto.precio;
        divHijo.appendChild(precio);
        precio.appendChild(span);
        
        const boton = document.createElement('button');
        boton.id = producto.id
        boton.innerText = 'Agregar';
    
        divHijo.appendChild(boton)
    
    
        const agregar = document.getElementById(producto.id)
    
        agregar.addEventListener('click', () =>{
            agregarAlCarrito(producto.id)
        })
    });
};

const agregarAlCarrito = (prodId) => {
    const item = productos.find((prod)=> prod.id === prodId);
    const indice = carrito.indexOf(item)

    carrito.push(item)
    contadorCarrito();
    acumulador = carrito.reduce((acc,prod)=> acc + prod.precio, 0)
    funcionAcumular()
    precioTotal.innerText = acumulador;
    almacenamientoLocal()
}

const contadorCarrito = ()=>{
    const cantidadCarrito = carrito.length;
    localStorage.setItem('carritoCantidad',JSON.stringify(cantidadCarrito));
    items.innerText = JSON.parse(localStorage.getItem('carritoCantidad'));
}
contadorCarrito();


const eliminarDelCarrito = (prodId) => {
    const encontrarId = carrito.find((producto) => producto.id == prodId);
   
    carrito = carrito.filter((carritoId)=>{
        return carritoId !== encontrarId;
    });
    acumulador = carrito.reduce((acc,prod)=> acc - prod.precio, 0)
    funcionAcumular()
    precioTotal.innerText = acumulador;
    contadorCarrito();
    almacenamientoLocal();
}

const vaciarCarrito = () =>{
    for (const producto of carrito) {
        eliminarDelCarrito(producto.id)
    }
}


const actualizarCarrito = ()=>{
    const div = document.createElement('div')
    div.id = 'modalCarrito';
    div.className = 'modal';
    //esto debe crear la ventana modal
    body.appendChild(div)

    const div2 = document.createElement('div');
    div.appendChild(div2);

    const a = document.createElement('a')
    a.className = 'cerrar';
    a.href = 'javascript:void(0)'
    a.innerText = 'X';
    div2.appendChild(a);
    
    const p = document.createElement('p');
    //p.innerHTML = `Items: <span>${carrito.length}</span> - Total: <span>$${acumulador}</span>`
    p.innerText = 'Items: '
    const spanP1 = document.createElement('span');
    spanP1.innerText = `${carrito.length}`
    p.appendChild(spanP1);


    const spanP2 = document.createElement('span');
    spanP2.innerText = `$${acumulador}`
    p.appendChild(spanP2);

    spanP2.before(' - Total: ')
    div2.appendChild(p);

    const hr = document.createElement('hr')
    div2.appendChild(hr);

    const ul = document.createElement('ul');
    div2.appendChild(ul)

    carrito.forEach((prod)=>{
        const li = document.createElement('li');
        //li.innerHTML = `<li>${prod.nombre} <span> $${prod.precio}</span> <span> 1 items</span> <a href="#"> Eliminar</a></li>`
        li.innerText = prod.nombre;

        let span = document.createElement('span');
        span.innerText = `$${prod.precio} `;
        li.appendChild(span);

        span = document.createElement('span');//utilizo la misma variable porque ya se agrego
        span.innerText = '1 item '
        li.appendChild(span);

        let a = document.createElement('a');
        a.innerText = 'Eliminar'
        a.id = prod.id
        a.href = '#';
        a.addEventListener('click',(e)=>{
            eliminarDelCarrito(e.target.id);
            e.target.parentNode.remove();
        })
        
        li.appendChild(a)

        ul.appendChild(li)

    })

    const button = document.createElement('button');
    button.innerText = 'Vaciar'
    div2.appendChild(button)
    button.addEventListener('click', ()=>{
        vaciarCarrito()
        let vaciarUl = document.querySelector('#modalCarrito>div>ul');
        vaciarUl.innerHTML = ''

    })

    const button2 = document.createElement('button');
    button2.innerText ='Continuar Compra'
    div2.appendChild(button2)
    button2.addEventListener('click',()=>{
        div.remove()
        div2.remove()
        a.remove()
        hr.remove()
        p.remove()
        ul.remove()
        button.remove()
        button2.remove()
        continuarCompra()
    })

    const cerrar = document.querySelector('.cerrar')//elimina la ventana modal
    cerrar.addEventListener('click',()=>{
        div.remove()
        div2.remove()
        a.remove()
        hr.remove()
        ul.remove()
        button.remove()
        button2.remove()
    })

    document.addEventListener('keydown',(e)=>{
        //console.log(e)
        if(e.key === 'Escape'){
            div.remove()
            div2.remove()
            a.remove()
            hr.remove()
            ul.remove()
            button.remove()
            button2.remove()
        }

    })
}

const continuarCompra = ()=>{
    contenedoProductos.innerHTML = '';
    categorias.style.display = 'none';

    const contenedor = document.createElement('div')
    contenedor.classList = 'contenedor';
    contenedoProductos.appendChild(contenedor)
    const resumen = document.createElement('section');
    resumen.classList = 'resumen'
    const h3 = document.createElement('h3');
    h3.innerText = `Total a pagar: $${acumulador}`;
    resumen.appendChild(h3)
    contenedor.appendChild(resumen)
    resumenCarrito(resumen)
    
    

    //Comienza el formulario
    const form = document.createElement('form');
    form.classList = 'Formulario';
    form.action = 'procesar.php';
    form.method = 'post';
    form.enctype = 'application/x-www-form-urlencoded';
    contenedor.appendChild(form);

    const fieldset = document.createElement('fieldset');
    form.appendChild(fieldset);

    const legend = document.createElement('legend');
    legend.innerText = 'Informacion Personal';
    fieldset.appendChild(legend)

    CrearlabelYinput('Nombre','text','ingrese su nombre', fieldset)
    CrearlabelYinput('Apellido','text','ingrese su apellido', fieldset)
    CrearlabelYinput('Telefono','tel','ingrese su numero de telefono', fieldset)
    CrearlabelYinput('Email','email','ingrese su Email', fieldset)
    
    const fieldset2 = document.createElement('fieldset');
    form.appendChild(fieldset2);
    const legend2 = document.createElement('legend');
    legend2.innerText = 'Direccion';
    fieldset2.appendChild(legend2);

    CrearlabelYinput('Ciudad','text','seleccione la ciudad', fieldset2)
    CrearlabelYinput('Calle','text','ingrese su calle', fieldset2)
    CrearlabelYinput('Altura','number','ingrese la altura', fieldset2)

    const fieldset3 = document.createElement('fieldset');
    form.appendChild(fieldset3);
    const legend3 = document.createElement('legend');
    legend3.innerText = 'Informacion del pago';
    fieldset3.appendChild(legend3);

    CrearlabelYinput('Numero de la tarjeta','number','ingrese el numero de la tarjeta', fieldset3)
    CrearlabelYinput('Nombre y apellido del titular','text','ingrese el nombre y apellido del titular', fieldset3)
    const label = document.createElement('label');
    label.for = 'cuotas';
    label.innerText = 'Cuotas';
    fieldset3.appendChild(label)

    const select = document.createElement('select');
    select.name = 'cuotas';
    fieldset3.appendChild(select);

    for (let i = 0; i <= 12 ; i = i+3) {
        const option = document.createElement('option');
        if (i===0) {
            option.value  = '1'
            option.selected = true;
            option.innerText = 1
        }else{
            option.value  = i
            option.innerText = i
        }
        select.appendChild(option)
        const seleccion = contenedoProductos.querySelector('.contenedor>.Formulario>fieldset:last-of-type>select:first-of-type');
        seleccion.addEventListener('change',()=>{
            p.innerHTML = `${seleccion.value} cuotas de $${acumulador / seleccion.value}`
        })
    }
    const p = document.createElement('p');
    p.innerText = `Total a pagar ${acumulador}`
    fieldset3.appendChild(p)

    const button = document.createElement('button');
    button.type = 'submit';
    button.classList = 'Comprar';
    button.innerText = 'Confirmar compra';
    form.appendChild(button)
}

//<button type="submit" class="Comprar">Confirmar compra</button>
catalogoDeProductos(productos)

const verCarrito = minicarrito.lastElementChild.addEventListener('click',()=>{
    actualizarCarrito()
    })


const modalProducto = (producto)=>{
    const divPadre = document.createElement('div');
    divPadre.id = 'modalProducto';
    divPadre.className = 'modal';
    //esto debe crear la ventana modal del producto
    body.appendChild(divPadre)

    const div2 = document.createElement('div');
    divPadre.appendChild(div2);

    const a = document.createElement('a')
    a.className = 'cerrar';
    a.href = 'javascript:void(0)'
    a.innerText = 'X';
    div2.appendChild(a);

    const img = document.createElement('img')
        img.src = `img/${producto.imagen}.jpg`;
        img.alt = producto.nombre;
        img.style.height = '300px'
        img.style.width = 'auto'
        div2.appendChild(img);

    const h3 = document.createElement('h3')
    h3.innerText = producto.nombre
    div2.appendChild(h3)

    const pDescripcion = document.createElement('p');
    pDescripcion.innerText = producto.descripcion;
    div2.appendChild(pDescripcion);
    
    const precio = document.createElement('p');
    precio.innerText = '$'
    const span = document.createElement('span')
    span.innerText = producto.precio;
    div2.appendChild(precio);
    precio.appendChild(span);
        
    const categoria = document.createElement('p');
    categoria.innerText = producto.categoría;
    div2.appendChild(categoria);
    
    const boton = document.createElement('button');
    boton.id = producto.id
    boton.innerText = 'Agregar';
    boton.addEventListener('click', () =>{
        agregarAlCarrito(producto.id)
    })
    div2.appendChild(boton)



        const cerrar = document.querySelector('.cerrar')//elimina la ventana modal del producto
        cerrar.addEventListener('click',()=>{
            divPadre.remove()
            div2.remove()
            a.remove()
        })
        document.addEventListener('keydown',(e)=>{
            //console.log(e)
            if(e.key === 'Escape'){
                divPadre.remove()
                div2.remove()
                a.remove()
            }
            if (e.key === 'Enter') {
                agregarAlCarrito(producto.id)
            }
        })
}

const oferta = (producto)=>{
    modalProducto(producto)
    let cerrar =  document.getElementById('modalProducto');
    cerrar.style.backgroundColor = '#f002'
    const h3 = document.createElement('h3');
    h3.innerText = 'Oferta'
    h3.style.fontSize = '90px'
    cerrar.appendChild(h3)
    setTimeout(() => {//esto es lo que tengo que utilizar para cerrar la oferta

       cerrar.remove();
    }, 10000);
};

const resumenCarrito = (productos)=>{
    const ul = document.createElement('ul');
    productos.appendChild(ul)
    carrito.forEach((prod)=>{
        const li = document.createElement('li');
        //li.innerHTML = `<li>${prod.nombre} <span> $${prod.precio}</span> <span> 1 items</span> <a href="#"> Eliminar</a></li>`
        li.innerText = prod.nombre;

        let span = document.createElement('span');
        span.innerText = ` $${prod.precio} `;
        li.appendChild(span);

        span = document.createElement('span');//utilizo la misma variable porque ya se agrego
        span.innerText = '1 item '
        li.appendChild(span);

        let a = document.createElement('a');
        a.innerText = 'Eliminar'
        a.id = prod.id
        a.href = '#';
        a.addEventListener('click',(e)=>{
            eliminarDelCarrito(e.target.id);
            e.target.parentNode.remove();
        })
        
        li.appendChild(a)

        ul.appendChild(li)

    })
}
const CrearlabelYinput = (nombre=String,tipoDeAtributo=String,placeholder=String,agregar)=>{
    const label = document.createElement('label');
    label.for = nombre;
    label.innerText = nombre;
    agregar.appendChild(label);
    
    const input = document.createElement('input');
    input.type = tipoDeAtributo;
    input.name= nombre;
    input.placeholder = placeholder;
    agregar.appendChild(input)
};

//LOCALSTORAGE
//set item
const almacenamientoLocal = ()=>{
    localStorage.setItem('carrito',JSON.stringify(carrito));
    };