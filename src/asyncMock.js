const products = [
    {
      id: '1',
      name: "Elegi personaje",
      category: 'Seleccione la imagen correcta según la descripción',
      img: "https://raw.githubusercontent.com/mgastambide/DCU/master/assets/images/Icons/persons_who_is_who.png",
    },
    {
      id: '2',
      name: "Emparejar sonido",
      category: 'Escuchar y elegir una imagen o palabra',
      img: "https://i.postimg.cc/LsvtChtW/listening.png",
    },
    {
      id: '3',
      name: "Emparejar palabra",
      category: 'Elegi la imagen que corresponde a la palabra',
      img: "https://raw.githubusercontent.com/mgastambide/DCU/master/assets/images/Icons/person_group.png",

    },
    {
      id: '4',
      name: "Uno sobra",
      category: 'Elegi el que no pertenece al grupo',
      img: "https://raw.githubusercontent.com/mgastambide/DCU/master/assets/images/Icons/person_surplus.png",

    },
    {
      id: '5',
      name: "Palabra aislada",
      category: 'Elegi la palabra que corresponde a la imagen',
      img: "https://raw.githubusercontent.com/mgastambide/DCU/master/assets/images/Icons/person_isolated.png",

    },
  ]
  
  export const fetchProducts = () => {

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products);
      }, 500);
    });
  }


  export const fetchProductById = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.find(prod => prod.id === id))
        }, 500)
    })
}

export const fetchProductsByCategory = (categoryId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.filter(prod => prod.category === categoryId))
        }, 500)
    })
}