<template lang="pug">
.product-view
  h2 Settings
  hr
  pre {{ user }}
  <div>
  <div> search_enabled: {{ selected }} </div>
<div>
<select v-model="search_enabled">
  <option disabled value="">Please select one</option>
  <option>true </option>
  <option>false</option>
</select>
</div>
<div>
<p>search_config: </p>
<p>link logo: </p>
<input v-model="search_enabled"  placeholder= 'logo' />
<p>placholder: </p>
<input v-model="search_enabled"  placeholder= 'placholder' />
  <div>
  <div> popular_search_enabled: {{ selected }} </div>
<div>
<select v-model="popular_search_enabled">
  <option disabled value="">Please select one</option>
  <option>true </option>
  <option>false</option>
</select>
<p>popular_search_str:</p>
<input v-model="popular_search_str"  placeholder= 'popular_search_str' />
</div>
<button class="btn btn-primary" @click="createProduct">submit</button>
</div>
</template>
<script>
import { ref, inject } from 'vue';
import axios from '@/bootstrap/api-interceptor';

const user = ref(null);
const message = ref('');

export default {
        data() {
            return {
                product: {
                    name: '',
                    price: 0,
                }
            }
        },
        methods: {
            async createProduct() {
                try {
                    const response = await axios.post('/products', {
                      name: this.product.name,
                      price: this.product.pric,
                    })
                    console.log(response.data.product)
                } catch (error) {
                    console.log(error)
                }
            }
        }
};
// axios.get('search')
//   .then((data) => {
//     user.value = data;
//     console.log('This is user data', data);
//   });
</script>
