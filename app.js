document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#formAddData')

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore()



  function showList() {
    db.collection('user').get()
      .then((snapshot) => snapshot.forEach(doc => addDataTolist(doc)))
  }


  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    let data = {
      name: form.name.value,
      age: form.age.value,
      city: form.city.value,
    }

    if (data.name === '' || data.age === '' || data.city === '') {
      alert(`bad data : `, data)
    }
    else {
      await db.collection('user').add(data)
      form.name.value = ''
      form.age.value = ''
      form.city.value = ''
      location.reload();
    }
  })




  // @UI
  function addDataTolist(doc) {
    const list = document.getElementById('data-list')
    const row = document.createElement('tr')

    row.innerHTML = `
  <td>${doc.data().name}</td>
  <td>${doc.data().city}</td>
  <td>${doc.data().age}</td>
  <td><button class="btn btn-danger" id='${doc.id}'>ลบข้อมูล</button></td>`

    list.appendChild(row)

    document.getElementById(doc.id).addEventListener('click', async (e) => {
      await db.collection('user').doc(doc.id).delete()
      location.reload();

    })
  }



  showList()
})