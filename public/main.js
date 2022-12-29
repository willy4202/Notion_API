const getDataFromBackend = async () => {
  const rest = await fetch('http://localhost:8000/data');
  const data = await rest.json();

  return data;
};

const addData = async () => {
  const data = await getDataFromBackend();
  console.log(data);

  data.forEach((value) => {
    const div = document.createElement('div');
    div.classList.add('hosptialContainer');
    div.innerHTML = `
        <h3>${value.place}</h3>
        <p>${value.status}</p>
        <p>${value.address}</p>
    `;

    container.append(div);
  });
};

addData();

const container = document.getElementById('container');
// the new variables
const openFormButton = document.getElementById('newButton');
const closeFormButton = document.getElementById('closeFormButton');
const addHospitalFormContainer = document.getElementById(
  'addHospitalFormContainer'
);
openFormButton.addEventListener('click', () => {
  addHospitalFormContainer.style.display = 'flex';
});

closeFormButton.addEventListener('click', () => {
  addHospitalFormContainer.style.display = 'none';
});
