document.getElementById('uploadButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
      alert('Выберите файл!');
      return;
    }

    const formData = new FormData();
    formData.append('image', file); // Ключ 'image' должен совпадать с именем на сервере

    try {
      const response = await fetch('http://127.0.0.1:3000/api/v1/file/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert('Файл успешно загружен! URL: ' + result.url);
      } else {
        alert('Ошибка при загрузке файла');
        console.log(response);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
});