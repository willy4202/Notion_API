async function getDataFromBackend() {
  const rest = await fetch('http://localhost:8000/hospital');
  const data = await rest.json();

  return data;
}

const res = await getDataFromBackend();
console.log(res);
