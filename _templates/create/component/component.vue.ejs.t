---
to: "<% return path + kebabName + '.vue'%>"
---
<template>
    <div
        :at-<%= kebabName %>="atAttribute"
        class="<%= kebabName %>"
    >
        This is <%= pascalName %>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: '<%= pascalName %>',
    components: {

    },
    props: {
        /**
         * AQA attribute
         */
        atAttribute: {
            type: String,
            default: ''
        }
    },
    emits: {

    },
    setup() {

    }
});
</script>

<style lang="scss" src="./<%= kebabName %>.scss" />
