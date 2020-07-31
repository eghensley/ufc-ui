<template>
    <div class="columns is-multiline">
        <section>
            <AdminMainMissingFighterVals 
                :pw="pw"
                :ifLoggedIn="ifLoggedIn"
            />
            <AdminMainMissingBoutsVals
                :pw="pw"
                :ifLoggedIn="ifLoggedIn"
            />
        </section>
    </div>
</template>

<script>

import AdminMainMissingFighterVals from '@/components/Admin/Main/AdminMainMissingFighterVals.vue'
import AdminMainMissingBoutsVals from '@/components/Admin/Main/AdminMainMissingBoutsVals.vue'

export default {
    name: 'AdminMainTileWrapper',
    components: {
        AdminMainMissingFighterVals, AdminMainMissingBoutsVals
    },
    props: {
        pw: {type: String},
        ifLoggedIn: {type: Boolean, default: false}
    }
}
</script>