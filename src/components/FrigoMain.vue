<script setup>
    import { reactive, onMounted, watch } from "vue";
    import Content from "@/Content.js";
    import FrigoAdd from "@/components/FrigoAdd.vue";

    const listContent = reactive([]);
    const url = "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/5/produits"
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
                listContent.push(new Content(contentjson));
            }
            console.log(listContent);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    onMounted(() => {
        searchContent();    // Rempli listComponent des infos tirées du JSON
    });
</script>

<template>
    <v-card>
        <v-row dense>
            <v-col v-for="c in listContent" :key="c.id" cols="12" sm="6" md="3" lg="2" xl="2">
                    <v-card color="primary">
                    <v-img :src="c.photo" height="200">
                    </v-img>
                    <v-card-title>
                        {{ c.name }}
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<style scoped>
.image {
  width: 200px;
  height: 300px;
}
</style>