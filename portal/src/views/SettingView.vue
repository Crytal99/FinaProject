<template lang="pug">
.product-view
  h2 Settings
  
<div v-if="session = 'status'"> ok  
</div>
<div class="form-group">
p search_enabled:
<select v-model="search_enabled">
  <option disabled value="">Please select one</option>
  <option>true </option>
  <option>false</option>
</select>
<div class="form-group"></div>
<p>search_config: </p>
<p>link logo: </p>
<input type="file" @change="handleImageSelected"/>
<p>placholder: </p>
<input v-model="placholder" placeholder= 'placholder'/>
p popular_search_enabled: 
<select v-model="popular_search_enabled">
  <option disabled value="">Please select one</option>
  <option>true</option>
  <option>false</option>
</select>
<p>popular_search_str:</p>
<input v-model="popular_search_str" placeholder= 'popular_search_str'/>

<button class="btn btn-primary" @click="createProduct">submit</button>
</div>
</template>
<script  lang="ts">
import { ref, inject } from 'vue';
import axios from '@/bootstrap/api-interceptor';
import { useImageUpload } from "@/useImageUpload.js";
// const user = ref(null);
// const message = ref('');

export default {
  data() {
    return {
      setting: {
        search_enabled: '',
        logo: '',
        placholder: '',
        popular_search_enabled: '',
        popular_search_str: '',
      },
    };
  },
  methods: {
    async createProduct() {
      try {
        const response = await axios.post('update', {
          search_enabled: this.search_enabled,
          logo: this.logo,
          placholder: this.placholder,
          popular_search_enabled: this.popular_search_enabled,
          popular_search_str: this.popular_search_str,
        });
        console.log("this is response data ",response.data.setting);
      } catch (error) {
        console.log("this is error",error);
      }
    }
  }
}
// axios.get('search')
//   .then((data) => {
//     user.value = data;
//     console.log('This is user data', data);
//   });
</script>
