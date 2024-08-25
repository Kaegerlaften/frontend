<script setup>
    import { ref, computed, reactive, onMounted } from "vue";
    import Content from "@/Content.js";

    const searchQuery = ref('');
    const listContent = reactive([]);
    const url = "http://apifrigo.pecatte.fr/api/1/produits";

    function searchContent() {
        const fetchOptions = { method: "GET" };
        fetch(url, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            const contents = dataJSON;
            listContent.splice(0, listContent.length);
            for (let contentjson of contents) {
                var spePhoto = contentjson.photo.replace("\\", "").replace(".webp", ".jpg")
                listContent.push(new Content(contentjson.nom, spePhoto, contentjson.qte, contentjson.id));
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const filteredContent = computed(() =>
        listContent.filter(c =>
            c.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    );

    const addContent = () => {
        const newName = prompt('Entrez le nom du contenu :');
        const newQte = parseInt(prompt('Entrez la quantité :') || '0', 10);
        const newImage = prompt('Entrez le chemin de l\'image :') || '';

    async function addContentAsync() {
        const pushOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: (newName + newQte + newImage).json
        };
        await fetch(url, pushOptions);
    }

        if (newName && !isNaN(newQte)) {
            addContentAsync();
        } else {
            alert('Veuillez entrer un nom valide et une quantité.');
        }
    };

    onMounted(() => {
        searchContent();    // Rempli listComponent des infos tirées du JSON
    });

    const dialog = ref(false);
</script>

<template>
    <header>
      <input type="text" v-model="searchQuery" placeholder="🔍 Rechercher" />
    </header>
    <div class="card-container">
        <div class="card add-card" @click="addContent">
            <span>+</span>
        </div>
        <div v-for="c in filteredContent" :key="c.name" class="card">
            <img :src="c.photo" alt="content's image" class="content-image" />
            <div class="content-info">
                {{ c.name }} : {{ c.qte }}
                <button @click="removeContent(c.name)" class="delete-button">
                x
                </button>
            </div>
        </div>
    </div>
</template>

<style>
.app {
  background-color: #1e1e1e;
  color: white;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

input {
  width: 300px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  outline: none;
}

.card-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.card {
  background-color: #2196f3;
  color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 150px;
  height: 200px;
  box-sizing: border-box;
  text-align: center;
  position: relative;
}

.add-card {
  cursor: pointer;
  font-size: 40px;
}

.content-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
}

.content-info {
  margin-top: 10px;
  font-size: 18px;
}

.delete-button {
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
}
</style>