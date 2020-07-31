<template>
    <section class="info-tiles" id="fightInfo">
      <div class="tile is-ancestor has-text-centered">
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="title"> {{ fightLocation['country']['countryName'] }} </p>
            <p class="subtitle"> Country </p>
          </article>
        </div>

        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="title"> {{ fightLocation['stateName'] }} </p>
            <p class="subtitle"> State </p>
          </article>
        </div>

        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="title"> {{ fightLocation['cityName'] }} </p>
            <p class="subtitle"> City </p>
          </article>
        </div>
      </div>
    </section>
</template>

<script>
export default {
    name: 'fightTiles',
    props: {
        fightLocation: {
            type: Object, default: function () { 
                return {
                    'cityName': 'null',
                    'stateName': 'null',
                    'country': {
                        'countryName': 'null'
                    }
                }
            }
        }
    }
}
</script>