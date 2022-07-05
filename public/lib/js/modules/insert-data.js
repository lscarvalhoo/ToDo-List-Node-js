
async function getAllData() {
  const data = await fetch('./getAllActivities');

  if (data.ok) {
    const dataJson = await data.json();
    return dataJson;
  }
  return null;
}

export async function generateAll() {
  const data = await getAllData();
  if (data !== null) {
    const dataList = document.querySelector('.all-datalist');
    let itemList = '';
    let ids = [];
    data.res.forEach((task) => {
      if (task.status === 0)
        ids.push(task.id);
    });
    localStorage.allData = Array.from(ids);

    createInsertButton('#insert')

    data.res.forEach(element => {
      const divItemList = document.createElement('div');

      if (element.status == 1) {
        itemList = `<input type="checkbox" checked disabled>`;
        itemList += `<p class="check-active">${element.nome}</p>\n`;

      } else {
        itemList = '<input type="checkbox">';
        itemList += `<p>${element.nome}</p>\n`;

      }

      divItemList.classList.add('itemList');
      divItemList.innerHTML = itemList;
      dataList.appendChild(divItemList);
    });

    const inputs = document.querySelectorAll('input');
    const notCheckedInputs = [];

    inputs.forEach((input) => {
      if (!input.checked) {
        notCheckedInputs.push(input);
      }
    });
    completeData(notCheckedInputs, localStorage.allData);

  } else {
    alert('No added tasks yet');
  }
}

function createInsertButton(classButton) {
  const insertButton = document.querySelector(`${classButton}`);
  const buttonEvent = 'click';

  insertButton.addEventListener(buttonEvent, (event) => {
    event.preventDefault();
    const nome = document.addForm.addInput.value;
    if (nome === '') {
      postData(null);
    } else {
      postData(nome);
    }
  });
};

function isEmptyAndSpacesOrSpecialCharacters(str){
  var noSpecialCharacters = str.length;
  return str === null || str.match(/^ *$/) !== null || noSpecialCharacters === 0;
}

async function postData(nome) {
  if(isEmptyAndSpacesOrSpecialCharacters(nome)){
    alert('The fild cannot be null or content special charcters');
    return;
  }
  
  const data = { nome };
  const badRequest = 400;

  const response = await fetch('./insertActivity', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
    })
  });

  const res = await response.json(); 

  if (response.ok) {
    alert('Task added!');
    document.location.reload(true);
  } else if (!res.statusCode === badRequest) {
    alert('Invalid task, please try another');
  }
}

async function getActiveData() {
  const data = await fetch('./getAllIncompleteActivities');

  if (data.ok) {
    const dataJson = await data.json();
    return dataJson;
  }
  return null;
}

export async function generateActive() {
  const activeData = await getActiveData();

  if (activeData !== null) {
    let ids = [];
    activeData.res.forEach((task) => {
      if (task.status === 0)
        ids.push(task.id);
    });
    localStorage.activeData = Array.from(ids);
    const dataList = document.querySelector('.active-datalist');
    let itemList = '';

    activeData.res.forEach(element => {
      const divItemList = document.createElement('div');

      itemList = `<input type="checkbox"><p>${element.nome}</p>`;

      divItemList.classList.add('itemList');
      divItemList.innerHTML = itemList;
      dataList.appendChild(divItemList);
    });

    const inputs = document.querySelectorAll('input');
    createInsertButton('#insert')
    completeData(inputs, localStorage.activeData);

  } else {
    alert("You don't have active tasks");
  }
}

async function getCompletedData() {
  const data = await fetch('./getAllCompletesActivities');

  if (data.ok) {
    const dataJson = await data.json();
    return dataJson;
  }
  return null;
}

async function deleteData(id) {
  const data = { id };
  const deletedData = await fetch('/deleteActivity', {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });

  if (deletedData.ok) {
    return true;
  } else {
    return false;
  }
}

async function deleteAllData(ids) {
  let deletedData;

  ids.forEach((id) => {
    deletedData = deleteData(id);
  });

  if (deletedData) {
    alert('Tasks deleteds!');
    document.location.reload(true);
  } else {
    alert('Failure to delete tasks!')
  }
}

export async function generateCompleted() {
  const completedData = await getCompletedData();

  if (completedData !== null) {
    let ids = [];
    completedData.res.forEach((task) => {
      ids.push(task.id);
    });
    localStorage.completedData = Array.from(ids);
    const allDataList = document.querySelector('.completed-datalist');
    const buttonDeleteAll = document.querySelector('#delete-button');

    allDataList.innerHTML = '';
    let itemList = '';


    completedData.res.forEach(element => {
      const divItemList = document.createElement('div');
      itemList = `<input type="checkbox" checked disabled>`;
      itemList += `<p class="check-active">${element.nome}</p><div class="img-delete">\n`;
      itemList += `<img src="/lib/img/lixeira.png"></div>`

      divItemList.classList.add('itemList');
      divItemList.innerHTML = itemList;
      allDataList.appendChild(divItemList);
    });

    const listImgDelete = document.querySelectorAll('.img-delete');
    const data = localStorage.completedData.split(',');

    listImgDelete.forEach((img, index) => {
      img.addEventListener('click', () => {
        deleteData(data[index]);
        setTimeout(() => { document.location.reload(true); }, 200);
      });
    });

    buttonDeleteAll.addEventListener('click', (event) => {
      event.preventDefault();
      deleteAllData(data);
    });
  } else {
    alert('No completed tasks yet');
  }
}

async function insertCompleteData(id) {
  const data = { id };
  const response = await fetch('/updateActivity', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });

  if (response.ok) {
    alert("Task complete");
    document.location.reload(true);
  } else {
    alert("Error to complete the task");
  }
}

function completeData(inputs, data) {
  const dataList = data.split(',');
  inputs.forEach((input, index) => {
    input.addEventListener('click', () => {
      if (input.checked) {
        input.setAttribute('disabled', 'disabled');
        insertCompleteData(dataList[index - 1]);
      }
    });
  });
}