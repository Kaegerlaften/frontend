<script setup>
    import { ref, reactive, onMounted } from "vue";
    import Content from "@/Content.js";

    const listContent = reactive([]);
    const url = "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/7/produits";

    const tmpName = ref();
    const tmpQte = ref();
    const tmpPhoto = ref();

    function searchContent() {
        const fetchOptions = { method: "GET" };
        fetch(url, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            let contents = dataJSON;
            listContent.splice(0, listContent.length);
            for (let contentjson of contents) {
                listContent.push(new Content(contentjson.nom, contentjson.photo, contentjson.qte, contentjson.id));
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    async function addContent(addedContent) {
        const postOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addedContent)
        };
        await fetch(url, postOptions);
    }

    onMounted(() => {
        searchContent();    // Rempli listComponent des infos tirées du JSON
    });

    const dialog = ref(false);
</script>

<template>
    <v-card>
        <v-row dense>
            <v-col height="200" cols="12" sm="6" md="3" lg="2">
                <v-card color="primary">                    
                    <v-icon size="248" @click="dialog = true">mdi-plus</v-icon>
                </v-card>
            </v-col>
            <v-col v-for="c in listContent" :key="c.id" cols="12" sm="6" md="3" lg="2">
                <v-card color="primary">
                    <v-img :src="c.photo" height="200">
                    </v-img>
                    <v-card-title>
                        {{ c.name }} : {{ c.qte }}
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
    <v-dialog v-model="dialog" max-width="600">
        <v-card>
            <v-card-title>Ajout de contenu dans le frigidaire</v-card-title>
            <v-form>
                <v-text-field v-model="tmpName" label="Nom"></v-text-field>
            </v-form>
            <v-form>
                <v-text-field v-model="tmpQte" label="Quantité"></v-text-field>
            </v-form>
            <v-form>
                <v-text-field v-model="tmpPhoto" label="Lien vers la photo"></v-text-field>
            </v-form>
            <v-card-actions>
                <v-btn color="primary" @click="dialog = false; addContent({tmpName, tmpQte, tmpPhoto})">Ajouter</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.image {
  width: 200px;
  height: 300px;
}
</style>