// Importamos dos hooks de React
// useState -> para guardar datos en memoria
// useEffect -> para ejecutar código cuando el componente se carga
import { useState, useEffect } from "react";

// Importamos el componente que muestra cada producto
import ProductCard from "../components/ProductCard";

function Home() {

  // Creamos un estado llamado "products"
  // products empieza siendo un arreglo vacío []
  // setProducts es la función que actualiza ese estado
  const [products, setProducts] = useState([]);

  // useEffect se ejecuta automáticamente cuando el componente se monta
  // El arreglo [] al final significa:
  // "Ejecuta esto solo una vez"
  useEffect(() => {

    // fetch es una función que hace una petición HTTP al backend
    // Aquí estamos suponiendo que el backend corre en el puerto 3000
    fetch("http://localhost:3000/api/products")
      
      // Cuando el servidor responde,
      // convertimos la respuesta a formato JSON
      .then((response) => response.json())

      // Cuando ya tenemos los datos,
      // actualizamos el estado con setProducts
      .then((data) => {
        console.log(data);
        setProducts(data);
      })

      // Si ocurre un error, lo mostramos en consola
      .catch((error) => {
        console.log("Error al obtener productos:", error);
      });

  }, []); // ← importante: solo se ejecuta una vez

  return (
    <div style={{ padding: "20px" }}>
      <h2>Catálogo</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        
        {/* 
          Recorremos el arreglo products.
          Por cada producto, renderizamos un ProductCard.
        */}
        {products.map((product) => (
          <ProductCard 
            key={product._id} // Mongo usa _id
            product={product} // le enviamos el objeto completo
          />
        ))}

      </div>
    </div>
  );
}

export default Home;