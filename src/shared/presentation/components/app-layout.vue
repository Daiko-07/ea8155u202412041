<script setup>
import { useI18n } from 'vue-i18n'
import PvToolbar from 'primevue/toolbar'
import PvButton from 'primevue/button'
const { t, locale } = useI18n()
</script>

<template>

  <div class="app-layout">
    <pv-toolbar class="topbar">
      <template #start>
        <div class="flex align-items-center gap-3">
          <img
              src="https://img.logo.dev/pawsandclaws.org?token=pk_anonymous"
              alt="Paws and Claws"
              class="brand-logo"
              @error="$event.target.style.display = 'none'"
          />
          <strong>Paws & Claws Rescue Management</strong>
        </div>
      </template>
    </pv-toolbar>



    <div class="layout-body">

      <aside class="sidebar">

        <nav aria-label="Main navigation" class="flex flex-column gap-2">

          <router-link to="/home">

            <pv-button

                :label="t('home')"

                icon="pi pi-home"

                text

                fluid

            />

          </router-link>



          <router-link to="/shelter/animals/new">

            <pv-button

                :label="t('newIntake')"

                icon="pi pi-plus-circle"

                text

                fluid

            />

          </router-link>

        </nav>



        <div class="language-buttons flex gap-2">

          <pv-button

              label="EN"

              :outlined="locale !== 'en'"

              @click="locale = 'en'"

          />

          <pv-button

              label="ES"

              :outlined="locale !== 'es'"

              @click="locale = 'es'"

          />

        </div>

      </aside>



      <div class="main-content">

        <router-view />

      </div>

    </div>

  </div>

</template>