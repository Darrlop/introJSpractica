const data = [
  { name: 'John', age: 30, city: 'New York' },
  { name: 'Jane', age: 25, city: 'Los Angeles' },
  { name: 'Bob', age: 35, city: 'Chicago' },
  { name: 'Bob', age: 35, city: 'Chicago' },
  { name: 'Bob', age: 35, city: 'Chicago' },
  { name: 'Bob', age: 35, city: 'Chicago' },
  { name: 'Bob', age: 35, city: 'Chicago' },
  { name: 'Bob', age: 35, city: 'Chicago' }
  // ... más datos ...
];

const pageSize = 2; // Número de filas por página
let currentPage = 0;

function displayTableSegment(startIndex) {
  const endIndex = Math.min(startIndex + pageSize, data.length);
  const segment = data.slice(startIndex, endIndex);

  console.table(segment);

  if (endIndex < data.length) {
    console.log('Presiona una tecla para ver más...');
    currentPage++;
  } else {
    console.log('Fin de la tabla.');
  }
}

function displayTable() {
  currentPage = 0;

  // Muestra la primera página
  displayTableSegment(0);

  // Escucha el evento de tecla para avanzar a la siguiente página
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const startIndex = currentPage * pageSize;
      displayTableSegment(startIndex);
    }
  });
}

// Llama a la función para mostrar la tabla
displayTable();



